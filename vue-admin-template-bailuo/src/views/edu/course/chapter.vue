<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>
    <el-button type="primary" @click="openChapterDialog()">添加章节</el-button>

    <!--添加章节弹框-->
    <el-dialog
      :title="chapterDialogTitle"
      :visible.sync="chapterDialogFormVisible"
    >
      <el-form>
        <el-form-item label="章节名称" label-width="120px">
          <el-input v-model="chapter.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节排序" label-width="120px">
          <el-input-number
            v-model="chapter.sort"
            controls-position="right"
            :min="0"
            :max="10"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <!--添加小节弹框-->
    <el-dialog :title="videoDialogTitle" :visible.sync="videoDialogFormVisible">
      <el-form>
        <el-form-item label="小节名称" label-width="120px">
          <el-input v-model="eduVideo.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="小节排序" label-width="120px">
          <el-input-number
            v-model="eduVideo.sort"
            controls-position="right"
            :min="0"
            :max="10"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="是否免费" label-width="120px">
          <el-radio-group v-model="eduVideo.isFree">
            <el-radio :label="1">免费</el-radio>
            <el-radio :label="0">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频" label-width="120px">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :before-upload="beforeUpload"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API + '/eduvideo/uploadVideo'"
            :limit="1"
            class="upload-demo"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">
                最大支持1G，<br />
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br />
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br />
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br />
                SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="videoDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="videoSaveOrUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 章节 -->
    <ul>
      <li class="b" v-for="chapter in chapterList" :key="chapter.id">
        <p class="d">
          {{ chapter.title }}
          <span class="a"
            ><el-button
              type="warning"
              size="mini"
              icon="el-icon-edit"
              style="margin-right: 5px"
              @click="openVideoDialog(chapter.id)"
              >添加课时</el-button
            >
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              style="margin-right: 5px"
              @click="getById(chapter.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteChapter(chapter.id)"
              >删除</el-button
            >
          </span>
        </p>
        <!-- 视频 -->
        <ul>
          <li class="c" v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="a">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  style="margin-right: 5px"
                  @click="getVideoById(video.id)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  class="e"
                  @click="deleteVideo(video.id)"
                  >删除</el-button
                >
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <el-form label-width="120px">
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="previous"
          >上一步</el-button
        >
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
          >下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import chapter from "@/api/edu/chapter";
