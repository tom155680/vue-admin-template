import request from '@/utils/request'

export default{
    //1.讲师列表 条件查询分页
    //current 当前页 size:每页记录数 teacherQuery 条件对象
    getTeacherList(current,size,teacherQuery){
        return request({
            url: `/eduservice/teacher/pageQueryCondition/${current}/${size}`,
            method: 'post',
            //teacherQuery 条件对象 后端使用requestBody接受数据时
            //使用data 把对象转换为json传递到接口里面
            data:teacherQuery
          })
    },
    //删除讲师
    deleteTeacher(id){
        return request({
            url:`/eduservice/teacher/delete/${id}`,
            method:'delete'
        })
    },
    //添加讲师
    saveTeacher(teacher){
        return request({
            url:`/eduservice/teacher/addTeacher`,
            method:"post",
            data:teacher
        })
    },
    //查询讲师数据
    getTeacherInfo(id){
        return request({
            url:`/eduservice/teacher/${id}`,
            method:'get'
        })
    },
    //更新讲师数据
    updateTeacherInfo(teacher){
        return request({
            url:`/eduservice/teacher/updateTeacher`,
            method:'post',
            data: teacher
        })
    }
}
