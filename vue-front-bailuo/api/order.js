import request from '@/utils/request'


export default {
    //根据id查询订单信息
    getOrderById(orderId){
        return request({
            url: `/eduorder/order/getOrderByOrderId/${orderId}`,
            method: 'get'
          })
    },
    //生成订单
    createOrder(courseId){
        return request({
            url: `/eduorder/order/createOrder/${courseId}`,
            method: 'post'
          })
    },
    //生成微信支付二维码
    createNative(orderNo){
        return request({
            url: `/eduorder/paylog/createNative/${orderNo}`,
            method: 'get'
        })
    },
    //获取支付状态
    querystatus(orderNo){
        return request({
            url: `/eduorder/paylog/queryPayStatus/${orderNo}`,
            method: 'get'
        }) 
    }
}