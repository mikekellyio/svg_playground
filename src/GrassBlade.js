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
    
    return l;
  }
  
  perpendicular(a,b, index, count){
    // Calculate perpendicular offset
    a = a.split(',')
    b = b.split(',')
    var ax = parseFloat(a[0]),
        ay = parseFloat(a[1]),
        bx = parseFloat(b[0]),
        by = parseFloat(b[1]);
    
    var dx = ax - bx;
    var dy = ay - by;

    var dist = Math.sqrt(dx * dx + dy * dy);

    //var offset = (Math.sin(index / count * Math.PI / 2) + 1) * dist / 6;
    var offset = dist / 4;
    
    var normX = dx / dist;
    var normY = dy / dist;

    var xPerp = offset * normX;
    var yPerp = offset * normY;

    // Create perpendicular points

    var cx = ax + yPerp;
    var cy = ay - xPerp;
    var dx = ax - yPerp;
    var dy = ay + xPerp;
    
    return {x1: cx, y1: cy, x2: dx, y2: dy};
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
    var line = this.line(20);
    
    var points = []
    var left = []
    var right = []
    for(var i=1; i< line.length; i++){
      var rib = this.perpendicular(line[i-1], line[i], i, line.length);
      left.push(rib.x1 + "," + rib.y1)
      right.push(rib.x2 + "," + rib.y2)
      points.push(rib)
    }
    right.reverse()
    
    var outline = <polyline
          points={line[0] + ' ' + left.join(' ') + ' ' + right.join(' ')}
          strokeWidth="1"
          stroke="#444"
          fill="green" />
    
    var perps = points.map(function(p, i){
      return (
        <line {...p}
            strokeWidth="1"
            stroke="#dddddd" key={i}/>
      )
    })
    
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
    
    var skeleton = <polyline
          points={line.join(' ')}
          strokeWidth="1"
          stroke="green"
          fill="none" />
    return (
      <g>
        { outline }
      </g>
    );
  }
}
