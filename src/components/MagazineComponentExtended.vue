<template>
    <el-card class="box-card" shadow="hover" style="margin: 10px 0;" :body-style="{ background: '#dbe9ff' }">
          <el-row type="flex" align="middle">
              <el-col :xl="2" :lg="2" :md="2" :sm="3" :xs="4">
                  <el-row>
                      <el-col>
                          <el-button v-if="!magazine.current_user_subscribed" style="color:#409EFF" @click="subscribe()" size="large"><el-icon><User /></el-icon><el-icon><Plus/></el-icon>{{ magazine.subscribers_count }}</el-button>
                          <el-button v-else @click="unsubscribe()" type="primary" size="large"><el-icon><UserFilled /></el-icon><el-icon><Plus /></el-icon>{{ magazine.subscribers_count }}</el-button>
                      </el-col>
                  </el-row>
              </el-col>
              <el-col :xl="11" :lg="11" :md="11" :sm="11" :xs="10">
                  <el-row style="margin-bottom: 5px; height: 30px;">
                      <el-col>
                          <el-button :link="true" style="font-size: large; font-weight: bold; margin-right:10px; color:#409EFF">{{ magazine.name }}</el-button>
                      </el-col>
                  </el-row>
                  <el-row style="margin-bottom: 30px; height: 15px;">
                      <el-col >
                          <el-button style="color:#409EFF" :link="true" @click="goToUser()" >{{ magazine.owner }}</el-button>
                          <el-text>, {{ timeAgo(magazine.created_at) }}</el-text>
                      </el-col>
                  </el-row>
                  <el-row >
                      <el-col >
                          <el-button :link="true" size="small" >{{ magazine.posts_count }} posts</el-button>
                          <el-button :link="true" size="small" >{{ magazine.comments_count }} comments</el-button>
                      </el-col>
                  </el-row>
              </el-col>
              <el-col :xl="11" :lg="11" :md="11" :sm="10" :xs="10">
                <el-row style="margin-bottom: 5px; height: 30px;">
                      <el-col >
                          <el-text style="font-size: large; font-weight: bold; margin-right:10px; color:#409EFF">{{ magazine.title }}</el-text>
                      </el-col>
                  </el-row>
                <el-row style="margin-bottom: 30px; height: 5px;">
                      <el-col >
                          <el-text>Description: {{magazine.description}}</el-text>
                      </el-col>
                  </el-row>
                  <el-row style="margin-bottom: 30px; height: 5px;">
                      <el-col >
                        <el-text>Rules: {{magazine.rules}}</el-text>
                      </el-col>
                  </el-row>
              </el-col>
          </el-row>
      </el-card>
</template>

<script>
import magazine from '@/services/magazines';
import { ElMessage } from 'element-plus'; // for Vue 3
import moment from 'moment';

export default {
    name: 'MagazineComponentExtended',
    props: {
        magazine: {
            type: Object,
            required: true
        },
    },
    methods: {
        timeAgo(date) {
            return moment(date).fromNow();
        },
        async subscribe() {
            const response = await magazine.subscribe(this.magazine.id);
            if (response.status === 200) {
                this.$emit('updateMagazine', response.data);
                ElMessage.success('Successfully subscribed');
            }
            else ElMessage.error('Error subscribing to magazine');
        },
        async unsubscribe() {
            const response = await magazine.unsubscribe(this.magazine.id);
            if (response.status === 200) {
                this.$emit('updateMagazine', response.data);
                ElMessage.success('Successfully unsubscribed');
            }
            else ElMessage.error('Error unsubscribing to magazine');
        },
        async goToUser() {
            this.$router.push({ name: 'User', params: { user_id: this.magazine.user_id } });
        },
    },
}
</script>