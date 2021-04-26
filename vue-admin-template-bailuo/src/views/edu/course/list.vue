<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="课程名称">
        <el-input v-model="courseQuery.title" placeholder="课程名称"></el-input>
      </el-form-item>
      <el-form-item label="课程状态">
        <el-select v-model="courseQuery.status" placeholder="课程状态">
          <el-option label="已发布" value="Normal"></el-option>
          <el-option label="未发布" value="Draft"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="courseQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="courseQuery.end"
          type="datetime"
          placeholder="选择截至时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getPageCourse()">查询</el-button>
      </el-form-item>

      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-table
      :data="courseList"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (current - 1) * size + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="名称" width="240" align="center"> </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === "Normal" ? "已发布" : "未发布" }}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" align="center" width="60">
      </el-table-column>
      <el-table-column prop="lessonNum" label="课时数" width="80" align="center">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80" align="center"> </el-table-column>
       <el-table-column prop="gmtCreate" label="发布时间" width="160" align="center"> </el-table-column>
      <el-table-column label="操作" width="500" align="center">
        <template slot-scope="scope">
        
           <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              style="margin-right: 5px"
              @click="toInfoSave(scope.row.id)"
              >编辑课程基本信息</el-button
            >
        
           <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              style="margin-right: 5px"
               @click="toChapterSave(scope.row.id)"
              >编辑课程大纲</el-button
            >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getPageCourse"
      :current-page="current"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<style>
.el-table .warning-row {
  background: rgb(232, 243, 247);
}
</style>
<script>
//引入调用teacher.js的文件
import course from "@/api/edu/course.js";
export default {
  //写核心代码位置
  data() {
    //定义变量和初始值
    return {
      courseList: null, //查询之后接口返回集合
      current: 1, //当前页
      size: 10, //每页记录数
      total: 0, //总记录数
      courseQuery: {}, //条件封装对象
    };
  },
  created() {
    //在页面渲染之前执行，调用methods定义的方法
    this.getPageCourse();
  },
  methods: {
    //创建具体的方法，调用teacher.js方法
    //讲师列表方法
    getPageCourse(current = 1) {
      this.current = current;
      course
        .pageQueryWithCondition(this.current, this.size,this.courseQuery)
        .then((response) => {
          //请求成功
          this.courseList = response.data.courses;
          this.total = response.data.total;
        });
    },


    toInfoSave(id){
        this.$router.push({path:`/edu/course/info/${id}`})
    },
    toChapterSave(id){
        this.$router.push({path:`/edu/course/chapter/${id}`})
    },
    //设置表格颜色变化
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "warning-row";
      }
      return "";
    },

    //设置每页记录数
    handleSizeChange(val) {
      this.size = val;
      this.getPageCourse();
    },
    //清空查询条件方法
    resetData() {
      //1.清空条件数据
      this.courseQuery = {};
      //2.重新加载课程列表
      this.getPageCourse();
    },
    //删除课程方法
    removeDataById(courseId) {
        console.log(courseId)
      this.$confirm("此操作将删除该课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点击确定，执行then方法
        course.deleteCourse(courseId).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getPageCourse()
        });
      });
    },
    
  
  },
};
</script>
