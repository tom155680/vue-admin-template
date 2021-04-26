<template>
  <div class="app-container">
    <el-form class="demo-form-inline">
      <el-form-item label="图片标题">
        <el-input v-model="banner.title" placeholder="图片标题"></el-input>
      </el-form-item>
      <el-form-item label="图片排序">
        <el-input-number
          v-model="banner.sort"
          controls-position="right"
          :min="1"
          :max="10"
        ></el-input-number>
      </el-form-item>

      <!-- 轮播图片 -->
      
        <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/edu/oss/uploadBanner'"
          class="avatar-uploader"
        >
          <img style="height:320px;width:1000px" :src="banner.imageUrl" />
        </el-upload>
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
import banner from '@/api/banner/banner.js'
import ImageCropper from '@/components/ImageCropper'
export default {
  data() {
    return {
      banner: {
          id:'',
          imageUrl:process.env.VUE_APP_OSS_PATH+'02.jpg'
      },
      saveBtnDisabled: false, //保存按钮是否禁用
      imagecropperKey:0,
      imagecropperShow:false,
      BASE_API: process.env.VUE_APP_BASE_API,
    };
  },
  components:{ImageCropper},
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      console.log(111111)
      this.getById(id)
    }
  },

  methods: {
    saveBanner() {
      banner.addBanner(this.banner).then((response) => {
        //1.给出提示信息
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        //2.返回教师列表
        this.$router.push({ path: "/banner/list" });
      });
    },
    //根据讲师id查询
    getById(id) {
      banner.getById(id).then((response) => {
        this.banner = response.data.banner;
      })
    },
    updateBanner() {
      banner.updateBanner(this.banner).then((response) => {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.$router.push({ path: "/banner/list" })
      });
    },
    saveOrUpdate() {
      if (this.banner.id =='') {
        this.saveBanner()
      } else {
        this.updateBanner()
      }
    },
    close(){ //关闭上传弹框
      this.imagecropperShow = false
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey +1
    },
    //封面上传成功
    handleAvatarSuccess(res, file) {
      this.banner.imageUrl = res.data.url;
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
