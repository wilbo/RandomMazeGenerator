import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MazeComponent from './components/MazeComponent';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MazeComponent />, document.getElementById('root'));
registerServiceWorker();
