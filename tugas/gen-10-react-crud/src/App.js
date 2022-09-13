import './App.css';
import CrudApi from './CrudApi';
import CrudLocal from './CrudLocal';

function App() {
  return (
    <div className="App">
      <CrudLocal />
      {/* <CrudApi /> */}
    </div>
  );
}

export default App;
