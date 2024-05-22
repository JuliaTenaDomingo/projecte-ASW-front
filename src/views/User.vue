<template>
  <div>
    <div class="with-cover">
      <el-image
        v-if="user.cover"
        :src="user.cover"
        width="100%"
        class="cover"
        :alt="user.username"
      ></el-image>
      <div v-else class="cover-placeholder"></div>
      <div class="avatar-container">
        <el-avatar
          v-if="user.avatar"
          :src="user.avatar"
          class="avatar"
        ></el-avatar>
        <div v-else class="avatar-placeholder avatar"></div>
      </div>
    </div>
    <div class="user-main" id="content">
      <h2>@{{ user.username }}</h2>
      <p>{{ user.description }}</p>
    </div>
    <div class="tabs custom-tabs" style="margin-right: 21px; margin-left: 21px">
      <el-tabs v-model="activeTab" @tab-click="fetchData">
        <el-tab-pane label="All" name="all"></el-tab-pane>
        <el-tab-pane :label="'Posts (' + posts.length + ')'" name="posts"></el-tab-pane>
        <el-tab-pane :label="'Comments (' + comments.length + ')'" name="comments"></el-tab-pane>
        <el-tab-pane v-if="isCurrentUser" :label="'Boosts (' + boosts.length + ')'" name="boosts"></el-tab-pane>
      </el-tabs>
    </div>
    <div v-if="activeTab === 'all'">
      <div v-for="post in uniqueAllPosts" :key="post.id">
        <PostComponent :post="post" @updatePost="updatePost" ></PostComponent>
      </div>
      <div v-for="comment in comments" :key="comment.id">
<!--        <CommentComponent :comment="comment"></CommentComponent>-->
      </div>
    </div>
    <div v-if="activeTab === 'posts'" class="posts">
      <PostComponent v-for="post in posts" :key="post.id" :post="post" @updatePost="updatePost" ></PostComponent>
    </div>
    <div v-if="activeTab === 'comments'" class="comments">
<!--      <CommentComponent v-for="comment in comments" :key="comment.id" :comment="comment"></CommentComponent>-->
    </div>
    <div v-if="activeTab === 'boosts'" class="boosts">
      <PostComponent v-for="boost in boosts" :key="boost.id" :post="boost"  @updatePost="updatePost" ></PostComponent>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import users from '@/services/users';
import posts from '@/services/posts';
import PostComponent from '@/components/PostComponent.vue';
// import CommentComponent from '@/components/CommentComponent.vue';

export default {
  name: 'User',
  components: {
    PostComponent,
    // CommentComponent
  },
  data() {
    return {
      user: {},
      posts: [],
      comments: [],
      boosts: [],
      activeTab: 'all',
      rules: {
        username: [
          { required: true, message: 'Username is required', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Description is required', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['selectedUser']),
    isCurrentUser() {
      return this.selectedUser && this.selectedUser.userId === this.$route.params.user_id;
    },
    uniqueAllPosts() {
      const allPosts = [...this.posts, ...this.boosts];
      const postIds = new Set();
      return allPosts.filter(post => {
        if (!postIds.has(post.id)) {
          postIds.add(post.id);
          return true;
        }
        return false;
      });
    }
  },
  watch: {
    '$route.params.user_id': {
      handler() {
        this.refreshData();
      },
      immediate: true
    }
  },
  async mounted() {
    await this.refreshData();
  },
  methods: {
    async fetchUser() {
      try {
        const response = await users.retrieve(this.$route.params.user_id);
        if (response.status === 200) {
          this.user = response.data;
        } else {
          console.error('Failed to fetch user:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    },
    async fetchData() {
      if (this.activeTab === 'all') {
        await this.fetchPosts();
        await this.fetchComments();

        if (this.isCurrentUser) {
          await this.fetchBoosts();
        }
      } else if (this.activeTab === 'posts') {
        await this.fetchPosts();
      } else if (this.activeTab === 'comments') {
        await this.fetchComments();
      } else if (this.activeTab === 'boosts') {
        await this.fetchBoosts();
      }
    },
    async fetchPosts() {
      try {
        const response = await users.listPosts(this.$route.params.user_id, 'newest');
        if (response.status === 200) {
          this.posts = response.data;
        } else {
          console.error('Failed to fetch posts:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    },
    async fetchComments() {
      try {
        const response = await users.listComments(this.$route.params.user_id, 'newest');
        if (response.status === 200) {
          this.comments = response.data;
        } else {
          console.error('Failed to fetch comments:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    },
    async fetchBoosts() {
      try {
        const response = await users.listBoosts(this.$route.params.user_id);
        if (response.status === 200) {
          this.boosts = response.data;
        } else {
          console.error('Failed to fetch boosts:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch boosts:', error);
      }
    },
    async updatePost() {
      await this.fetchData();
    },
    async refreshData() {
      await this.fetchUser();
      await this.fetchData();
    },
    updateRoute(userId) {
      if (this.$route.params.userId !== userId.toString()) {
        this.$router.push({ path: `/users/${userId}` });
      }
    }
  }
};
</script>

<style scoped>
.with-cover {
  position: relative;
}
.cover {
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.cover-placeholder {
  width: 100%;
  height: 200px;
  background-color: grey;
}
.avatar-container {
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
}
.avatar-container .avatar {
  border: 3px solid white;
  border-radius: 50%;
  width: 120px;
  height: 120px;
}
.avatar-placeholder {
  width: 120px;
  height: 120px;
  background-color: grey;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-main {
  padding: 100px 20px 20px;
  text-align: center;
}
.user-form {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
.tabs {
  margin-top: 20px;
}
.custom-tabs .el-tabs__item {
  font-size: 20px;
}
.el-tabs__item {
  font-size: 20px !important;
}
</style>
