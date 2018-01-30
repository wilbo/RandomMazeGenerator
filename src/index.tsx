import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MazeComponent from './components/MazeComponent';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<MazeComponent />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
