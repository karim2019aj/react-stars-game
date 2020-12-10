import React, { Component } from 'react';


class PlayNumber extends Component{



    render(){

        return  <button style={{background:colors[this.props.status]}} className="number" onClick={()=>this.props.onClick(this.props.number, this.props.status)}>{this.props.number}</button>
    }


}
// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };


export default PlayNumber;