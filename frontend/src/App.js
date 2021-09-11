import './App.css';
import MainBody from './Layout/MainBody'
const axios = require('axios');


function App() {
  return (
    <div className="App">
      <header>
        <h1>The App</h1>
      </header>
      <body>
        <MainBody />
      </body>
    </div>
  );
}

export default App;