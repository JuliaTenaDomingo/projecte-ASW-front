<template>
  <el-alert v-if="apiKey === '' || apiKey === null" title="You need to set an API key to use this application" type="error" show-icon></el-alert>
  <div v-else>
  <el-card class="box-card" shadow="hover" style="margin: 10px 0;" :body-style="{ background: '#f9fafb' }">
    <el-row>
      <el-col :span="12">
        <el-button :type="sort === 'posts' ? 'primary' : 'default'" @click="sort = 'posts'; getMagazines()">Posts</el-button>
        <el-button :type="sort === 'comments' ? 'primary' : 'default'" @click="sort = 'comments'; getMagazines()">Comments</el-button>
        <el-button :type="sort === 'subscriptions' ? 'primary' : 'default'" @click="sort = 'subscriptions'; getMagazines()">Subscriptions</el-button>
      </el-col>
    </el-row>
  </el-card>
  <MagazineComponent v-for="magazine in magazines" :key="magazine.id" :magazine="magazine" @updateMagazine="updateMagazine"></MagazineComponent>
</div>
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
      sort: '',
      apiKey: localStorage.getItem('apiKey')
    }
  },
  methods: {
    async getMagazines() {
      if (this.apiKey === '' || this.apiKey === null) {
        return;
      }
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
