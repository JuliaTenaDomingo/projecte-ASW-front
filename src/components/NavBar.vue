<template>
    <el-menu :default-active="activeIndex" background-color="#409EFF" text-color="#fff" active-text-color="#fff" class="el-menu-demo centered-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">Posts</el-menu-item>
        <el-menu-item index="2">Magazines</el-menu-item>
        <el-menu-item index="3">Profile</el-menu-item>
    </el-menu>
</template>
  
<script>
export default {
    name: 'NavBar',
    data() {
        return {
            activeIndex: '1'
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            this.activeIndex = key;
            if (key === '1') {
                this.$router.push({ name: 'Posts' });
            } else if (key === '2') {
                this.$router.push({ name: 'Magazines' });
            } else if (key === '3') {
                this.$router.push({ name: 'Profile' });
            }
        }
    },
}
</script>

<style scoped>
.centered-menu {
    display: flex;
    justify-content: center;
}
</style>