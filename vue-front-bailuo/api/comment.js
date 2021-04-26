import request from '@/utils/request'


export default {
    //分页查询评论
    getCommentList(current,pageSize,courseId){
        return request({
            url: `/eduservice/comment/${current}/${pageSize}`,
            method: 'get',
            params:{courseId}
          })
    },
    //添加评论信息
    addComment(comment){
        return request({
            url: `/eduservice/comment/save`,
            method: 'post',
            data:comment
          })  
    }
}