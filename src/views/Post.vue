<template>
  <PostComponent
    :key="post.id"
    :post="post"
    :showBody="true"
    @updatePost="updatePost"
    @deletePost="deletePost">
  </PostComponent>
  <NewCommentComponent @updateComment="updateComment" @commentCreated="getPost"/>
  <el-card class="box-card" shadow="hover" style="margin: 20px; height: 50px;" :body-style="{ background: '#0F0142' }">
    <el-row>
      <el-col :span="12" style="margin: -10px 0;">
        <el-button
            class="custom-button"
            :class="{ 'selected-button': sort === 'top' }"
            @click="sort = 'top'; getPost()"
        >top</el-button>
        <el-button
            class="custom-button"
            :class="{ 'selected-button': sort === 'newest' }"
            @click="sort = 'newest'; getPost()"
        >newest</el-button>
        <el-button
            class="custom-button"
            :class="{ 'selected-button': sort === 'oldest' }"
            @click="sort = 'oldest'; getPost()"
        >oldest</el-button>
      </el-col>
    </el-row>
  </el-card>
  <div v-for="comment in comments" :key="comment.id">
    <CommentComponent
        :comment="comment"
        :commentToEdit="commentToEdit"
        :commentToReply="commentToReply"
        @commentCreated="getPost"
        @replyComment="replyComment"
        @updateComment="updateComment"
        @commentDeleted="deleteComment"
        @editComment="editComment"
    ></CommentComponent>
    <div class="separator"></div>
  </div>
</template>

<script>
import PostComponent from '../components/PostComponent.vue';
import posts from '../services/posts';
import comments from '../services/comments';
import CommentComponent from "@/components/CommentComponent.vue";
import { ElLoading, ElMessage } from 'element-plus';
import NewCommentComponent from "@/components/NewCommentComponent.vue";

export default {
  name: 'Post',
  components: {
    NewCommentComponent,
    CommentComponent,
    PostComponent
  },
  data() {
    return {
      post: {},
      comments: [],
      commentToEdit: null,
      commentToReply: null,
      sort: 'top'
    }
  },
  methods: {
    async getPost() {
      const loadingFS = ElLoading.service({ fullscreen: true, text: 'Loading', background: 'rgba(255,255,255,0.7)' })
      const response = await posts.retrieve(this.$route.params.post_id);
      if (response.status === 200) {
        this.post = response.data;
        const commentsResponse = await comments.listComments(this.$route.params.post_id, this.sort);
        if (commentsResponse.status === 200) {
          this.comments = commentsResponse.data;
        } else {
          ElMessage.error('Error retrieving comments');
        }
      }
      else ElMessage.error('Error retrieving post');
      loadingFS.close();
    },
    async updatePost(newPost) {
      if (this.post.id === newPost.id) {
        this.post = newPost;
      }
    },
    async deletePost() {
      this.$router.push({ name: 'Posts' });
    },

    //Edit comments
    async updateComment(updatedComment) {
      console.log("Step2")
      location.reload()
      const index = this.comments.findIndex(comment => comment.id === updatedComment.id);
      if (index !== -1) {
        const existingReplies = this.comments[index].all_replies;
        const mergedComment = { ...this.comments[index], ...updatedComment };
        mergedComment.all_replies = existingReplies;
        this.comments.splice(index, 1, mergedComment);
      }
    },
    async editComment(comment) {
      this.commentToEdit = comment;
    },

    //Delete comments
    async deleteComment(commentId) {
      const index = this.comments.findIndex(comment => comment.id === commentId);
      if (index !== -1) {
        this.comments.splice(index, 1);
      }
    },

    //Reply comments
    async replyComment(comment) {
      this.commentToReply = comment;
    },

  },
  async mounted() {
    await this.getPost()
  }
}
</script>

<style scoped>
.custom-button {
  background-color: transparent;
  color: white;
  border: none;
}
.selected-button {
  background-color: white;
  color: #0F0142;
}
.separator {
  border-bottom: 1px solid #ccc;
  width: 97%;
  margin: auto;
}
</style>
