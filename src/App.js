var React = require('react')
var Field = require('./Field')
var PuppetStage = require('./PuppetStage')
var Freezer = require('freezer-js')

module.exports = React.createClass({
  getInitialState: function(){
    var store = new Freezer(
       {a: {x: 10, y: 275}, 
        b: {x: 10, y: 30}, 
        c: {x: 10, y: 60},
        fieldSize: 200
       });
    
    // Listen to changes in the store
    store.on('update', this.updateStore);
    return {store: store.get()}
  },
  
  updateStore: function(newState){
    this.setState({store: newState})
  },
  
  render: function() {
    
    return (
      <div>
        <Field height="300" width="1200" size={this.state.store.fieldSize} />
        
      </div>
    );
  }
});
