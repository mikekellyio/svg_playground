import React, { Component } from 'react';
import GrassBlade from './GrassBlade'

export default class Field extends Component {
  constructor(props){
    super(props)
    this.state = {blades: this.blades(props.size,3), slop: 10}
  }
  
  blades(count, offset){
    var blades = []
    for(var i=1; i<=count;i++){
      blades.push({a: this.point(i*offset, Math.random()*50 + 220), 
                   b: this.point(i*offset, Math.random()*10 + 20), 
                   c: this.point(i*offset + Math.random()*100, 60)})
    }
    blades.sort(function(a,b){
      return a.a.y > b.a.y ? 1 : (a.a.y == b.a.y ? 0 : -1)
    })
    return blades;
  }
  
  p(k){
    var neg = Math.random() > 0.5 ? 1 : -1,
        slop = 30,
        p = k + Math.random()*slop*neg; 
        
    return p > 0 ? p : 5;
  }
  
  point(x, y){
    return {x: this.p(x), y: this.p(y)}
  }
  
  render() {
    var blades = this.state.blades.map(function(b, i){
      return (
        <GrassBlade a={b.a} b={b.b} c={b.c} key={i}/>  
      )
    })
    
    return (
        <svg {...this.props}>
          { blades }
        </svg>
    );
  }
}
