import axios from 'axios'

const api = axios.create({
    baseURL: 'alura-quiz-backend.herokuapp.com'
})

export default api
