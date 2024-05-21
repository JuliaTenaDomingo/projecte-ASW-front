<template>
  <el-form v-if="showSearchBar" @submit.prevent="getPosts()">
    <el-form-item>
      <el-input v-model="search" placeholder="Search" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">Search</el-button>
    </el-form-item>
  </el-form>

  <div v-else>
  <el-card class="box-card" shadow="hover" style="margin: 20px; height: 50px;" :style="{ background: '#0F0142' }">
    <el-row>
      <el-col :span="12" style="margin: -10px 0;">
        <el-button 
          class="custom-button" 
          :class="{ 'selected-button': sort === 'top' }" 
          @click="sort = 'top'; getPosts()"
        >Top</el-button>
        <el-button 
          class="custom-button" 
          :class="{ 'selected-button': sort === 'newest' }" 
          @click="sort = 'newest'; getPosts()"
        >Newest</el-button>
        <el-button 
          class="custom-button" 
          :class="{ 'selected-button': sort === 'commented' }" 
          @click="sort = 'commented'; getPosts()"
        >Commented</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;margin: -10px 0;">
        <el-button 
          class="custom-button" 
          :class="{ 'selected-button': filter === 'all' }" 
          @click="filter = 'all'; getPosts()"
        >All</el-button>
        <el-button 
          class="custom-button" 
          :class="{ 'selected-button': filter === 'links' }" 
          @click="filter = 'links'; getPosts()"
        >Links</el-button>
        <el-button 
          class="custom-button" 
          :class="{ 'selected-button': filter === 'threads' }" 
          @click="filter = 'threads'; getPosts()"
        >Threads</el-button>
      </el-col>
    </el-row>
  </el-card>
  <PostComponent v-for="post in posts" :key="post.id" :post="post" @updatePost="updatePost" @deletePost="deletePost"></PostComponent>
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
    magazine_id: String, default: '', required: false,
    showSearchBar: Boolean, default: false, required: false
  },
  data() {
    return {
      posts: [],
      filter: 'all',
      sort: 'top',
    }
  },

  methods: {
    async getPosts() {
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
    async deletePost() {
      await this.getPosts();
    },
  },
  async mounted() {
    await this.getPosts()
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
</style>
