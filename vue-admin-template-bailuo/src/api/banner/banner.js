import request from '@/utils/request'

export default {

    //分页查询轮播图
    pageFind(current,pageSize){
        return request({
            url: `/edubanner/admin/pageFind/${current}/${pageSize}`,
            method: 'get'
          })
    },
  
    //添加轮播图
    addBanner(banner){
        return request({
            url: `/edubanner/admin/addBanner`,
            method: 'post',
            data:banner
          })
    },
     //删除轮播图
     deleteBanner(bannerId){
        return request({
            url: `/edubanner/admin/delete/${bannerId}`,
            method: 'delete'
          })
    },
    //更新轮播图
    updateBanner(banner){
        return request({
            url: `/edubanner/admin/updateBanner`,
            method: 'post',
            data: banner 
          })
    },
    //根据id查询轮播图
    getById(bannerId){
        return request({
            url: `/edubanner/admin/getById/${bannerId}`,
            method: 'get'
          })
    },
}
