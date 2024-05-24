<template>
  <div id="app">
    <NavBar @toggleSearchBar="toggleSearchBar"/>
    <el-alert v-if="!hasSelectedUser" title="You need to select a user to use this application" type="error" show-icon></el-alert>
    <router-view v-if="hasSelectedUser" :key="componentKey" :showSearchBar="showSearchBar"></router-view>
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
      showSearchBar: false,
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
   toggleSearchBar(show) {
     this.showSearchBar = show;
   },
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
.defaultButton {
  color: #0F0142;
}
.defaultButton:hover {
  color: #0F0142;
  background-color: #EDE7F6;
  border-color:  #0F0142;
}
.newdefaultButton {
  color: #0F0142;
}
.newdefaultButton:hover {
  color: white;
  background-color: #0F0142;
  border-color:  #0F0142;
}
</style>
