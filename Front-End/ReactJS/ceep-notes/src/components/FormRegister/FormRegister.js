import { Component } from "react";
import "./style.css";

class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.title = "";
    this.text = "";
  }

  _getTitleInput(e) {
    this.title = e.target.value;
  }

  _getTextInput(e) {
    this.text = e.target.value;
  }

  _createNote(e) {
    e.preventDefault();
    this.props.createNote(this.title, this.text);
  }

  render() {
    return (
      <form className="form-register" onSubmit={this._createNote.bind(this)}>
        <input
          type="text"
          placeholder="Title"
          className="form-register__input"
          onChange={this._getTitleInput.bind(this)}
        />
        <textarea
          placeholder="Write your note here..."
          className="form-register__input"
          onChange={this._getTextInput.bind(this)}
        />
        <button className="form-register__submit">Create note</button>
      </form>
    );
  }
}

export default FormRegister;
