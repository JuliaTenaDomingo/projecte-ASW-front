<template>
    <MagazineComponentExtended :magazine="magazine" @updateMagazine="updateMagazine" />
    <Posts :magazine_id="$route.params.magazine_id"/>
</template>

<script>
import MagazineComponentExtended from '../components/MagazineComponentExtended.vue';
import magazine from '../services/magazines';
import { ElMessage } from 'element-plus'; // for Vue 3
import Posts from './Posts.vue';

export default {
  name: 'Magazine',
  components: {
    Posts,
    MagazineComponentExtended
  },
  data() {
    return {
      magazine: {},
      posts: [],
    };
  },
  methods: {
    async getMagazine() {
      const response = await magazine.retrieve(this.$route.params.magazine_id);
      if (response.status === 200) this.magazine = response.data;
      else ElMessage.error('Error retrieving magazine');   
    },
    updateMagazine(newMagazine) {
      this.magazine = newMagazine;
    },
  },
  async mounted() {
    await this.getMagazine();
  }
}
</script>
