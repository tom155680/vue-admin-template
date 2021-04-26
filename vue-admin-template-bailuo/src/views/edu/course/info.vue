<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        ></el-input>
      </el-form-item>
      <!-- 所属分类 TODO -->
      <el-form-item label="课程分类">
        <!-- 一级分类 -->
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类"
          @change="oneSubjectchange"
        >
          <el-option
            v-for="oneSubject in oneSubjectList"
            :key="oneSubject.id"
            :label="oneSubject.title"
            :value="oneSubject.id"
          ></el-option>
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="twoSubject in twoSubjectList"
            :key="twoSubject.id"
            :label="twoSubject.title"
            :value="twoSubject.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 课程讲师 TODO -->

      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="课程讲师">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="总课时"
        ></el-input-number>
      </el-form-item>
      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <vue-tinymce v-model="courseInfo.description" :setting="setting" />
      </el-form-item>
      <!-- 课程封面 TODO -->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/edu/oss/uploadCoursePic'"
          class="avatar-uploader"
        >
          <img style="height:300px;width:500px" :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="课时价格"
        ></el-input-number
      ></el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import course from "@/api/edu/course.js";
import subject from "@/api/edu/subject.js";
import Tinymce from "@/components/Tinymce";
export default {
  components: { Tinymce },
  data() {
    return {
      //tinymce富文本设置
      setting: {
        menubar: false,
        toolbar:
          "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
        toolbar_drawer: "sliding",
        quickbars_selection_toolbar:
          "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        plugins: "link image media table lists fullscreen quickbars",
        language: "zh_CN", //本地化设置
        height: 350,
      },
      courseInfo: {
        title: "",
        subjectId: "", //二级分类Id
        subjectParentId: "", //一级分类Id
        teacherId: "",
        description: "",
        cover: "https://edu-bailuo-oss.oss-cn-beijing.aliyuncs.com/03.png",
      },
      BASE_API: process.env.VUE_APP_BASE_API,
      saveBtnDisabled: false,
      active: 1,
      courseId: "",
      teacherList: [],
      oneSubjectList: [], //一级分类
      twoSubjectList: [], //二级分类
    };
  },

  created() {
    this.getOneSubjects();
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      this.getCourseInfo();
    }
    this.findAllTeacher();
  },
  methods: {
    //查询一级分类
    getOneSubjects() {
      subject.getAllSubject().then((response) => {
        this.oneSubjectList = response.data.list;
      });
    },
    //当一级分类发生改变
    oneSubjectchange(value) {
      //value就是所选一级分类id
      for (var i = 0; i < this.oneSubjectList.length; i++) {
        //判断一级分类id和value值是否相等
        if (this.oneSubjectList[i].id === value) {
          this.twoSubjectList = this.oneSubjectList[i].children;
          //当一级分类发生变化 清空二级分类所选值
          this.courseInfo.subjectId = "";
        }
      }
    },
    //添加课程
    addCourse() {
      course.addCourse(this.courseInfo).then((response) => {
        //给出提示信息
        this.$message({
          type: "success",
          message: "添加课程信息成功",
        });
        //跳转到第二步
        this.$router.push({
          path: "/edu/course/chapter/" + response.data.courseId,
        });
      });
    },
    updateCourse() {
      course.updateCourseInfo(this.courseInfo).then((response) => {
        //给出提示信息
        this.$message({
          type: "success",
          message: "修改课程信息成功",
        });
        //跳转到第二步
        this.$router.push({
          path: "/edu/course/chapter/" + this.courseId,
        });
      });
    },
    //判断添加还是修改
    saveOrUpdate() {
      if(this.courseId == ''){
        this.addCourse()
      }else{
        this.updateCourse();
      }
    },

    //查询所有讲师
    findAllTeacher() {
      course.findAllTeacher().then((response) => {
        this.teacherList = response.data.items;
      });
    },

    //查询一个课程Vo对象,数据回显
    getCourseInfo() {
      course.findCourseInfo(this.courseId).then((response) => {
        this.courseInfo = response.data.courseInfo;
        //遍历一级分类得到二级分类的集合
        for (let i = 0; i < this.oneSubjectList.length; i++) {
          if (this.oneSubjectList[i].id === this.courseInfo.subjectParentId) {
            this.twoSubjectList = this.oneSubjectList[i].children;
          }
        }
      });
    },
    //封面上传成功
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url;
    },
    //封面上传之前 主要是限制上传文件类型和大小
    beforeAvatarUpload(file) {
      let isJPG = false;
      if (file.type === "image/jpeg" || file.type === "image/png") {
        isJPG = true;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG、PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>