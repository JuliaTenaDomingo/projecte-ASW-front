<template>
  <el-card class="box-card" shadow="hover" style="margin: 10px 0;">
    <el-row>
      <el-col :span="12">
        <el-button :type="sort === 'top' ? 'primary' : 'text'" @click="sort = 'top'; getPosts()">Top</el-button>
        <el-button :type="sort === 'newest' ? 'primary' : 'text'" @click="sort = 'newest'; getPosts()">Newest</el-button>
        <el-button :type="sort === 'commented' ? 'primary' : 'text'" @click="sort = 'commented'; getPosts()">Commented</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-button :type="filter === 'all' ? 'primary' : 'text'" @click="filter = 'all'; getPosts()">All</el-button>
        <el-button :type="filter === 'links' ? 'primary' : 'text'" @click="filter = 'links'; getPosts()">Links</el-button>
        <el-button :type="filter === 'threads' ? 'primary' : 'text'" @click="filter = 'threads'; getPosts()">Threads</el-button>
      </el-col>
    </el-row>
  </el-card>

  <PostComponent v-for="post in posts" :key="post.id" :post="post"></PostComponent>
</template>

<script>
import PostComponent from '@/components/PostComponent.vue'
import posts from '@/services/posts';

export default {
  name: 'Posts',
  components: {
    PostComponent
  },
  data() {
    return {
      posts: [],
      filter: 'all',
      sort: 'top'
    }
  },
  methods: {
    async getPosts() {
      const response = await posts.list(this.filter, this.sort);
      if (response.status === 200) {
        this.posts = response.data;
      }
    }
  },
  async mounted() {
    await this.getPosts()
  }
}
</script>
