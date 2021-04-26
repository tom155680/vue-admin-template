import request from '@/utils/request'


export default {
    //查询轮播图
    getBannerList(){
        return request({
            url: `/edubanner/front/getBannerList`,
            method: 'get'
          })
    },
    //查询讲师和课程
    getIndexCourseTeacher(){
        return request({
            url: `/eduservice/front/index`,
            method: 'get'
          })
    }
}