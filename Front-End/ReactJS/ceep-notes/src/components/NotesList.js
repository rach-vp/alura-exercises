import { Component } from 'react';

class NotesList extends Component {
  render() {
    return (
      <ul>
        <li>
          <header>
            <h3>Title</h3>
          </header>
          <article>
            <p>Write your note...</p>
          </article>
        </li>
      </ul>
    );
  }
}

export default NotesList;