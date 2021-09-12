import './App.css';
import Layout from './Layout/Layout'

const axios = require('axios');

function App() {
  return (
    <div className="App">
      <header>
        <div className="fixed-header">
          <h2>Nutrition Chatbot</h2>
        </div>
      </header>
      <body>
        <Layout />
      </body>
    </div>
  );
}

export default App;