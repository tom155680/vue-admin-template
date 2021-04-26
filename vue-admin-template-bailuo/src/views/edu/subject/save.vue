<template>
  <div class="app-container">
    课程分类添加
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag>
          <i class="el-icon-download" />
          <a
            :href="'https://edu-bailuo-oss.oss-cn-beijing.aliyuncs.com/excel/excelDemo.xlsx'"
            >点击下载模板</a
          >
        </el-tag>
      </el-form-item>
      <el-form-item label="选择excel">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="BASE_API + '/eduservice/subject/addSubject'"
          :on-success="fileUploadSuccess" 
          :on-error="fileUploadError"
          :auto-upload="false"
          :disabled="importBtnDisabled"
          :limit="1"
          name="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件
          </el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">只能上传excel文件,且最多上传1个</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
        BASE_API:process.env.VUE_APP_BASE_API,
        loading: false,
        importBtnDisabled:false,
    };
  },
  created() {},
  methods: {
      //点击按钮上传文件到接口里面 
      submitUpload(){
            this.importBtnDisabled = true
            this.loading = true     
            this.$refs.upload.submit()
      },
      //文件上传成功
      fileUploadSuccess(){
        this.loading = false
         //给出提示信息
        this.$message({
            type:'success',
            message:"课程分类添加成功"
        })
         //跳转课程分类列表
      },
      //文件上传失败
      fileUploadError(){
          //给出提示信息
          this.$message({
            type:'error',
            message:"课程分类添加失败"
        })
      },
     
      }
}
</script>