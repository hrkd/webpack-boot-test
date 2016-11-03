import Config from './configure'
import Test from './Test'
import React from 'react'
import ReactDOM from 'react-dom'

const config = new Config();

console.log(A);
config.Hello();

ReactDOM.render(
  <div>
    React Ready
    <Test />
  </div>,
  document.getElementById('react_container')
);
