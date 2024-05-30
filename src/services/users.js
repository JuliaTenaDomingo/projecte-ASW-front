import axios from "@/services/backend"

export default {
    async list() {
        return await axios.get(`/users`)
    },
    async retrieve(userId) {
        return await axios.get(`/users/${userId}`)
    },
    async update(userId, formData) {
        return await axios.put(`/users/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            responseType: 'json'
        });
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
