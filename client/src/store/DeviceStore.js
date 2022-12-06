import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: "Холодильник"},
            {id: 2, name: "Смартфон"},
            {id: 3, name: "Ноутбук"},
            {id: 4, name: "Телевизор"},
        ]
        this._brands = [
            {id: 1, name: "Samsung"},
            {id: 2, name: "Apple"},
            {id: 3, name: "Lenovo"},
            {id: 4, name: "Asus"}
        ]
        this._devices = [
            {id: 1, name: "Iphone", price: 25000, rating: 5, img: 'https://i-ray.ru/news/iphone-12-irayru.jpg'},
            {id: 2, name: "Iphone", price: 25000, rating: 5, img: 'https://i-ray.ru/news/iphone-12-irayru.jpg'},
            {id: 3, name: "Iphone", price: 25000, rating: 5, img: 'https://i-ray.ru/news/iphone-12-irayru.jpg'},
            {id: 4, name: "Iphone", price: 25000, rating: 5, img: 'https://i-ray.ru/news/iphone-12-irayru.jpg'},
            {id: 5, name: "Iphone", price: 25000, rating: 5, img: 'https://i-ray.ru/news/iphone-12-irayru.jpg'}
        ]
        this._selectedType = {}
        this._selectedBrand = {}
        // Чтобы MobX следил за изменениями переменных выше
        // При их изменении компоненты будут перерендериваться
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setBrands(brands) {
        this._brands = brands
    }

    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this._selectedType = type
    }

    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }

    get types() {
        return this._types
    }

    get brands() {
        return this._brands
    }

    get devices() {
        return this._devices
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedBrand() {
        return this._selectedBrand
    }
}