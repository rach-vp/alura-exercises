import { Component } from "react";
import Note from "../Note/index";
import './style.css';

class NotesList extends Component {
  render() {
    const categories = ["Work", "Work", "Study"];
    return (
      <ul className="notes">
        {categories.map((cat, index) => (
          <Note key={index} category={cat} />
        ))}
      </ul>
    );
  }
}

export default NotesList;
