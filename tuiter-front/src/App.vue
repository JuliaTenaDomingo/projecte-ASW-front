<template>
  <div id="app">
    <NavBar/>    
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import 'element-plus/theme-chalk/index.css'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>