import FormRegister from "./components/FormRegister/index";
import NotesList from "./components/NotesList/index";
import './assets/App.css';
import './assets/index.css';

function App() {
  return (
    <main className="container">
      <FormRegister />
      <NotesList />
    </main>
  );
}

export default App;
