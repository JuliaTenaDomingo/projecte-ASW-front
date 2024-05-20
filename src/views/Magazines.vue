<template>
  <el-card class="box-card" shadow="hover" style="margin: 20px; height: 50px;" :body-style="{ background: '#409EFF' }">
    <el-row>
      <el-col :span="12" style="margin: -10px 0;">
        <el-button 
          class="custom-button" 
          :class="{ 'selected-button': sort === 'posts' }" 
          @click="sort = 'posts'; getMagazines()"
        >Posts</el-button>
        <el-button 
          class="custom-button" 
          :class="{ 'selected-button': sort === 'comments' }" 
          @click="sort = 'comments'; getMagazines()"
        >Comments</el-button>
        <el-button 
          class="custom-button" 
          :class="{ 'selected-button': sort === 'subscriptions' }" 
          @click="sort = 'subscriptions'; getMagazines()"
        >Subscriptions</el-button>
      </el-col>
    </el-row>
  </el-card>
  <MagazineComponent v-for="magazine in magazines" :key="magazine.id" :magazine="magazine" @updateMagazine="updateMagazine"></MagazineComponent>
</template>

<script>
import MagazineComponent from '@/components/MagazineComponent.vue'
import magazines from '@/services/magazines';
import {ElLoading} from "element-plus";
import { ElMessage } from 'element-plus'; // for Vue 3

export default {
  name: 'Magazines',
  components: {
    MagazineComponent
  },
  data() {
    return {
      magazines: [],
      sort: 'posts',
    }
  },
  methods: {
    async getMagazines() {
      const loadingFS = ElLoading.service({ fullscreen: true, text: 'Loading', background: 'rgba(255,255,255,0.7)' })
      const response = await magazines.list(this.sort);
      if (response.status === 200) {
        this.magazines = response.data;
      }
      else ElMessage.error('Error retrieving magazines');
      loadingFS.close();
    },
    updateMagazine(newMagazine) {
        const index = this.magazines.findIndex(magazine => magazine.id === newMagazine.id);
        if (index !== -1) {
            this.magazines[index] = newMagazine;
        }
    },
  },
  async mounted() {
    await this.getMagazines()
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