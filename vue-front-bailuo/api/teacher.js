import request from '@/utils/request'


export default {
    //分页查询讲师
    getTeacherList(current,pageSize){
        return request({
            url: `/eduservice/front/teacher/getTeacherList/${current}/${pageSize}`,
            method: 'get'
          })
    },
    //根据id查询详情
    getById(teacherId){
        return request({
            url: `/eduservice/front/teacher/getById/${teacherId}`,
            method: 'get'
          })
    }
}