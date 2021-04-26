<template>
  <div class="app-container">
    <el-form class="demo-form-inline">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" placeholder="讲师名称"></el-input>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          :min="1"
          :max="10"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" placeholder="讲师头衔">
          <el-option label="高级讲师" :value="1"></el-option>
          <el-option label="首席讲师" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!--讲师头像-->
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="this.teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换头像
        </el-button>
        <!--
          v-show：是否显示上传组件
          :key：类似于id，如果一个页面多个图片上传控件，可以做区分
          :url：后台上传的url地址
          @close：关闭上传组件
          @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API + '/edu/oss/uploadAvatar'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate()"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from "@/api/edu/teacher.js"
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  data() {
    return {
      teacher: {
        avatar:process.env.VUE_APP_OSS_PATH+'02.jpg'
      },
      saveBtnDisabled: false, //保存按钮是否禁用
      imagecropperKey:0,
      imagecropperShow:false,
      BASE_API: process.env.VUE_APP_BASE_API,
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      this.getTeacherInfo(id);
    }
  },
  components:{ImageCropper,PanThumb},
  methods: {
    saveTeacher() {
      teacherApi.saveTeacher(this.teacher).then((response) => {
        //1.给出提示信息
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        //2.返回教师列表
        this.$router.push({ path: "/edu/teacher/list" });
      });
    },
    //根据讲师id查询
    getTeacherInfo(id) {
      teacherApi.getTeacherInfo(id).then((response) => {
        this.teacher = response.data.item;
      })
    },
    updateTeacher() {
      teacherApi.updateTeacherInfo(this.teacher).then((response) => {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.$router.push({ path: "/edu/teacher/list" })
      });
    },
    saveOrUpdate() {
      if (this.teacher.id) {
        this.updateTeacher()
      } else {
        this.saveTeacher()
      }
    },
    close(){ //关闭上传弹框
      this.imagecropperShow = false
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey +1
    },
    cropSuccess(data){ //上传成功的方法
      this.imagecropperShow = false
      this.teacher.avatar = data.url
      this.imagecropperKey = this.imagecropperKey +1
    }
  },
};
</script>
