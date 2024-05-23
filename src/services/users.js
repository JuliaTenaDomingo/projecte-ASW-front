import axios from "@/services/backend"

export default {
    async list() {
        return await axios.get(`/users`)
    },
    async retrieve(userId) {
        return await axios.get(`/users/${userId}`)
    },
    async update(userId, userData) {
        return await axios.put(`/users/${userId}`, userData)
    },
    async listComments(userId, sort) {
        return await axios.get(`/users/${userId}/comments?sort=${sort}`)
    },
    async listPosts(userId, sort) {
        return await axios.get(`/users/${userId}/posts?sort=${sort}`)
    },
    async listBoosts(userId) {
        return await axios.get(`/users/${userId}/boosts`)
    }
}
