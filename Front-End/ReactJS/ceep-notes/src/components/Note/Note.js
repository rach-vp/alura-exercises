import { Component } from "react";
import './style.css';

class Note extends Component {
  render() {
    return (
      <li className="note">
        <header className="note__header">
          <h3 className="note__title">Title</h3>
        </header>
        <category is="x3d">{this.props.category}</category>
        <article className="note__article">
          <p>Write your note...</p>
        </article>
      </li>
    );
  }
}

export default Note;
