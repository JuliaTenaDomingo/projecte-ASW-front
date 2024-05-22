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
        <p><strong>API Key:</strong> {{ user.apiKey }}</p>
    </div>
    <div class="user-form">
      <el-form ref="form" :model="user" label-width="120px" :rules="rules">
        <el-form-item label="Username" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input type="textarea" v-model="user.description"></el-input>
        </el-form-item>
        <el-form-item label="Avatar" prop="avatar">
          <el-upload
            action="/upload/avatar"
            list-type="picture"
            :auto-upload="false"
            :on-change="handleAvatarChange"
          >
            <el-button>Choose file</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="Cover" prop="cover">
          <el-upload
            action="/upload/cover"
            list-type="picture"
            :auto-upload="false"
            :on-change="handleCoverChange"
          >
            <el-button>Choose file</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateProfile">Update Profile</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import users from '@/services/users';

export default {
  name: 'User',
  data() {
    return {
      user: {},
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
    ...mapGetters(['selectedUser'])
  },
  watch: {
    selectedUser: {
      handler(newVal) {
        if (newVal) {
          this.updateRoute(newVal.userId);
          this.fetchUser(newVal.userId);
        }
      },
      immediate: true
    }
  },
  async mounted() {
    await this.fetchUser(this.$route.params.userId);
  },
  methods: {
    async fetchUser(userId) {
      try {
        const response = await users.retrieve(userId);
        if (response.status === 200) {
          this.user = response.data;
        } else {
          console.error('Failed to fetch user:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    },
    updateRoute(userId) {
      if (this.$route.params.userId !== userId.toString()) {
        this.$router.push({ path: `/users/${userId}` });
      }
    },
    handleAvatarChange(file) {
      this.user.avatar = URL.createObjectURL(file.raw);
    },
    handleCoverChange(file) {
      this.user.cover = URL.createObjectURL(file.raw);
    },
    async updateProfile() {
      try {
        const response = await users.update(this.user.userId, this.user);
        if (response.status === 200) {
          this.$message.success('Profile updated successfully');
        } else {
          this.$message.error('Failed to update profile');
        }
      } catch (error) {
        this.$message.error('Failed to update profile');
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
  padding: 80px 20px 20px;
  text-align: center;
}
.user-form {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
