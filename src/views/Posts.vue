<template>
  <el-alert v-if="apiKey === '' || apiKey === null" title="You need to set an API key to use this application" type="error" show-icon></el-alert>
  <div v-else>
  <el-card class="box-card" shadow="hover" style="margin: 10px 0;" :body-style="{ background: '#f9fafb' }">
    <el-row>
      <el-col :span="12">
        <el-button :type="sort === 'top' ? 'primary' : 'default'" @click="sort = 'top'; getPosts()">Top</el-button>
        <el-button :type="sort === 'newest' ? 'primary' : 'default'" @click="sort = 'newest'; getPosts()">Newest</el-button>
        <el-button :type="sort === 'commented' ? 'primary' : 'default'" @click="sort = 'commented'; getPosts()">Commented</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-button :type="filter === 'all' ? 'primary' : 'default'" @click="filter = 'all'; getPosts()">All</el-button>
        <el-button :type="filter === 'links' ? 'primary' : 'default'" @click="filter = 'links'; getPosts()">Links</el-button>
        <el-button :type="filter === 'threads' ? 'primary' : 'default'" @click="filter = 'threads'; getPosts()">Threads</el-button>
      </el-col>
    </el-row>
  </el-card>
  <PostComponent v-for="post in posts" :key="post.id" :post="post" @updatePost="updatePost"></PostComponent>
</div>
</template>

<script>
import PostComponent from '@/components/PostComponent.vue'
import posts from '@/services/posts';
import magazine from '@/services/magazines';
import {ElLoading} from "element-plus";
import { ElMessage } from 'element-plus'; // for Vue 3

export default {
  name: 'Posts',
  components: {
    PostComponent
  },
  props: {
    magazine_id: String, default: ''
  },
  data() {
    return {
      posts: [],
      filter: 'all',
      sort: 'top',
      apiKey: localStorage.getItem('apiKey')
    }
  },
  methods: {
    async getPosts() {
      if (this.apiKey === '' || this.apiKey === null) {
        return;
      }
      const loadingFS = ElLoading.service({ fullscreen: true, text: 'Loading', background: 'rgba(255,255,255,0.7)' });
      let response = "";
      if (this.magazine_id === '' || this.magazine_id === undefined) response = await posts.list(this.filter, this.sort);
      else response = await magazine.posts(this.magazine_id, this.filter, this.sort);
      if (response.status === 200) {
        this.posts = response.data;
      }
      else ElMessage.error('Error retrieving posts');
      loadingFS.close();
    },
    async updatePost(newPost) {
        const index = this.posts.findIndex(post => post.id === newPost.id);
        if (index !== -1) {
            this.posts[index] = newPost;
        }
    },
  },
  async mounted() {
    await this.getPosts()
  }
}
</script>
