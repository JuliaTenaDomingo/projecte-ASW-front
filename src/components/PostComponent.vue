<template>
    <el-card class="box-card" shadow="hover" style="margin: 10px 0;" :body-style="{ background: '#f9fafb' }">
        <el-row type="flex" align="middle">
            <el-col :xl="1" :lg="2" :md="2" :sm="3" :xs="3">
                <el-row>
                    <el-col>
                        <el-button v-if="!post.current_user_likes" @click="like()" style="color:#409EFF" size="large"><el-icon><Top /></el-icon> {{ post.likes_count }}</el-button>
                        <el-button v-else @click="unlike()" type="primary" size="large"><el-icon><Top /></el-icon> {{ post.likes_count }}</el-button>
                    </el-col>
                </el-row>
                <br>
                <el-row>
                    <el-col>
                        <el-button v-if="!post.current_user_dislikes" @click="dislike()" style="color:#409EFF" size="large"><el-icon><Bottom /> </el-icon> {{ post.dislikes_count }}</el-button>
                        <el-button v-else @click="undislike()" type="primary" size="large"><el-icon><Bottom /> </el-icon> {{ post.dislikes_count }}</el-button>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :xl="23" :lg="22" :md="22" :sm="21" :xs="21">
                <el-row style="margin-bottom: 5px; height: 30px;">
                    <el-col>
                        <el-button :link="true" @click="goToPost" style="color:#409EFF; font-size: large; font-weight: bold; margin-right:10px">{{ post.title }}</el-button>
                        <a :href="formatUrl(post.url)" target="_blank">({{ post.url }})</a>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom: 30px; height: 15px;">
                    <el-col >
                        <el-button style="color:#409EFF" :link="true" @click="goToUser()" >{{ post.user_name }}</el-button>
                        <el-text>, {{ timeAgo(post.created_at) }} to </el-text>
                        <el-button style="color:#409EFF" :link="true" @click="goToMagazine()">{{ post.magazine_name }}</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col >
                        <el-button :link="true" style="color:#409EFF" @click="goToPost" size="small" >{{ post.comments_count }} comments</el-button>
                        <el-button v-if="!post.current_user_boosts" @click="boost()" size="small" style="color:#409EFF; margin-left: 10px;">boost ({{ post.boosts_count }})</el-button>
                        <el-button v-else @click="unboost()" size="small" type="primary" style="margin-left: 10px;">unboost ({{ post.boosts_count }})</el-button>
                        <el-button v-if="post.current_user_owns" @click="edit()" size="small" style="color:#409EFF; margin-left: 10px;">edit</el-button>
                    </el-col>
                </el-row>
            </el-col>  
        </el-row>
    </el-card>
</template>

<script>
import moment from 'moment';
import posts from '@/services/posts';
import { ElMessage } from 'element-plus'; // for Vue 3

export default {
    name: 'PostComponent',
    props: {
        post: {
            type: Object,
            required: true
        },
    },
    methods: {
        timeAgo(date) {
            return moment(date).fromNow();
        },
        formatUrl(url) {
            if (!/^https?:\/\//i.test(url)) {
                url = 'http://' + url;
            }
            return url;
        },
        async like() {
            const response = await posts.like(this.post.id);
            if (response.status === 200) {
                this.$emit('updatePost', response.data);
                ElMessage.success('Post successfully liked');
            }
            else ElMessage.error('Error liking post');
        },
        async unlike() {
            const response = await posts.unlike(this.post.id);
            if (response.status === 200) {
                this.$emit('updatePost', response.data);
                ElMessage.success('Post successfully unliked');
            }
            else ElMessage.error('Error unliking post');
        },
        async dislike() {
            const response = await posts.dislike(this.post.id);
            if (response.status === 200) {
                this.$emit('updatePost', response.data);
                ElMessage.success('Post successfully disliked');
            }
            else ElMessage.error('Error disliking post');
        },
        async undislike() {
            const response = await posts.undislike(this.post.id);
            if (response.status === 200) {
                this.$emit('updatePost', response.data);
                ElMessage.success('Post successfully undisliked');
            }
            else ElMessage.error('Error undisliking post');
        },
        async boost() {
            const response = await posts.boost(this.post.id);
            if (response.status === 200) {
                this.$emit('updatePost', response.data);
                ElMessage.success('Post successfully boosted');
            }
            else ElMessage.error('Error boosting post');
        },
        async unboost() {
            const response = await posts.unboost(this.post.id);
            if (response.status === 200) {
                this.$emit('updatePost', response.data);
                ElMessage.success('Post successfully unboosted');
            }
            else ElMessage.error('Error unboosting post');
        },
        async goToUser() {
            this.$router.push({ name: 'User', params: { user_id: this.post.user_id } });
        },
        async goToMagazine() {
            this.$router.push({ name: 'Magazine', params: { magazine_id: this.post.magazine_id } });
        },
        async goToPost() {
            this.$router.push({ name: 'Post', params: { post_id: this.post.id } });
        },
        async edit() {
            this.$router.push({ name: 'EditPost', params: { post_id: this.post.id } });
        }
    },
}
</script>

<style scoped>
a {
    color: #409EFF;
    font-size: small;
}
</style>