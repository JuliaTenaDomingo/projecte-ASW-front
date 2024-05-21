<template>
  <div id="app">
    <NavBar/>
    <el-alert v-if="!hasSelectedUser" title="You need to select a user to use this application" type="error" show-icon></el-alert>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import 'element-plus/theme-chalk/index.css'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['selectedUser']),
    hasSelectedUser() {
      return this.selectedUser !== null;
    }
  }
}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}
</style>
