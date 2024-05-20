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
            <el-button v-if="comment.current_user_owns" size="small" style="color:#409EFF; margin-left: 10px;">
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
  </el-card>
</template>

<script>
import moment from 'moment';
import {ElMessage} from "element-plus";
import comments from "@/services/comments.js";

export default {
  name: 'CommentComponent',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    timeAgo(date) {
      return moment(date).fromNow();
    },
    async goToUser() {
      this.$router.push({ name: 'User', params: { user_id: this.comment.user_id } });
    },
    async edit() {
      this.$router.push({ name: 'EditComment', params: { comment_id: this.comment.id } });
    },
    async like() {
      const response = await comments.likeComment(this.post.id, this.comment.id);
      if (response.status === 200) {
        this.$emit('updateComment', response.data);
        ElMessage.success('Comment successfully liked');
      }
      else ElMessage.error('Error liking comment');
    },
    async unlike() {
      const response = await comments.unlikeComment(this.post.id, this.comment.id);
      if (response.status === 200) {
        this.$emit('updateComment', response.data);
        ElMessage.success('Comment successfully unliked');
      }
      else ElMessage.error('Error unliking comment');
    },
    async dislike() {
      const response = await comments.dislikeComment(this.post.id, this.comment.id);
      if (response.status === 200) {
        this.$emit('updateComment', response.data);
        ElMessage.success('Comment successfully disliked');
      }
      else ElMessage.error('Error disliking comment');
    },
    async undislike() {
      const response = await comments.undislikeComment(this.post.id, this.comment.id);
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
</style>