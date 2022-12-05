const path = require("path")
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = `${Date.now()}.jpg`
            // Перемещаем файл в каталог .mv(путь)
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                // Проходим по массиву info и для каждого элемента создаем запись в DeviceInfo
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                })
            }

            return res.json(device)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        // offset - чтобы пропускать уже показанные товары
        let offset = page * limit - limit
        let devices

        if (!brandId && !typeId) {
            // .findAll({условие}) - показать все товары из БД
            // .findAndCountAll({условие}) - показать все товары + общее кол-во товаров
            devices = await Device.findAndCountAll({limit, offset})
        }

        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }

        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }

        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }

        return res.json(devices)
    }

    async getOne(req, res, next) {
        const {id} = req.params

        const device = await Device.findOne({
            // Условие поиска
            where: {id},
            // Включая массив характеристик (чтобы на странице сразу вывелись и характеристики)
            // {model: Модель для загрузки, as: 'название поля в объекте'}
            include: [{model: DeviceInfo, as: 'info'}]
        })

        if (!device) {
            return next(ApiError.badRequest('Товар с указанным ID не был найден'))
        }

        return res.json(device)
    }
}

module.exports = new DeviceController()