
// import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import SJTest from 'sjtest';
import MainDiv from './components/MainDiv';

// export jquery for YA's Login
import $ from 'jquery';
window.$ = $;

console.log("Yeh");

ReactDOM.render(<MainDiv />, document.getElementById('mainDiv'));
