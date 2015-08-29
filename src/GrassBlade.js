import React, { Component } from 'react';

export default class GrassBlade extends Component {
  constructor(props) {
    super(props);
  }
  
  inspect(props){
    return "{a: {x:"+props.a.x+", y:"+props.a.y+"}, " +
            "b: {x:"+props.b.x+", y:"+props.b.y+"}, " + 
            "c: {x:"+props.c.x+", y:"+props.c.y+"}}"
  }
  
  line(numSteps){
    var l = [];
    for(var currentStep=0; currentStep <= numSteps; currentStep++){
      var t = 1/numSteps * currentStep;
      l.push(this.point(t).join(","));
    }
    
    return l.join(' ');
  }
  
  point(t){
    var a = this.props.a,
        b = this.props.b,
        c = this.props.c;
    return [this.p(a.x, b.x, c.x, t), this.p(a.y, b.y, c.y, t)];
  }
  
  p(a, b, c, t){
    return  (1-t)*((1-t)*a + t*b) + t*((1-t)*b + t*c);
  }
  
  render() {
    var controlPoints = ""
    if(this.props.showControlPoints){
      controlPoints = (
        <g>
        <circle cx={this.props.a.x} cy={this.props.a.y} r="5" fill="red" />
        <circle cx={this.props.b.x} cy={this.props.b.y} r="5" fill="red" />
        <circle cx={this.props.c.x} cy={this.props.c.y} r="5" fill="red" />
        </g>
      )
    }
    return (
      <g>
        
        <polyline
          points={this.line(20)}
          strokeWidth="2"
          stroke="green"
          fill="none" />
      </g>
    );
  }
}
