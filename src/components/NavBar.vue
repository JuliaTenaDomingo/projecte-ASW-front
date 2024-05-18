<template>
    <el-menu :default-active="activeIndex" :ellipsis="false" background-color="#409EFF" text-color="#fff"
        active-text-color="#fff" class="el-menu-demo centered-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><el-text>Posts</el-text></el-menu-item>
        <el-menu-item index="2"><el-text>Magazines</el-text></el-menu-item>
        <el-menu-item index="3"><el-text>Profile</el-text></el-menu-item>
        <el-sub-menu index="4">
            <template #title><el-icon>
                    <Plus />
                </el-icon></template>
            <el-menu-item index="4-1"><el-text>New Thread</el-text></el-menu-item>
            <el-menu-item index="4-2"><el-text>New Link</el-text></el-menu-item>
            <el-menu-item index="4-3"><el-text>New Magazine</el-text></el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
            <template #title><el-text>API Keys</el-text></template>
            <el-menu-item index="5-1"><el-text>Miquel API</el-text></el-menu-item>
            <el-menu-item index="5-2"><el-text>Alba API</el-text></el-menu-item>
            <el-menu-item index="5-3"><el-text>Júlia API</el-text></el-menu-item>
            <el-menu-item index="5-3"><el-text>Agus API</el-text></el-menu-item>
            <el-input v-model="inputApiKey" @keyup.enter="setApiKey" placeholder="Please input your API key"></el-input>
        </el-sub-menu>
    </el-menu>
</template>

<script>
import 'element-plus/theme-chalk/index.css'

export default {
    name: 'NavBar',
    data() {
        return {
            activeIndex: '1',
            inputApiKey: ''
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
            } else if (key === '4-1') {
                this.$router.push({ name: 'NewThread' });
            } else if (key === '4-2') {
                this.$router.push({ name: 'NewLink' });
            } else if (key === '4-3') {
                this.$router.push({ name: 'NewMagazine' });
            } else if (key === '5-1') {
                localStorage.setItem('apiKey', "96e76c7a1a99a34386fab31b0e6d7f7d");
                location.reload();
            } else if (key === '5-2') {
                localStorage.setItem('apiKey', "");
                location.reload();
            } else if (key === '5-3') {
                localStorage.setItem('apiKey', "");
                location.reload();
            } else if (key === '5-4') {
                localStorage.setItem('apiKey', "");
                location.reload();
            }
        },
        setApiKey() {
            localStorage.setItem('apiKey', this.inputApiKey);
            location.reload();
        },
    },
}
</script>

<style scoped>
.centered-menu {
    display: flex;
    justify-content: center;
}

.el-text {
    color: white;
    font-family: 'Your Font', sans-serif;
    /* Replace 'Your Font' with the name of your font */
}
</style>