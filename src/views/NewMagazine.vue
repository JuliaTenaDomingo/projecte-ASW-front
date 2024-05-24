<template>
  <el-card class="magazine-form" shadow="hover">
    <h3>New magazine</h3>
    <el-form :model="form" ref="form" :rules="rules" label-width="120px" label-position="top">
      <el-form-item label="Name" prop="name">
        <el-input
            placeholder="Name"
            v-model="form.name"
            maxlength="25"
        ></el-input>
        <div class="char-counter">{{ form.name.length }}/25</div>
      </el-form-item>
      <el-form-item label="Title" prop="title">
        <el-input
            placeholder="Title"
            v-model="form.title"
            maxlength="50"
        ></el-input>
        <div class="char-counter">{{ form.title.length }}/50</div>
      </el-form-item>
      <el-form-item label="Description">
        <el-input
            placeholder="Description"
            type="textarea"
            :autosize="{ minRows: 5 }"
            v-model="form.description"
            maxlength="10000"
        ></el-input>
        <div class="char-counter">{{ form.description.length }}/10000</div>
      </el-form-item>
      <el-form-item label="Rules">
        <el-input
            placeholder="Rules"
            type="textarea"
            :autosize="{ minRows: 5 }"
            v-model="form.rules"
            maxlength="10000"
        ></el-input>
        <div class="char-counter">{{ form.rules.length }}/10000</div>
      </el-form-item>
      <br>
      <el-form-item>
        <div class="button-container">
          <el-button type="primary" @click="handleSubmit" class="custom-button">Add new magazine</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import magazineService from '@/services/magazines.js';
import {ElMessage} from "element-plus";

export default {
  name: 'NewMagazine',
  data() {
    return {
      form: {
        name: '',
        title: '',
        description: '',
        rules: ''
      },
      rules: {
        name: [
          { required: true, message: 'Fill out the name', trigger: 'blur' }
        ],
        title: [
          { required: true, message: 'Fill out the title', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const response = await magazineService.create(this.form);
            this.resetForm();
            ElMessage.success('Successfully created magazine!');
            this.$router.push({ name: 'Magazine', params: { magazine_id: response.data.id }});
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
        name: '',
        title: '',
        description: '',
        rules: ''
      };
    }
  }
};
</script>

<style scoped>
.magazine-form {
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
