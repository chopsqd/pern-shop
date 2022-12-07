import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        // Чтобы MobX следил за изменениями переменных выше
        // При их изменении компоненты будут перерендериваться
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
}