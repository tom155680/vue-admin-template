<template>
  <div class="app-container">

    <el-table
      :data="bannerList"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (current - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="名称" width="180"> </el-table-column>
    
      <el-table-column prop="imageUrl" label="图片地址" align="center">
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
            @click="deleteBanner(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getBannerList"
      :current-page="current"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
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
import banner from "@/api/banner/banner.js";
export default {
  //写核心代码位置
  data() {
    //定义变量和初始值
    return {
      current: 1, //当前页
      pageSize: 10, //每页记录数
      total: 0, //总记录数
      bannerList:[]
    };
  },
  created() {
    //在页面渲染之前执行，调用methods定义的方法
    this.getBannerList();
  },
  methods: {
    //创建具体的方法，调用teacher.js方法
    //讲师列表方法
    getBannerList(current = 1) {
      this.current = current;
      banner
        .pageFind(this.current, this.pageSize)
        .then((response) => {
          //请求成功
          this.bannerList = response.data.banners;
          this.total = response.data.total;
        });
    },

    toSave(id){
        this.$router.push({path:`/banner/edit/${id}`})
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
      this.pageSize = val;
      this.getBannerList();
    },

    //删除轮播图方法
    deleteBanner(id) {
      this.$confirm("此操作将删除该轮播图, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点击确定，执行then方法
        banner.deleteBanner(id).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getBannerList()
        });
      });
    },
    
  
  },
};
</script>
