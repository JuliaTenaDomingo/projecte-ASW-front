import axios from "@/services/backend"

export default {
    async listComments(postId, sort) {
        return await axios.get(`/posts/${postId}/comments?sort=${sort}`)
    },
    async createComment(postId, comment) {
        return await axios.post(`/posts/${postId}/comments`, comment)
    },
    async removeComment(postId, commentId) {
        return await axios.delete(`/posts/${postId}/comments/${commentId}`)
    },
    async editComment(postId, commentId, comment) {
        return await axios.put(`/posts/${postId}/comments/${commentId}`, comment)
    },
    async likeComment(postId, commentId) {
        return await axios.post(`/posts/${postId}/comments/${commentId}/like`)
    },
    async unlikeComment(postId, commentId) {
        return await axios.delete(`/posts/${postId}/comments/${commentId}/like`)
    },
    async dislikeComment(postId, commentId) {
        return await axios.post(`/posts/${postId}/comments/${commentId}/dislike`)
    },
    async undislikeComment(postId, commentId) {
        return await axios.delete(`/posts/${postId}/comments/${commentId}/dislike`)
    }
}