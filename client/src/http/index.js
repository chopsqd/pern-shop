import axios from 'axios'

// Для обычных запросов, где не нужна авторизация
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// С проверкой на авторизацию
// Добавляет header Authorization с токеном
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// Для подстановки токена каждому запросу (реализуем Interceptor)
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

// Добавляем Interceptor для запроса
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}