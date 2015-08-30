import React, { Component } from 'react';
import Field from './Field'
import PuppetStage from './PuppetStage'
import Freezer from 'freezer-js'

export default class App extends Component {
  constructor(props){
    super(props);
    var store = new Freezer(
       {a: {x: 10, y: 275}, 
        b: {x: 10, y: 30}, 
        c: {x: 10, y: 60},
        fieldSize: 300
       });
    this.state = {store: store.get()}
    
    // Listen to changes in the store
    store.on('update', this.updateStore);
    
  }
  
  updateStore(newState){
    this.setState({store: newState})
  }
  
  render() {
    
    return (
      <div>
        <Field height="300" width="1200" size={this.state.store.fieldSize} />
        
      </div>
    );
  }
}
