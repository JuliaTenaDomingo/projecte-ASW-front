<template>
  <PostComponent
    :key="post.id"
    :post="post"
    @updatePost="updatePost" >
  </PostComponent>
  <NewCommentComponent @updateComment="updateComment"/>
  <el-card class="box-card" shadow="hover" style="margin: 20px; height: 50px;" :body-style="{ background: '#409EFF' }">
    <el-row>
      <el-col :span="12" style="margin: -10px 0;">
        <el-button
            class="custom-button"
            :class="{ 'selected-button': sort === 'top' }"
            @click="sort = 'top'; getComments()"
        >top</el-button>
        <el-button
            class="custom-button"
            :class="{ 'selected-button': sort === 'newest' }"
            @click="sort = 'newest'; getComments()"
        >newest</el-button>
        <el-button
            class="custom-button"
            :class="{ 'selected-button': sort === 'oldest' }"
            @click="sort = 'oldest'; getComments()"
        >oldest</el-button>
      </el-col>
    </el-row>
  </el-card>
  <div v-for="comment in comments" :key="comment.id">
    <CommentComponent
        :comment="comment"
        :commentToEdit="commentToEdit"
        @updateComment="updateComment"
        @commentDeleted="deleteComment"
        @editComment="editComment"
    ></CommentComponent>
    <div class="separator"></div>
  </div></template>

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
      commentToEdit: null
    }
  },
  methods: {
    async getPost() {
      const loadingFS = ElLoading.service({ fullscreen: true, text: 'Loading', background: 'rgba(255,255,255,0.7)' })
      const response = await posts.retrieve(this.$route.params.post_id);
      if (response.status === 200) {
        this.post = response.data;
        const commentsResponse = await comments.listComments(this.$route.params.post_id);
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
    async updateComment(updatedComment) {
      const index = this.comments.findIndex(comment => comment.id === updatedComment.id);
      if (index !== -1) {
        const existingReplies = this.comments[index].all_replies;
        const mergedComment = { ...this.comments[index], ...updatedComment };
        mergedComment.all_replies = existingReplies;
        this.comments.splice(index, 1, mergedComment);
      }
    },
    async deleteComment(commentId) {
      const index = this.comments.findIndex(comment => comment.id === commentId);
      if (index !== -1) {
        this.comments.splice(index, 1);
      }
    },
    async editComment(comment) {
      this.commentToEdit = comment;
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
  color: #409EFF;
}
.separator {
  border-bottom: 1px solid #ccc;
  width: 97%;
  margin: auto;
}
</style>
