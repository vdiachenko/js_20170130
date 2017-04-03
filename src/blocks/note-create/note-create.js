import template from './note-create.xml.js';
import User from '../user/user';
import config from '../../../package.json';

const user = new User();

export default class Note {

    constructor(node) {
        this.node = node;

        if (user.isLoggedIn()) {
            this.render();

            this.form = document.forms.note;
        }

        if (this.form) {
            this.form.addEventListener('submit', ev => this.onSubmit(ev));
        }
    }

    onSubmit(ev) {
        ev.preventDefault();

        this.create();
    }

    render() {
        const note = template();

        this.node.insertAdjacentHTML('beforeEnd', note);
    }

    create() {
        const method = 'PUT';

        const body = JSON.stringify({
            '$push': {
                notes: {
                    header: this.form.elements.header.value,
                    text: this.form.elements.text.value,
                    color: this.form.elements.color.value
                }
            }
        });

        const headers = {
            'x-apikey': config.db.apikey,
            'Content-Type': 'application/json'
        };

        fetch(`https://${config.db.name}.restdb.io/rest/users/${user.data._id}`, { method, body, headers })
            .then(response => response.json())
            .then(data => {
                user.update(data);
                location.reload();
            })
            .catch(alert);
    }

}

