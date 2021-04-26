import request from '@/utils/request'


export default {
    //查询课程列表
    getCourseList(current,pageSize,queryVo){
        return request({
            url: `/eduservice/front/course/getPageCourseList/${current}/${pageSize}`,
            method: 'post',
            data:queryVo
          })
    },
     //查询课程分类
     getCourseSubject(){
        return request({
            url: `/eduservice/subject/list`,
            method: 'get'
          })
    },
     //查询课程详情
     getCourseWebVoInfo(courseId){
        return request({
            url: `/eduservice/front/course/getCourseWebVo/${courseId}`,
            method: 'get'
          })
    },
}