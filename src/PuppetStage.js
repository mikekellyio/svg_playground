import React, { Component } from 'react';
import GrassBlade from './GrassBlade'

export default class PuppetStage extends Component {
  
  render() {
    var a = 1,b = 2,c = 3;
    return (
        <svg {...this.props}>
          <GrassBlade a={a} b={b} c={c}/> 
        </svg>
    );
  }
}
