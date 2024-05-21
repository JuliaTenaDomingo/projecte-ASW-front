<template>
  <div id="app">
    <NavBar @showSearchBar="showSearchBar = $event"/>
    <el-alert v-if="!hasSelectedUser" title="You need to select a user to use this application" type="error" show-icon></el-alert>
    <router-view v-if="hasSelectedUser"></router-view>
    <router-view :showSearchBar="showSearchBar"></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import 'element-plus/theme-chalk/index.css'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      showSearchBar: true
    }
  },
  computed: {
    ...mapGetters(['selectedUser']),
    hasSelectedUser() {
      return this.selectedUser !== null;
    }
  },
  methods: {
    ...mapMutations(['initializeUser']),
  },
  mounted() {
    this.initializeUser(); // Inicializar el usuario seleccionado desde localStorage
  }
}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}
</style>
