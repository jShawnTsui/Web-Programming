import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';

class App extends Component {
  state = {
    persons: [
      {name: 'Max', age: 28},
      {name: 'Manu', age: 29},
      {name: 'Stephaine', age: 26}
    ]
  }

  switchNameHandler = () => {
    console.log('Was clicked!');
  }

  render() {
    return (
      <div className="App">
        <h1>Hi, I am a React APP</h1>
        <p>This is working!</p>
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}/>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
        <Person name="Tom" age="26">My Hobbie is football!</Person>
        <Person name="Shawn" age="24"/>
      </div>
    );
    // return React.createElement("div", 
    //                            { className: "App"}, 
    //                            React.createElement("h1",
    //                                                 null,
    //                                                 "Hi, I am a React App, LOL!"));
  }
}

export default App;
