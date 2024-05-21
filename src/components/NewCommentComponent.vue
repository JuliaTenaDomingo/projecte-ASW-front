<template>
  <el-card class="box-card" shadow="hover" style="margin: 20px;" :body-style="{ background: '#dbe9ff' }">
    <el-text style="font-weight: bold; color: black;">Write your comment here</el-text>
    <el-input
        style="margin-top: 20px;"
        type="textarea"
        :autosize="{ minRows: 4 }"
        placeholder="Write a new comment here"
        v-model="newComment"
    ></el-input>
    <el-button style="margin-top: 20px;" @click="createComment()">Add Comment</el-button>
  </el-card>
</template>

<script>
import comments from "@/services/comments.js";

export default {
  name: 'NewCommentComponent',
  props: {
    commentToEdit: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      newComment: this.commentToEdit ? this.commentToEdit.body : '',
      commentId: this.commentToEdit ? this.commentToEdit.id : null,
    };
  },
  methods: {
    async createComment() {
      const postId = this.$route.params.post_id;
      const comment = {
        body: this.newComment,
        comment_id: null,
      };
      let response;
      if (this.commentId) {
        response = await comments.editComment(postId, this.commentId, comment);
      } else {
        response = await comments.createComment(postId, comment);
      }
      if (response.status === 201) {
        this.newComment = '';
        this.$emit('commentCreated');
      } else if (response.status === 200) {
        this.$emit('updateComment', response.data);
      } else {
        console.error('Error creating or updating comment. Status:', response.status, 'Response data:', response.data);
      }
    },
  },
};
</script>
