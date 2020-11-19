import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-quiz-6442f.firebaseio.com'
})