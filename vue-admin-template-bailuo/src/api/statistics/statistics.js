import request from '@/utils/request'


export default {
    //生成日注册用户数据
    registerCount(day){
        return request({
            url: `/edustatistics/createStatistics/${day}`,
            method: 'post'
          })
    },
    //获取统计数据
    getShowData(searchObj){
        return request({
            url:`/edustatistics/getShowData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
            method:'get'
        })
    }
}