<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="讲师姓名">
        <el-input v-model="teacherQuery.name" placeholder="讲师姓名"></el-input>
      </el-form-item>
      <el-form-item label="讲师级别">
        <el-select v-model="teacherQuery.level" placeholder="讲师级别">
          <el-option label="高级讲师" value="1"></el-option>
          <el-option label="首席讲师" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截至时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
      </el-form-item>

      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-table
      :data="teacherList"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (current - 1) * size + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="80"> </el-table-column>
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? "高级讲师" : "首席讲师" }}
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="资历" align="center">
      </el-table-column>
      <el-table-column prop="gmtCreate" label="添加时间" width="160">
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="60"> </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              style="margin-right: 5px"
              @click="toSave(scope.row.id)"
              >修改</el-button
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
      @current-change="getList"
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
import teacher from "@/api/edu/teacher.js";
export default {
  //写核心代码位置
  data() {
    //定义变量和初始值
    return {
      teacherList: null, //查询之后接口返回集合
      current: 1, //当前页
      size: 10, //每页记录数
      total: 0, //总记录数
      teacherQuery: {}, //条件封装对象
    };
  },
  created() {
    //在页面渲染之前执行，调用methods定义的方法
    this.getList();
  },
  methods: {
    //创建具体的方法，调用teacher.js方法
    //讲师列表方法
    getList(current = 1) {
      this.current = current;
      teacher
        .getTeacherList(this.current, this.size, this.teacherQuery)
        .then((response) => {
          //请求成功
          this.teacherList = response.data.rows;
          this.total = response.data.total;
        });
    },

    toSave(id){
        this.$router.push({path:`/edu/teacher/edit/${id}`})
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
      this.getList();
    },
    //清空查询条件方法
    resetData() {
      //1.清空条件数据
      this.teacherQuery = {};
      //2.重新加载讲师列表
      this.getList();
    },
    //删除讲师方法
    removeDataById(id) {
      this.$confirm("此操作将删除该讲师, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点击确定，执行then方法
        teacher.deleteTeacher(id).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList()
        });
      });
    },
    
  
  },
};
</script>
