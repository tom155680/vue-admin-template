import request from '@/utils/request'

export default {
    //添加课程
    addCourse(courseInfo) {
        return request({
            url: `/eduservice/course/addCourse`,
            method: 'post',
            data: courseInfo
        })
    },
    //查询所有讲师
    findAllTeacher() {
        return request({
            url: `/eduservice/teacher/findAll`,
            method: 'get'
        })
    },
    //根据课程id查询CourseVo对象
    findCourseInfo(courseId) {
        return request({
            url: `/eduservice/course/getCourseById/${courseId}`,
            method: 'get'
        })
    },
     //修改课程信息
     updateCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/course/updateCourse`,
            method: 'post',
            data: courseInfo
        })
    },

    //查询发布课程信息
    getPublishCourse(courseId){
        return request({
            url: `/eduservice/course/getCoursePublishVo/${courseId}`,
            method: 'get'
        })
    },
    //最终发布课程信息
    finalPublishCourse(courseId){
        return request({
            url: `/eduservice/course/finalPublish/${courseId}`,
            method: 'post'
        })
    },
    //分页查询课程
    pageCourse(current,size){
        return request({
            url: `/eduservice/course/pageQueryCourse/${current}/${size}`,
            method: 'get'
        })
    },
     //条件查询课程带分页效果
     pageQueryWithCondition(current,size,courseQueryVo){
        return request({
            url: `/eduservice/course/pageQueryWithCondition/${current}/${size}`,
            method: 'post',
            data: courseQueryVo
        })
    },
    //删除课程
    deleteCourse(courseId){
        return request({
            url: `/eduservice/course/deleteCourse/${courseId}`,
            method: 'delete'
        })
    },
}