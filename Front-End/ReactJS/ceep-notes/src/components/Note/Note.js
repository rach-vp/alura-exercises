import { Component } from "react";
import './style.css';

class Note extends Component {
  render() {
    return (
      <li className="note">
        <header className="note__header">
          <h3 className="note__title">{this.props.note.title}</h3>
        </header>
        <article className="note__article">
          <p>{this.props.note.text}</p>
        </article>
      </li>
    );
  }
}

export default Note;
