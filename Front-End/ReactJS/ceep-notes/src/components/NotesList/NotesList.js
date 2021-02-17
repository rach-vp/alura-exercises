import { Component } from "react";
import Note from "../Note/index";
import './style.css';

class NotesList extends Component {
  render() {
    return (
      <ul className="notes">
        {this.props.notes.map((note, index) => (
          <Note key={index} note={note} />
        ))}
      </ul>
    );
  }
}

export default NotesList;
