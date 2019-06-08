import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import {targetURI} from './keys';
import axios from 'axios';

class App extends React.Component {
    componentDidMount() {
        // axios.get('/api/product/brands').then(response => {
        //     console.log(response);
        // });

        axios.get(`${targetURI}/api/product/brands`).then(response => {
            console.log(response);
        });
    }

    render() {
        return <div className="App">MY APP</div>;
    }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
