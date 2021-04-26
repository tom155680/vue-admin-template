import request from '@/utils/request'

export default {
    //查询章节和小节信息
    getChapterVideo(courseId) {
        return request({
            url: `/eduservice/chapter/getChapter/${courseId}`,
            method: 'get'
        })
    },
    //根据id查询章节
    getChapter(chapterId) {
        return request({
            url: `/eduservice/chapter/getChapterById/${chapterId}`,
            method: 'get'
        })
    },
     //添加章节
     addChapter(chapter) {
        return request({
            url: `/eduservice/chapter/addChapter`,
            method: 'post',
            data:chapter
        })
    },
     //修改章节
     updateChapter(chapter) {
        return request({
            url: `/eduservice/chapter/updateChapter`,
            method: 'post',
            data:chapter
        })
    },
     //删除章节
     deleteChapter(chapterId) {
        return request({
            url: `/eduservice/chapter/deleteChapter/${chapterId}`,
            method: 'delete'
        })
    },
}