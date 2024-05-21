import axios from 'axios';
import store from '../stores/userStore.js'; // Importa la store de Vuex

axios.defaults.baseURL = 'https://tuiter.fly.dev';

axios.interceptors.request.use(
  config => {
    const selectedUser = store.state.selectedUser; // Obtén el usuario seleccionado de la store
    if (selectedUser && selectedUser.apiKey) {
      config.headers['API-KEY'] = selectedUser.apiKey; // Establece la API key en los encabezados
    }
    config.headers['Accept'] = 'application/json';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
