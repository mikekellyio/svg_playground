var React = require("react"),
  SetIntervalMixin = require("./SetIntervalMixin");
React.Animate = require("react-animate-state");

module.exports = React.createClass({
  mixins: [SetIntervalMixin, React.Animate],

  getInitialState: function() {
    return {
      ax: this.props.a.x,
      ay: this.props.a.y,
      bx: this.props.b.x,
      by: this.props.b.y,
      cx: this.props.c.x,
      cy: this.props.c.y,
      da: 0,
      db: 15,
      dc: 15,
      tock: 5000
    };
  },

  a: function() {
    return { x: this.state.ax, y: this.state.ay };
  },
  b: function() {
    return { x: this.state.bx, y: this.state.by };
  },
  c: function() {
    return { x: this.state.cx, y: this.state.cy };
  },

  componentDidMount: function() {
    this.setInterval(this.tick, this.state.tock); // Call a method on the mixin
    this.tick();
  },

  tick: function() {
    if (Math.random() > 0.2) {
      return; // only 1 in 10 ticks get to move
    }
    var newAx =
        this.state.ax + (Math.random() * this.state.da - this.state.da / 2),
      newAy =
        this.state.ay + (Math.random() * this.state.da - this.state.da / 2),
      newBx =
        this.state.bx + (Math.random() * this.state.db - this.state.db / 2),
      newBy =
        this.state.by + (Math.random() * this.state.db - this.state.db / 2),
      newCx =
        this.state.cx + (Math.random() * this.state.dc - this.state.dc / 2),
      newCy =
        this.state.cy + (Math.random() * this.state.dc - this.state.dc / 2);
    this.animate(
      {
        ax: newAx,
        ay: newAy,
        bx: newBx,
        by: newBy,
        cx: newCx,
        cy: newCy
      },
      this.state.tock,
      function() {}
    );
  },

  inspect: function(props) {
    return (
      "{a: {x:" +
      props.a.x +
      ", y:" +
      props.a.y +
      "}, " +
      "b: {x:" +
      props.b.x +
      ", y:" +
      props.b.y +
      "}, " +
      "c: {x:" +
      props.c.x +
      ", y:" +
      props.c.y +
      "}}"
    );
  },

  line: function(numSteps) {
    var l = [];
    for (var currentStep = 0; currentStep <= numSteps; currentStep++) {
      var t = 1 / numSteps * currentStep;
      l.push(this.point(t).join(","));
    }

    return l;
  },

  perpendicular: function(a, b, index, count) {
    // Calculate perpendicular offset
    a = a.split(",");
    b = b.split(",");
    var ax = parseFloat(a[0]),
      ay = parseFloat(a[1]),
      bx = parseFloat(b[0]),
      by = parseFloat(b[1]);

    var dx = ax - bx;
    var dy = ay - by;

    var dist = Math.sqrt(dx * dx + dy * dy);

    //var offset = (Math.sin(index / count * Math.PI / 2) + 1) * dist / 6;
    var offset = dist / 16;

    var normX = dx / dist;
    var normY = dy / dist;

    var xPerp = offset * normX;
    var yPerp = offset * normY;

    // Create perpendicular points

    var cx = ax + yPerp;
    var cy = ay - xPerp;
    var dx = ax - yPerp;
    var dy = ay + xPerp;

    return { x1: cx, y1: cy, x2: dx, y2: dy };
  },

  point: function(t) {
    var a = this.a(),
      b = this.b(),
      c = this.c();
    return [this.p(a.x, b.x, c.x, t), this.p(a.y, b.y, c.y, t)];
  },

  p: function(a, b, c, t) {
    return (1 - t) * ((1 - t) * a + t * b) + t * ((1 - t) * b + t * c);
  },

  render: function() {
    var line = this.line(5);

    var points = [];
    var left = [];
    var right = [];
    for (var i = 1; i < line.length; i++) {
      var rib = this.perpendicular(line[i - 1], line[i], i, line.length);
      left.push(rib.x1 + "," + rib.y1);
      right.push(rib.x2 + "," + rib.y2);
      points.push(rib);
    }
    right.reverse();

    var outline = (
      <polyline
        points={line[0] + " " + left.join(" ") + " " + right.join(" ")}
        strokeWidth="1"
        stroke="#444"
        fill="green"
      />
    );

    var perps = points.map(function(p, i) {
      return <line {...p} strokeWidth="1" stroke="#dddddd" key={i} />;
    });

    var controlPoints = "";
    if (this.props.showControlPoints) {
      controlPoints = (
        <g>
          <circle cx={this.props.a.x} cy={this.props.a.y} r="5" fill="red" />
          <circle cx={this.props.b.x} cy={this.props.b.y} r="5" fill="red" />
          <circle cx={this.props.c.x} cy={this.props.c.y} r="5" fill="red" />
        </g>
      );
    }

    var skeleton = (
      <polyline
        points={line.join(" ")}
        strokeWidth="1"
        stroke="green"
        fill="none"
      />
    );
    return <g>{outline}</g>;
  }
});
