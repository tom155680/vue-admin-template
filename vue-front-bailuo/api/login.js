import request from '@/utils/request'


export default {
    //用户登录
    submitLogin(userInfo){
        return request({
            url: `/api/ucenter/login`,
            method: 'post',
            data:userInfo
          })
    },

    //根据token获取用户信息
    getUserInfoByToken(){
        return request({
            url:`/api/ucenter/getUserInfo`,
            method:'get'
        })
    },

    //微信登录获取二维码
    getQRCode(){
        return request({
            url:`/api/ucenter/wx/wxLogin`,
            method:'get'
        })
    }
}