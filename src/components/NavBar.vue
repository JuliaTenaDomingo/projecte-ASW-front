<template>
    <el-menu :default-active="activeIndex" :ellipsis="false" background-color="#409EFF" text-color="#fff"
        active-text-color="#fff" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="0">
        <h2 style="color: white;">Tuiter</h2>
        </el-menu-item>
        
        <el-menu-item index="1">Posts</el-menu-item>
        <el-menu-item index="2">Magazines</el-menu-item>
        <el-menu-item index="3">Profile</el-menu-item>
        <div class="flex-grow" />
        <el-sub-menu index="4">
            <template #title><el-icon>
                    <Plus />
                </el-icon></template>
            <el-menu-item index="4-1">New Thread</el-menu-item>
            <el-menu-item index="4-2">New Link</el-menu-item>
            <el-menu-item index="4-3">New Magazine</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
            <template #title>API Keys</template>
            <el-menu-item index="5-1">Miquel API</el-menu-item>
            <el-menu-item index="5-2">Alba API</el-menu-item>
            <el-menu-item index="5-3">Júlia API</el-menu-item>
            <el-menu-item index="5-3">Agus API</el-menu-item>
            <el-input v-model="inputApiKey" style="padding-left: 10px;padding-right: 10px;" @keyup.enter="setApiKey" placeholder="Please input your API key"></el-input>
        </el-sub-menu>
    </el-menu>
</template>

<script>
import 'element-plus/theme-chalk/index.css'
import { useRoute } from 'vue-router';
import { computed } from 'vue';

export default {
    name: 'NavBar',
    setup() {
        const route = useRoute();
        const activeIndex = computed(() => {
            switch (route.path) {
                case '/posts': return '1';
                case '/magazines': return '2';
                case '/profile': return '3';
                default: return '1';
            }
        });
        return { activeIndex };
    },
    data() {
        return {
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
                this.$router.push({ name: 'User' });
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
.flex-grow {
  flex-grow: 1;
}
h2 {
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>