<template>
  <el-card class="post-form" shadow="hover">
    <h3 v-if="!form.id">{{ isLink ? 'New link' : 'New thread' }}</h3>
    <el-form :model="form" ref="form" :rules="rules" label-width="120px" label-position="top">
      <el-form-item v-if="isLink" label="URL" prop="url">
        <el-input
            placeholder="URL"
            v-model="form.url"
        ></el-input>
      </el-form-item>
      <el-form-item label="Title" prop="title">
        <el-input
            type="textarea"
            placeholder="Title"
            :autosize="{ minRows: 2 }"
            v-model="form.title"
            maxlength="255"
        ></el-input>
        <div class="char-counter">{{ form.title.length }}/255</div>
      </el-form-item>
      <el-form-item label="Body" prop="body">
        <el-input
            type="textarea"
            placeholder="Body"
            :autosize="{ minRows: 5 }"
            v-model="form.body"
            maxlength="35000"
        ></el-input>
        <div class="char-counter">{{ form.body.length }}/35000</div>
      </el-form-item>
      <el-form-item label="Magazine" prop="magazine_id">
        <el-select v-model="form.magazine_id" placeholder="Select a magazine">
          <el-option
              v-for="magazine in allMagazines"
              :key="magazine.id"
              :label="magazine.name"
              :value="magazine.id"
          />
        </el-select>
      </el-form-item>
      <br>
      <el-form-item>
        <div class="button-container">
          <el-button type="primary" @click="submitForm" class="custom-button">
            {{ form.id ? 'Update Post' : (isLink ? 'Add new link' : 'Add new thread') }}
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>

import {ElMessage} from "element-plus";
import magazines from "@/services/magazines.js";
import posts from "@/services/posts.js";

export default {
  name: 'NewPostComponent',
  props: {
    initialPost: {
      type: Object,
      default: () => ({})
    },
    isLink: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: this.initialPost,
      allMagazines: [],
      rules: {
        url: [
          { required: true, message: 'Fill out the URL', trigger: 'blur' }
        ],
        title: [
          { required: true, message: 'Fill out the title', trigger: 'blur' }
        ],
        magazine_id: [
          { required: true, message: 'Select a magazine', trigger: 'blur' }
        ]
      },
    };
  },

  methods: {
    async fetchMagazines() {
      try {
        const response = await magazines.list();
        this.allMagazines = response.data;
      } catch (error) {
        console.error('Error fetching magazines:', error);
      }
    },
    submitForm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            let response;
            //Editing post
            if (this.form.id) {
              const { title, url, body, magazine_id } = this.form;
              const post = { title, url, body, magazine_id };
              response = await posts.edit(this.form.id, post);
            }
            //Creating new post
            else {
              response = await posts.create(this.form);
            }

            this.resetForm();

            if (response.status === 201) {
              ElMessage.success('Post successfully created');
              this.$router.push({ name: 'Posts' });
            } else {
              ElMessage.error('An unexpected error occurred.');
            }
          } catch (error) {
            console.error('Error submitting form:', error);
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
      this.form = {
        url: '',
        title: '',
        body: '',
        magazine_id: '',
        rules: ''
      };
    }
  },
  created() {
    this.fetchMagazines();
  },

};
</script>

<style scoped>
.post-form {
  max-width: 1200px;
  padding: 20px 100px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 20px auto;
  background-color: #EDE7F6;
  font-size: 20px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.custom-button {
  background-color: #0F0142 !important;
  border-color: #0F0142 !important;
  color: white !important;
}

.char-counter {
  font-size: 12px;
  color: #999;
  text-align: right;
  margin-top: 1px;
  position: absolute;
  right: 0;
  top: 100%;
  transform: translateY(0);
}

</style>