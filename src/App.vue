<template>
  <div id="app">
    <NavBar @showSearchBar="showSearchBar = $event"/>
    <el-alert v-if="apiKey === '' || apiKey === null" title="You need to set an API key to use this application" type="error" show-icon></el-alert>
    <router-view v-else :showSearchBar="showSearchBar"></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import 'element-plus/theme-chalk/index.css'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      apiKey: localStorage.getItem('apiKey'),
      showSearchBar: false, // Add this line
    }
  }
}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}

</style>