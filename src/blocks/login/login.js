import template from './login.xml.js';
import config from '../../../package.json';
import User from '../user/user';

const user = new User();

export default class Login {

    constructor(node) {
        this.node = node;
        this.render();
        this.form = document.forms.login;

        if (this.form) {
            this.form.addEventListener('submit', ev => this.onSubmit(ev));
        }

        this.node.addEventListener('click', ev => this.onClick(ev));
    }

    onClick(ev) {
        const target = ev.target;
        const type   = target.dataset.type;

        if (type === 'logout') {
            user.logout();
        }
    }

    render() {
        this.node.innerHTML = template({
            user: user.data,
            texts: {
                login: 'Login',
                password: 'Password'
            }
        });
    }

    onSubmit(ev) {
        ev.preventDefault();

        this.login();
    }

    login() {
        const login    = this.form.elements.login.value;
        const password = this.form.elements.password.value;

        if (!login.trim().length || !password.trim().length) {
            return;
        }

        const headers = {
            'x-apikey': config.db.apikey,
            'Content-Type': 'application/json'
        };

        fetch(`https://${config.db.name}.restdb.io/rest/users?q={"login":"${login}","password":"${password}"}&max=1`, { headers })
            .then(response => response.json())
            .then(data => {
                if (!data.length) {
                    alert('Unknown data!');
                } else {
                    user.login(data[0]);
                }
            })
            .catch(alert);
    }

}
