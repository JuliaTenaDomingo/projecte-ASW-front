<template>
    <el-card class="box-card" shadow="hover" style="margin: 10px 0;" :body-style="{ background: '#f9fafb' }">
        <el-row type="flex" align="middle">
            <el-col :span="1">
                <el-row>
                    <el-col :span="24">
                        <el-button @click="like()" type="primary" size="large"><el-icon><Top /></el-icon> {{ likes }}</el-button>
                    </el-col>
                </el-row>
                <br>
                <el-row>
                    <el-col :span="24">
                        <el-button @click="dislike()" type="primary" size="large"><el-icon><Bottom /> </el-icon> {{ dislikes }}</el-button>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="23">
                <el-row>
                    <el-col :span="24">
                        <el-text style="margin-right: 10px;" size="large">{{ post.title }}</el-text><el-text type="primary"><a :href=post.url target="_blank">{{ post.url }}</a></el-text>
                    </el-col>
                </el-row>
                
                <el-row>
                    <el-col :span="24">
                        <el-button type="text" @click="goToUser()" size="small">{{ post.user_name }},</el-button>
                        <el-text>{{ timeAgo(post.created_at) }} to</el-text>
                        <el-button type="text" @click="goToMagazine()" size="small">{{ post.magazine_name }}</el-button>
                    </el-col>
                </el-row>
                <br>
                <el-row>
                    <el-col :span="24">
                        <el-text>{{ post.comments_count }} comments</el-text>
                        <el-button @click="boost()" size="small" style="margin-left: 10px;">boost({{ boosts }})</el-button>
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
    data() {
        return {
            likes: 0,
            dislikes: 0,
            boosts: 0,
            liked: true,
            disliked: false,
            boosted: false
        }
    },
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
        async getPost() {
            this.likes = this.post.likes_count;
            this.dislikes = this.post.dislikes_count;
            this.boosts = this.post.boosts_count;
        },
        async like() {
            try{
                const response = await posts.like(this.post.id);
                if (response.status === 200) {
                    this.likes = response.data.likes_count;
                    this.dislikes = response.data.dislikes_count;
                }
                else ElMessage.error('Error liking post');
            } catch (error) {
                if (error.response.status === 409) {
                    const response = await posts.unlike(this.id);
                    if (response.status === 200) {
                        this.likes = response.data.likes_count;
                        this.dislikes = response.data.dislikes_count;
                    }
                    else ElMessage.error('Error liking post');
                }
                else ElMessage.error('Error liking post');
            }
        },
        async dislike() {
            try{
                const response = await posts.dislike(this.post.id);
                if (response.status === 200) {
                    this.likes = response.data.likes_count;
                    this.dislikes = response.data.dislikes_count;
                }
                else ElMessage.error('Error liking post');
            } catch (error) {
                if (error.response.status === 409) {
                    const response = await posts.undislike(this.id);
                    if (response.status === 200) {
                        this.likes = response.data.likes_count;
                        this.dislikes = response.data.dislikes_count;
                    }
                    else ElMessage.error('Error liking post');
                }
                else ElMessage.error('Error liking post');
            }
        },
        async boost() {
            try{
                const response = await posts.boost(this.post.id);
                if (response.status === 200) {
                    this.boosts = response.data.boosts_count;
                }
                else ElMessage.error('Error liking post');
            } catch (error) {
                if (error.response.status === 409) {
                    const response = await posts.unboost(this.id);
                    if (response.status === 200) {
                        this.boosts = response.data.boosts_count;
                    }
                    else ElMessage.error('Error liking post');
                }
                else ElMessage.error('Error liking post');
            }
        },
        async goToUser() {
            this.$router.push({ name: 'User', params: { user_id: this.post.user_id } });
        },
        async goToMagazine() {
            this.$router.push({ name: 'Magazine', params: { magazine_id: this.post.magazine_id } });
        }
    },
    async mounted() {
        await this.getPost()
    }
}
</script>