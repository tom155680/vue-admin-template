import request from '@/utils/request'

export default {
    

    //根据id查询小节
    getVideoById(videoId){
        return request({
            url: `/eduservice/video/getVideoById/${videoId}`,
            method: 'get'
        })
    },

     //添加小节
     addVideo(video) {
        return request({
            url: `/eduservice/video/addVideo`,
            method: 'post',
            data:video
        })
    },
     //修改小节
     updateVideo(video) {
        return request({
            url: `/eduservice/video/updateVideo`,
            method: 'post',
            data:video
        })
    },
     //删除小节
     deleteVideo(videoId) {
        return request({
            url: `/eduservice/video/deleteVideo/${videoId}`,
            method: 'delete'
        })
    },
    //删除小节中的视频
    deleteVod(videoId) {
    return request({
        url: `/eduvideo/delete/${videoId}`,
        method: 'delete'
    })
    
},
beforeUpload(videoId) {
    return request({
        url: `/eduservice/video/beforeUpload/${videoId}`,
        method: 'delete'
    })
    
},
}