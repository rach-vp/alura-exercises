import { Component } from "react";
import './style.css';

class FormRegister extends Component {
  render() {
    return (
      <form className="form-register">
        <input type="text" placeholder="Title" className="form-register__input" />
        <textarea placeholder="Write your note here..." className="form-register__input" />
        <button className="form-register__submit">Create note</button>
      </form>
    );
  }
}

export default FormRegister;
