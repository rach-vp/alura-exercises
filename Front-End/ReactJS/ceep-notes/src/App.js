import React, { Component } from "react";
import FormRegister from "./components/FormRegister/index";
import NotesList from "./components/NotesList/index";
import "./assets/App.css";
import "./assets/index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: [] };
  }

  createNote = (title, text) => {
    const newNote = { title, text };
    this.setState({ notes: [...this.state.notes, newNote] });
  };

  render() {
    return (
      <main className="container">
        <FormRegister createNote={this.createNote.bind(this)} />
        <NotesList notes={this.state.notes} />
      </main>
    );
  }
}

export default App;
