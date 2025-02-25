<template>
    <el-card class="box-card" shadow="hover" style="margin: 20px;" :body-style="{ background: '#EDE7F6' }">
        <el-row type="flex" align="middle">
            <el-col :xl="1" :lg="2" :md="2" :sm="3" :xs="4">
                <el-row>
                    <el-col>
                        <el-button v-if="!post.current_user_likes" @click="like()" class="defaultButton" size="large"><el-icon><Top /></el-icon> {{ post.likes_count }}</el-button>
                        <el-button v-else @click="unlike()" style="background-color:#0f0142; color: white" size="large"><el-icon><Top /></el-icon> {{ post.likes_count }}</el-button>
                    </el-col>
                </el-row>
                <br>
                <el-row>
                    <el-col>
                        <el-button v-if="!post.current_user_dislikes" @click="dislike()" class="defaultButton" size="large"><el-icon><Bottom /> </el-icon> {{ post.dislikes_count }}</el-button>
                        <el-button v-else @click="undislike()" style="background-color:#0f0142; color: white" size="large"><el-icon><Bottom /> </el-icon> {{ post.dislikes_count }}</el-button>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :xl="23" :lg="22" :md="22" :sm="21" :xs="20">
                <el-row style="margin-bottom: 5px; height: 30px;">
                    <el-col>
                        <el-button :link="true" @click="goToPost" style="color:#0F0142; font-size: large; font-weight: bold; margin-right:10px">{{ post.title }}</el-button>
                        <a v-if=post.url :href="formatUrl(post.url)" target="_blank">({{ post.url }})</a>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom: 30px; height: 15px;">
                    <el-col >
                        <el-button style="color:#0F0142" :link="true" @click="goToUser()" >{{ post.user_name }}</el-button>
                        <el-text>, {{ timeAgo(post.created_at) }} to </el-text>
                        <el-button style="color:#0F0142" :link="true" @click="goToMagazine()">{{ post.magazine_name }}</el-button>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col>
                        <el-button :link="true" style="color:#0F0142" @click="goToPost" size="small" >{{ post.comments_count }} comments</el-button>
                        <el-button v-if="!post.current_user_boosts" @click="boost()" size="small" class="defaultButton"  style="margin-left: 10px;">boost ({{ post.boosts_count }})</el-button>
                        <el-button v-else @click="unboost()" size="small" style="background-color:#0f0142; color: white; margin-left: 10px;">unboost ({{ post.boosts_count }})</el-button>
                        <el-button  v-if="post.current_user_owns" @click="editPost()" size="small" class="defaultButton" style="margin-left: 10px;">edit</el-button>
                        <el-button  v-if="post.current_user_owns" @click="deletePost()" size="small" class="defaultButton" style="margin-left: 10px;">delete</el-button>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 20px; height: 15px;" v-if="showBody">
                    <el-text style="margin-left:3px"> {{ post.body }} </el-text>
                </el-row>
            </el-col>
        </el-row>
        <CommentComponent
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
        />
    </el-card>
</template>

<script>
import moment from 'moment';
import posts from '@/services/posts';
import CommentComponent from './CommentComponent.vue';
import { ElMessage } from 'element-plus';

export default {
    name: 'PostComponent',
    props: {
        post: {
            type: Object,
            required: true
        },
        comments: {
          type: Array,
          default: () => []
        },
        showBody: {
            type: Boolean,
            default: false
        }
    },
    components: {
      CommentComponent,
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
        async editPost() {
            this.$router.push({ name: 'EditPost', params: { post_id: this.post.id } });
        },
        async deletePost() {
            const response = await posts.delete(this.post.id);
            if (response.status === 204) {
                this.$emit('deletePost', this.post.id);
                this.$emit('updatePost', this.post.id);
                ElMessage.success('Post successfully deleted');
            }
            else ElMessage.error('Error deleting post');
        }
    },
}
</script>

<style scoped>
a {
  color: #0F0142;
  font-size: small;
}
</style>