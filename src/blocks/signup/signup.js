import template from './signup.xml.js';
import config from '../../../package.json';
import User from '../user/user';

const user = new User();

export default class Signup {

    constructor(node) {
        this.node = node;
        this.render();
        this.form = document.forms.signup;

        if (this.form) {
            this.form.addEventListener('submit', ev => this.onSubmit(ev));
        }
    }

    render() {
        this.node.innerHTML = template({
            user: user.data,
            texts: {
                login: 'Login',
                password: 'Password',
                email: 'Email'
            }
        });
    }

    onSubmit(ev) {
        ev.preventDefault();

        this.register();
    }

    register() {
        const method = 'POST';

        const body = JSON.stringify({
            login: this.form.elements.login.value,
            password: this.form.elements.password.value,
            email: this.form.elements.email.value
        });

        const headers = {
            'x-apikey': config.db.apikey,
            'Content-Type': 'application/json'
        };

        fetch(`https://${config.db.name}.restdb.io/rest/users`, { method, body, headers })
            .then(response => response.json())
            .then(data => user.login(data))
            .catch(alert);
    }

}
