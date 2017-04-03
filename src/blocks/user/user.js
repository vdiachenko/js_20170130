import config from '../../../package.json';

export default class User {

    constructor() {
        this.itemName = 'user';
    }

    login(data) {
        if (!data) {
            return;
        }

        this.data = data;

        location.reload();
    }

    logout() {
        if (!this.isLoggedIn()) {
            return;
        }

        localStorage.removeItem('user');
        location.reload();
    }

    isLoggedIn() {
        return Boolean(this.data);
    }

    update(data) {
        if (!this.isLoggedIn() || !data) {
            return;
        }

        this.data = data;
    }

    set data(data) {
        if (!data) {
            return;
        }

        localStorage.setItem(this.itemName, JSON.stringify(data));
    }

    get data() {
        const data = localStorage.getItem(this.itemName);

        if (!data) {
            return;
        }

        return JSON.parse(data);
    }

    get notes() {
        if (!this.data) {
            return;
        }

        return this.data.notes;
    }

}
