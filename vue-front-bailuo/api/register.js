import request from '@/utils/request'


export default {
    //发送验证码
    sendCode(phone){
        return request({
            url: `/service/msm/send/${phone}`,
            method: 'get'
          })
    },

    registerMember(member){
        return request({
            url:`/ucenter/register`,
            method:'post',
            data:member
        })
    }
}