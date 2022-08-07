import { useState } from 'react';
import './App.css';
// import Cleanup from './pages/Cleanup';
import Templatizer from './pages/Templatizer';

function App() {

  const [type, setType] = useState('demand');

  const handleSelectChange = (e) => {
    setType(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault()


  // }


  return (
    <div className='App'>
      {/* <Cleanup /> */}

      <label>
        Pick a template to get started:
        <select value={type} onChange={handleSelectChange}>
          <option value='auction'>auction external</option>
          <option value='midweek'>midweek cut</option>
          <option value='demand'>demand newsletter</option>
          <option value='supply'>supply newsletter</option>
        </select>
      </label>


      <Templatizer type={type} />

    </div>
  );
}

export default App;