import video from "@/api/edu/video";
export default {
  data() {
    return {
      fileList: [],
      BASE_API: process.env.VUE_APP_BASE_API,
      saveBtnDisabled: false,
      active: 2,
      courseId: "",
      chapterList: [],
      chapter: {
        id: "",
        title: "",
        sort: 0,
        courseId: "",
      },
      eduVideo: {
        id: "001",
        title: "",
        videoOriginalName: "",
        sort: 0,
        isFree: 0,
        videoSourceId: "",
      },
      chapterDialogFormVisible: false, //章节弹框
      videoDialogFormVisible: false, //小节弹框
      videoDialogTitle: "", //小节弹框标题
      chapterDialogTitle: "",
    };
  },

  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
    }
    this.getChapters();
  },
  methods: {
    //上传之前删除原有视频
    beforeUpload() {
      if (this.eduVideo.id != "") {
        video.beforeUpload(this.eduVideo.id).then((response) => {});
      }
    },

    //视频上传成功
    handleVodUploadSuccess(response, file, fileList) {
      this.eduVideo.videoSourceId = response.data.videoId;
      this.eduVideo.videoOriginalName = file.name;
    },
    //视图上传多于一个视频
    handleUploadExceed(files, fileList) {
      this.$message.warning("想要重新上传视频，请先删除已上传的视频");
    },

    //删除视频之前
    beforeVodRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //删除视频
    handleVodRemove(file, fileList) {
      video.deleteVod(this.eduVideo.videoSourceId).then((response) => {
        //给出提示信息
        this.$message({
          type: "success",
          message: "视频删除成功!",
        });
        //清空文件列表
        this.fileList = [];
        //清空上传的视频Id和视频名称
        this.eduVideo.videoSourceId = "";
        this.eduVideo.videoOriginalName = "";
      });
    },
    //============================小节管理=================================
    openVideoDialog(chapterId) {
      //清空弹框中的内容
      this.eduVideo.id = "";
      this.eduVideo.title = "";
      this.eduVideo.videoSourceId = "";
      this.eduVideo.sort = 0;
      this.eduVideo.free = 0;
      this.videoDialogTitle = "添加小节";
      this.videoDialogFormVisible = true;

      //清空文件列表
      this.fileList = [];
      //清空上传的视频Id和视频名称
      this.eduVideo.videoSourceId = "";
      this.eduVideo.videoOriginalName = "";
      //设置该小节的章节id
      this.eduVideo.chapterId = chapterId;
      //设置该小节的课程id
      this.eduVideo.courseId = this.courseId;
    },

    //添加小节
    addVideo() {
      video.addVideo(this.eduVideo).then((response) => {
        //1.关闭弹框
        this.videoDialogFormVisible = false;
        //2.给出提示
        this.$message({
          type: "success",
          message: "小节添加成功!",
        });
        //3.刷新页面
        this.getChapters();
      });
    },

    //删除小节信息
    deleteVideo(videoId) {
      this.$confirm("此操作将删除该小节, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点击确定，执行then方法
        video.deleteVideo(videoId).then((response) => {
          //1.给出提示
          this.$message({
            type: "success",
            message: "小节删除成功!",
          });
          //2.刷新页面
          this.getChapters();
        });
      });
    },
    //修改小节信息
    updateVideo() {
      video.updateVideo(this.eduVideo).then((response) => {
        //1.关闭弹框
        this.videoDialogFormVisible = false;
        //2.给出提示
        this.$message({
          type: "success",
          message: "小节修改成功!",
        });
        //3.刷新页面
        this.getChapters();
      });
    },
    //小节添加还是修改
    videoSaveOrUpdate() {
      if (this.eduVideo.id === "") {
        this.addVideo();
      } else {
        this.updateVideo();
      }
    },
    //根据id查询小节 数据回显
    getVideoById(videoId) {
      this.videoDialogFormVisible = true;
      this.videoDialogTitle = "修改小节";
      video.getVideoById(videoId).then((response) => {
        this.eduVideo = response.data.video;
      });
      //清空文件列表
      this.fileList = [];
      //清空上传的视频Id和视频名称
      this.eduVideo.videoSourceId = "";
      this.eduVideo.videoOriginalName = "";
    },
    //============================章节管理=================================

    //打开章节弹框
    openChapterDialog() {
      //清空原始数据
      this.chapter.title = "";
      this.chapter.sort = 0;
      this.chapter.id = "";
      this.chapterDialogFormVisible = true;
      this.chapterDialogTitle = "添加章节";
    },
    //添加章节
    addChapter() {
      this.chapter.courseId = this.courseId;
      chapter.addChapter(this.chapter).then((response) => {
        //1.关闭弹框
        this.chapterDialogFormVisible = false;
        //2.给出提示
        this.$message({
          type: "success",
          message: "章节添加成功!",
        });
        //3.刷新页面
        this.getChapters();
      });
    },
    //修改章节信息
    updateChapter() {
      chapter.updateChapter(this.chapter).then((response) => {
        //1.关闭弹框
        this.chapterDialogFormVisible = false;
        //2.给出提示
        this.$message({
          type: "success",
          message: "章节修改成功!",
        });
        //3.刷新页面
        this.getChapters();
      });
    },
    //根据id查询章节
    getById(chapterId) {
      this.chapterDialogTitle = "修改章节";
      this.chapterDialogFormVisible = true;
      chapter.getChapter(chapterId).then((response) => {
        this.chapter = response.data.chapter;
      });
    },
    //添加还是修改
    saveOrUpdate() {
      console.log(this.chapter.id);
      if (this.chapter.id === "") {
        this.addChapter();
      } else {
        this.updateChapter();
      }
    },
    //删除章节信息
    deleteChapter(chapterId) {
      chapter.deleteChapter(chapterId).then((response) => {
        //1.给出提示
        this.$message({
          type: "success",
          message: "章节删除成功!",
        });
        //2.刷新页面
        this.getChapters();
      });
    },
    //根据课程id查询章节信息
    getChapters() {
      chapter.getChapterVideo(this.courseId).then((response) => {
        this.chapterList = response.data.chapters;
      });
    },

    previous() {
      this.$router.push({ path: "/edu/course/info/" + this.courseId });
    },
    next() {
      this.$router.push({ path: "/edu/course/publish/" + this.courseId });
    },
  },
};
</script>
<style scoped>
.chanpterList {
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.b .videoList .acts {
  float: right;
  font-size: 14px;
}
.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}

.a {
  float: right;
}
.b {
  list-style: none;
}
.c {
  list-style: none;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 30px;
  width: 100%;
  border: 1px solid #ddd;
}
.d {
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
</style>