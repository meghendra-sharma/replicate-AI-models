import Form from "./components/Form";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Form/>
      <ToastContainer/>
    </div>
  );
}

export default App;
