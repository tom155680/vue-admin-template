<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="日期">
        <el-date-picker
          v-model="day"
          type="date"
          placeholder="选择要统计的日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-button :disabled="btnDisabled" type="primary" @click="createStatistics()"
        >生成</el-button
      >
    </el-form>
  </div>
</template>
<script>
import statistics from '@/api/statistics/statistics.js'                   
export default {
    data(){
        return {
            day:'',
            btnDisabled:false
        }
    },
    methods:{
        createStatistics(){
            this.btnDisabled = true
            statistics.registerCount(this.day).then(response =>{
                this.btnDisabled = false
                //给出提示信息
                this.$message({
                    type:'success',
                    message:'数据生成成功' 
                })
                //跳转页面
                this.$router.push({path:'/statistics/show'})
            })
        }
    }
}
</script>