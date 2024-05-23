<template>
  <NewPostComponent :initialPost="form" :isLink="isLink" />
</template>

<script>
import NewPostComponent from '@/components/NewPostComponent.vue';

export default {
  name: 'NewPost',
  components: {
    NewPostComponent
  },
  data() {
    return {
      form: {
        url: '',
        title: '',
        body: '',
        magazine_id: '',
      },
      isLink: this.$route.query.isLink === 'true',
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.isLink = to.query.isLink === 'true';
    next();
  }
};
</script>