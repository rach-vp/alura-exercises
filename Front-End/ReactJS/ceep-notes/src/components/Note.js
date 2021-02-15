import { Component } from 'react';

class Note extends Component {
  render() {
    return (
      <li>
          <header>
            <h3>Title</h3>
          </header>
          <article>
            <p>Write your note...</p>
          </article>
        </li>
    );
  }
}

export default Note;