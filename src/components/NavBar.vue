<template>
    <el-menu :default-active="activeIndex" :ellipsis="false" background-color="#0F0142" text-color="#fff"
        active-text-color="#fff" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="0">
        <h2 style="color: white;">Tuiter</h2>
        </el-menu-item>
      <div class="flex-grow" />

      <el-menu-item index="1">Posts</el-menu-item>
      <el-menu-item index="2">Magazines</el-menu-item>

      <div class="flex-grow" />

      <el-menu-item index="6">
          <template #title>
              <el-icon>
                  <Search />
              </el-icon>
          </template>
      </el-menu-item>

      <el-sub-menu index="4">
          <template #title>
              <el-icon>
                  <Plus />
              </el-icon>
          </template>
          <el-menu-item index="4-1">New Thread</el-menu-item>
          <el-menu-item index="4-2">New Link</el-menu-item>
          <el-menu-item index="4-3">New Magazine</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="3" @click="handleProfileClick">{{ profileText }}</el-menu-item>

      <el-sub-menu index="5">
          <template #title>Users</template>
          <el-menu-item index="5-1" @click="selectUser(11)">Miquel</el-menu-item>
          <el-menu-item index="5-2" @click="selectUser(13)">Alba</el-menu-item>
          <el-menu-item index="5-3" @click="selectUser(12)">Júlia</el-menu-item>
          <el-menu-item index="5-4" @click="selectUser(18)">Agus</el-menu-item>
      </el-sub-menu>
  </el-menu>
</template>

<script>
import 'element-plus/theme-chalk/index.css';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'NavBar',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const activeIndex = computed(() => {
      switch (route.path) {
        case '/posts': return '1';
        case '/magazines': return '2';
        case '/profile': return '3';
        default: return '1';
      }
    });
    return { activeIndex, router };
  },
  computed: {
    ...mapGetters(['profileText'])
  },
  methods: {
    ...mapMutations(['selectUser']),
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key;
      if (key === '1' || key === '0') {
        this.$router.push({ name: 'Posts' });
        this.$emit('toggleSearchBar', false);
      } else if (key === '2') {
        this.$router.push({ name: 'Magazines' });
      } else if (key === '3') {
        this.handleProfileClick();
      } else if (key === '4-1') {
        this.$router.push({ name: 'NewThread' });
      } else if (key === '4-2') {
        this.$router.push({ name: 'NewLink' });
      } else if (key === '4-3') {
        this.$router.push({ name: 'NewMagazine' });
      }
      else if (key === '6'){
        this.$router.push({ name: 'Posts' });
        this.$emit('toggleSearchBar', true);
      }
    },
    selectUser(userId) {
      this.$store.commit('selectUser', { userId }); // Aquí corregimos la llamada a la mutación
    },
    handleProfileClick() {
      const user = this.$store.getters.selectedUser;
      if (user) {
        this.$router.push({ path: `/users/${user.userId}` });
      } else {
        alert('No user selected.');
      }
    },
    navigateToProfile() {
      const user = this.selectedUser;
      if (user) {
        this.$router.push({ path: `/users/${user.userId}` });
      }
    },
    navigateToEditProfile() {
      const user = this.selectedUser;
      if (user) {
        this.$router.push({ path: `/users/${user.userId}/edit` });
      }
    },
  }
};
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
h2 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.el-menu-item {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
