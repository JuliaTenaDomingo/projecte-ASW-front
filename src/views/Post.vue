<template>
  <PostComponent
    :key="post.id"
    :post="post" @updatePost="updatePost"></PostComponent>

</template>

<script>
import PostComponent from '../components/PostComponent.vue';
import posts from '../services/posts';

export default {
  name: 'Post',
  components: {
    PostComponent
  },
  data() {
    return {
      post: {}
    }
  },
  methods: {
    async getPost() {
      const response = await posts.retrieve(this.$route.params.post_id);
      if (response.status === 200) {
        this.post = response.data;
      }
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
