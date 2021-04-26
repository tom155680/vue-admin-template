import request from '@/utils/request'


export default {
    //查询视频播放凭证
    getPlayAuth(videoSourceId){
        return request({
            url: `/eduvideo/getPlayAuth/${videoSourceId}`,
            method: 'get'
          })
    },
}