const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    if(req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(401).json({
                message: "Пользователь не авторизован"
            })
        }

        // Декодируем токен .verify(токен, секретный ключ)
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        // Добавляем данные из decoded в поле user у запроса, чтобы во всех след. функциях было доступно поле user
        req.user = decoded

        next()
    } catch (err) {
        res.status(401).json({
            message: "Пользователь не авторизован"
        })
    }
}