import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-8cf71.firebaseio.com/'
    // baseURL: 'https://localhost:3000.com/'

});

export default instance;