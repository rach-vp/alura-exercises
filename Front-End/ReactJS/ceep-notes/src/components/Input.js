import { Component } from 'react';

class Input extends Component {
  render() {
    return (
    <form>
      <input type="text" placeholder="Title" />
      <textarea placeholder="Write your note here..." />
      <button>Create note</button>
    </form>
    );
  }
}

export default Input;