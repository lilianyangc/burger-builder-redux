import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-8cf71.firebaseio.com/'

});

export default instance;