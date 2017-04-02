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
        const data = JSON.stringify({
            login: this.form.elements.login.value,
            password: this.form.elements.password.value,
            email: this.form.elements.email.value
        });

        const xhr = new XMLHttpRequest();
        const url = `https://${config.db.name}.restdb.io/rest/users`;

        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const res = JSON.parse(xhr.responseText);

                user.login(res);
            }

            if (xhr.readyState === XMLHttpRequest.ERROR) {
                alert(xhr.responseText);
            }
        });

        xhr.open('POST', url);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.setRequestHeader('x-apikey', config.db.apikey);
        xhr.setRequestHeader('cache-control', 'no-cache');

        xhr.send(data);
    }

}
