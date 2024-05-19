import axios from "@/services/backend"

export default {
    async list(sort) {
        return await axios.get(`/magazines?sort=${sort}`)
    },
    async retrieve(id) {
        return await axios.get(`/magazines/${id}`)
    },
    async create(data) {
        return await axios.post(`/magazines`, data)
    },
    async update(id, data) {
        return await axios.put(`/magazines/${id}`, data)
    },
    async delete(id) {
        return await axios.delete(`/magazines/${id}`)
    },
    async subscribe(id) {
        return await axios.post(`/magazines/${id}/subscribe`)
    },
    async unsubscribe(id) {
        return await axios.delete(`/magazines/${id}/unsubscribe`)
    },
    async posts(id, type, sort) {
        return await axios.get(`/magazines/${id}/posts?sort=${sort}&type=${type}`)
    }
}