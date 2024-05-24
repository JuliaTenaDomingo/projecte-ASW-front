<template>
  <div>
    <div class="with-cover">
      <el-image
        v-if="user.cover"
        :src="user.cover"
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
    <div class="tabs custom-tabs">
      <el-card class="box-card" shadow="hover" style="margin: 20px; height: 50px;" :style="{ background: '#0F0142' }">
        <el-row>
          <el-col :span="12" style="margin: -10px 0;">
            <el-button class="custom-button" :class="{ 'selected-button': activeTab === 'posts' }"
              @click="activeTab = 'posts'; fetchData()">Posts ({{ posts.length }})</el-button>
            <el-button class="custom-button" :class="{ 'selected-button': activeTab === 'comments' }"
              @click="activeTab = 'comments'; fetchData()">Comments ({{ comments.length }})</el-button>
            <el-button v-if="isCurrentUser" class="custom-button" :class="{ 'selected-button': activeTab === 'boosts' }"
              @click="activeTab = 'boosts'; fetchData()">Boosts ({{ boosts.length }})</el-button>
          </el-col>
        </el-row>
      </el-card>
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
      activeTab: 'posts',
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
      await this.fetchPosts();
      await this.fetchComments();
      await this.fetchBoosts();
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

.custom-button {
  background-color: transparent;
  color: white;
  border: none;
}
.selected-button {
  background-color: white;
  color: #0F0142;
}
.cover {
  display: block;
  width: 100%;
  overflow: hidden;
  max-height: 200px;
  object-fit: cover;
}
</style>
