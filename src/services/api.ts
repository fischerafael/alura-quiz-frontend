import axios from 'axios'

const api = axios.create({
    baseURL: 'https://alura-quiz-backend.herokuapp.com'
})

export default api
