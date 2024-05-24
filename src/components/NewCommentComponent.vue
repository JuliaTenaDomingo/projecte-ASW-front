<template>
  <el-card class="box-card" shadow="hover" style="margin: 20px;" :body-style="{ background: '#EDE7F6' }">
    <el-text style="font-weight: bold; color: black;">Write your comment here</el-text>
    <el-input
        style="margin-top: 20px;"
        type="textarea"
        :autosize="{ minRows: 4 }"
        placeholder="Write a new comment here"
        v-model="newComment"
    ></el-input>
    <el-button class="defaultButton" style="margin-top: 20px;" @click="createComment()">
      {{ commentId ? 'Update Comment' : 'Add Comment' }}
    </el-button>  </el-card>
</template>

<script>
import comments from "@/services/comments.js";
import {ElMessage} from "element-plus";

export default {
  name: 'NewCommentComponent',
  props: {
    commentToEdit: {
      type: Object,
      default: null
    },
    commentToReply: {
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
      let postId = null;
      let comment_id = null;
      if (this.commentToReply) {
        comment_id = this.commentToReply.id;
        postId = this.commentToReply.post_id;
      } else if (this.commentToEdit && this.commentToEdit.comment_id) {
        comment_id = this.commentToEdit.comment_id;
      }
      const comment = {
        body: this.newComment,
        comment_id: comment_id,

      };
      let response;
      if (this.commentId) {
        postId = this.commentToEdit.post_id;
        response = await comments.editComment(postId, this.commentId, comment);
      } else {
        if (this.$route.params.post_id) {
          postId = this.$route.params.post_id;
        }
        response = await comments.createComment(postId, comment);
      }
      if (response.status === 201) {
        this.newComment = '';
        this.$emit('commentCreated');
        ElMessage.success('Comment successfully created');
      } else if (response.status === 200) {
        this.$emit('updateComment', response.data);
        ElMessage.success('Comment successfully edited');
      } else {
        ElMessage.success('Error creating or updating comment');
        console.error('Error creating or updating comment. Status:', response.status, 'Response data:', response.data);
      }
    },
  },
};
</script>
