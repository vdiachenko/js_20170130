import template from './note.xml.js';
import User from '../user/user';
import config from '../../../package.json';

const user = new User();

export default class Note {

    constructor(options) {
        this.node    = options.node;
        this.options = options;

        if (user.isLoggedIn()) {
            this.render();
        }
    }

    onSubmit(ev) {
        ev.preventDefault();

        this.create();
    }

    render() {
        const note = template({
            texts: {
                noteHeader: this.options.header,
                noteText: this.options.text
            },

            view: {
                color: this.options.color
            }
        });

        this.node.insertAdjacentHTML('beforeEnd', note);
    }

}

