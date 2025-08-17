import './App.css';
import Appbar from './Appbar';
import Dropdown from './Dropdown';
import Filter from './Filter';
import Details from './Details';

function App() {
  return (
    <div>
      <div className="App">
        <Appbar />
      </div>
        <Dropdown />
        <Filter/>
        <Details/>
      </div>
    
  );
}



export default App;

