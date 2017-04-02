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
        if (!this.data) {
            return;
        }

        localStorage.removeItem('user');
        location.reload();
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

}
