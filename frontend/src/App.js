import './App.css';
import MainBody from './Layout/MainBody'
import InputZone from './Layout/InputZone'

const axios = require('axios');

function App() {
  return (
    <div className="App">
      <header>
        <h1>The App</h1>
      </header>
      <body>
        <MainBody />
        <InputZone />
      </body>
    </div>
  );
}

export default App;