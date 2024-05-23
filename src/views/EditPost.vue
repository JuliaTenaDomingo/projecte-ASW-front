<template>
  <NewPostComponent :initialPost="post" :isLink="isLink" />

</template>

<script>
import NewPostComponent from '@/components/NewPostComponent.vue';
import posts from '@/services/posts.js';

export default {
  name: 'EditPost',
  components: {
    NewPostComponent
  },
  data() {
    return {
      post: {},
      isLink: false
    };
  },
  async created() {
    const response = await posts.retrieve(this.$route.params.post_id);
    if (response.status === 200) {
      this.post = response.data;
      if (this.post.url) {
        this.isLink = true;
      }
    }
  },
};
</script>