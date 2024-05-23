<template>
  <el-card class="box-card" shadow="hover" style="margin: 20px;" :body-style="{ background: '#dbe9ff' }">
    <el-row type="flex" align="top">
      <el-col :xl="18" :lg="17" :md="16" :sm="15" :xs="14">
        <el-row style="margin-bottom: 30px; height: 15px;">
          <el-col >
            <el-button style="color:#409EFF; font-size: medium; font-weight: bold;" @click="goToUser()"
                       :link="true">{{ comment.user_name }}</el-button>
            <el-text style="font-size: small;">, {{ timeAgo(comment.created_at) }}</el-text>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 5px; height: 30px;">
          <el-col style="margin-left: 5px;">
            <el-text style="font-size: medium; color: black;">{{ comment.body }}</el-text>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col>
            <el-button :link="true" style="color:#409EFF" @click="reply()">reply</el-button>
            <el-button v-if="comment.current_user_owns" @click="edit()" size="small" style="color:#409EFF; margin-left: 10px;">
              edit</el-button>
            <el-button v-if="comment.current_user_owns" @click="deleteComment()" size="small" style="color:#409EFF; margin-left: 10px;">
              delete</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xl="6" :lg="7" :md="8" :sm="9" :xs="10" style="display: flex; align-items: flex-start; justify-content: flex-end;">
        <el-row type="flex">
          <el-col :span="12">
            <el-button v-if="!comment.current_user_likes" @click="like()" style="color:#409EFF;
            margin-right: 10px;" size="large"><el-icon><Top /></el-icon> {{ comment.likes_count }}</el-button>
            <el-button v-else @click="unlike()" type="primary" style="margin-right: 10px;"
                       size="large"><el-icon><Top /></el-icon> {{ comment.likes_count }}</el-button>
          </el-col>
          <el-col :span="12">
            <el-button v-if="!comment.current_user_dislikes" @click="dislike()"
                       style="color:#409EFF" size="large">
              <el-icon><Bottom /> </el-icon> {{ comment.dislikes_count }}</el-button>
            <el-button v-else @click="undislike()" type="primary" size="large">
              <el-icon><Bottom /> </el-icon> {{ comment.dislikes_count }}</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <NewCommentComponent v-if="isEditing" @updateComment="handleUpdateComment" :commentToEdit="commentToEdit"/>
    <NewCommentComponent v-if="isReplying" @commentCreated="handleCommentCreated" :commentToReply="commentToReply"/>
  </el-card>

  <div class="comment">
    <CommentComponent
        v-for="reply in comment.all_replies"
        :key="reply.id"
        :comment="reply"
        :commentToEdit="commentToEdit"
        :commentToReply="commentToReply"
        @replyComment="replyComment"
        @updateComment="updateReply"
        @commentDeleted="deleteReply"
        @editComment="editComment"
        @commentCreated="getPost"
    />
  </div>
</template>

<script>
import moment from 'moment';
import {ElMessage} from "element-plus";
import comments from "@/services/comments.js";
import NewCommentComponent from "@/components/NewCommentComponent.vue";

export default {
  name: 'CommentComponent',
  components: {NewCommentComponent},
  emits: ['updateComment', 'commentDeleted', 'editComment', 'replyComment', 'commentCreated'],
  props: {
    comment: {
      type: Object,
      required: true
    },
    commentToEdit: {
      type: Object,
      default: null
    },
    commentToReply: {
      type: Object,
      default: null
    }
  },
  computed: {
    isEditing() {
      return this.commentToEdit && this.commentToEdit.id === this.comment.id;
    },
    isReplying() {
      return this.commentToReply && this.commentToReply.id === this.comment.id;
    }
  },
  methods: {
    timeAgo(date) {
      return moment(date).fromNow();
    },
    async goToUser() {
      this.$router.push({ name: 'User', params: { user_id: this.comment.user_id } });
    },

    //Edit comment
    async edit() {
      this.$emit('editComment', this.comment);
    },
    editComment(comment) {
      this.$emit('editComment', comment);
    },
    handleUpdateComment(updatedComment) {
      this.$emit('editComment', null);
      this.$emit('updateComment', updatedComment);
    },
    async updateReply(updatedReply) {
      const index = this.comment.all_replies.findIndex(reply => reply.id === updatedReply.id);
      if (index !== -1) {
        const existingReplies = this.comment.all_replies[index].all_replies;
        const mergedReply = { ...this.comment.all_replies[index], ...updatedReply };
        mergedReply.all_replies = existingReplies;
        this.comment.all_replies.splice(index, 1, mergedReply);
      }
    },

    //Delete comment
    async deleteComment() {
      const response = await comments.removeComment(this.$route.params.post_id, this.comment.id);
      if (response.status === 200 || response.status === 204) {
        this.$emit('commentDeleted', this.comment.id);
      } else {
        console.error('Error deleting comment. Status:', response.status, 'Response data:', response.data);
      }
    },
    async deleteReply(replyId) {
      const index = this.comment.all_replies.findIndex(reply => reply.id === replyId);
      if (index !== -1) {
        this.comment.all_replies.splice(index, 1);
      }
    },

    //Reply comment
    async reply() {
      this.$emit('replyComment', this.comment);
    },
    replyComment (comment) {
      this.$emit('replyComment', comment);
    },
    handleCommentCreated() {
      this.$emit('replyComment', null);
      this.$emit('commentCreated');

    },
    getPost() {
      this.$emit('commentCreated');
    },

    //Reactions
    async like() {
      const response = await comments.likeComment(this.$route.params.post_id, this.comment.id);
      if (response.status === 200) {
        this.$emit('updateComment', response.data);
        ElMessage.success('Comment successfully liked');
      }
      else ElMessage.error('Error liking comment');
    },
    async unlike() {
      const response = await comments.unlikeComment(this.$route.params.post_id, this.comment.id);
      if (response.status === 200) {
        this.$emit('updateComment', response.data);
        ElMessage.success('Comment successfully unliked');
      }
      else ElMessage.error('Error unliking comment');
    },
    async dislike() {
      const response = await comments.dislikeComment(this.$route.params.post_id, this.comment.id);
      if (response.status === 200) {
        this.$emit('updateComment', response.data);
        ElMessage.success('Comment successfully disliked');
      }
      else ElMessage.error('Error disliking comment');
    },
    async undislike() {
      const response = await comments.undislikeComment(this.$route.params.post_id, this.comment.id);
      if (response.status === 200) {
        this.$emit('updateComment', response.data);
        ElMessage.success('Comment successfully undisliked');
      }
      else ElMessage.error('Error undisliking comment');
    },
  },
}
</script>

<style scoped>
a {
  color: #409EFF;
  font-size: small;
}
.comment {
  margin-left: 20px;
}
</style>