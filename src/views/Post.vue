<template>
  <PostComponent
    :key="post.id"
    :post="post"
    @updatePost="updatePost" >
  </PostComponent>
  <NewCommentComponent />
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
  <CommentComponent v-for="comment in comments" :key="comment.id" :comment="comment"></CommentComponent>
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
      comments: []
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
</style>
