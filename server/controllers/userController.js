const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
    // Генерируем токен
    return jwt.sign(
        // Данные (payload)
        {id, email, role},
        // Секретный ключ для токена
        process.env.SECRET_KEY,
        // Дополнительные опции (expiresIn - срок жизни токена)
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }

        const candidate = await User.findOne({where: {email}})
        if(candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        // Хешируем пароль .hash(что хешируем, сколько раз)
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})

        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if(!user) {
            return next(ApiError.internalError('Пользователь не найден'))
        }

        // Проверяем введенный польз. пароль с паролем из БД
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internalError('Указан неправильный пароль'))
        }

        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    // Генерируем новый токен и отправляем на клиент
    async auth(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()