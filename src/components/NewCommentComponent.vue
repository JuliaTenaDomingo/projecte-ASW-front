<template>
  <el-card class="box-card" shadow="hover" style="margin: 20px;" :body-style="{ background: '#dbe9ff' }">
    <el-text style="font-weight: bold; color: black;">Write your comment here</el-text>
    <el-input
        style="margin-top: 20px;"
        type="textarea"
        :rows="4"
        placeholder="Write a new comment here"
        v-model="newComment"
    ></el-input>
    <el-button style="margin-top: 20px;" @click="createComment()">Add Comment</el-button>
  </el-card>
</template>

<script>
export default {
  name: 'NewCommentComponent',
  data() {
    return {
      newComment: '',
    };
  },
  methods: {
    async createComment() {
      // Implement the logic to create a new comment using the `newComment` data property
    },
  },
};
</script>