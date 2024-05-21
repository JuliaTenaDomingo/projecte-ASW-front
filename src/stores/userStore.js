import { createStore } from 'vuex';

const userIdToDetails = {
  11: { apiKey: "96e76c7a1a99a34386fab31b0e6d7f7d", userName: "Miquel" },
  13: { apiKey: "37f6b3d6a803a1db9c83c506b611d26e", userName: "Alba" },
  12: { apiKey: "db7ca1295463c5d39665376651ebdae4", userName: "Júlia" },
  18: { apiKey: "05397c9f211565fecff7f834cef08acc", userName: "Agus" }
};

const store = createStore({
  state() {
    return {
      selectedUser: null,
      userIdToDetails: userIdToDetails
    };
  },
  mutations: {
    selectUser(state, { userId }) {
      const user = state.userIdToDetails[userId];
      if (user) {
        state.selectedUser = { userId, ...user };
      } else {
        state.selectedUser = null;
      }
    }
  },
  getters: {
    selectedUser(state) {
      return state.selectedUser;
    },
    profileText(state) {
      return state.selectedUser ? state.selectedUser.userName : 'Profile';
    }
  }
});

export default store;
