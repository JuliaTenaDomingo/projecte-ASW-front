import axios from "@/services/backend"

export default {
    async list(type, sort) {
        return await axios.get(`/posts?sort=${sort}&type=${type}`)
    },
    async retrieve(id) {
        return await axios.get(`/posts/${id}`)
    },
    async create(post) {
        return await axios.post(`/posts`, post)
    },
    async edit(id, post) {
        return await axios.put(`/posts/${id}`, post)
    },
    async like(postId) {
        return await axios.post(`/posts/${postId}/like`)
    },
    async unlike(postId) {
        return await axios.delete(`/posts/${postId}/like`)
    },
    async dislike(postId) {
        return await axios.post(`/posts/${postId}/dislike`)
    },
    async undislike(postId) {
        return await axios.delete(`/posts/${postId}/dislike`)
    },
    async boost(postId) {
        return await axios.post(`/posts/${postId}/boost`)
    },
    async unboost(postId) {
        return await axios.delete(`/posts/${postId}/boost`)
    },
    async remove(postId) {
        return await axios.delete(`/posts/${postId}`)
    },
    async delete(postId) {
        return await axios.delete(`/posts/${postId}`)
    }
}