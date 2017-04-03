import Login from '../login/login';
import Signup from '../signup/signup';
import User from '../user/user';
import Note from '../note/note';
import NotesList from '../notesList/notesList';
import NoteCreate from '../note-create/note-create';

const user = new User();

document.addEventListener('DOMContentLoaded', () => {
    const login  = new Login(document.querySelector('.js-login-view'));
    const signup = new Signup(document.querySelector('.js-signup-view'));

    if (user.isLoggedIn()) {
        const notes = user.notes;

        new NoteCreate(document.querySelector('.js-note-create'), notes);

        if (!notes) {
            return;
        }

        new NotesList(document.querySelector('.js-notes-list'), notes);

        notes.forEach(note => {
            const node   = document.querySelector('.js-note-view');
            const header = note.header;
            const text   = note.text;
            const color  = note.color;

            new Note({ node, header, text, color });
        });
    }
});

