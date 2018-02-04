import React, { Component } from 'react';
import PieChart from './d3charts/PieChart';
import GroupBarChart from './d3charts/GroupBarChart'
import io from 'socket.io-client'
import './App.css';
const socketURL = "http://localhost:3600";
const API = 'http://localhost:3600/';
const DEFAULT_QUERY = 'getData';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      socket:null,
      hits: [],
      state2: {
        data: [
        ],
      }
    }
  }

  componentWillMount(){
    this.initSocket();
  }
  componentDidMount() {
    fetch(API + DEFAULT_QUERY)
    .then(response => response.json())
    .then(data => 
      this.setState({ state2: data })
    );

  }
  initSocket = ()=>{
    const socket = io(socketURL);
    
    socket.on('connect',()=>{
      console.log("connected");
    })

    socket.on("changedata", (msg)=>{
      this.componentDidMount();
    })
  }


  render() {
    const { data } = this.state.state2;
    
    const { containerWidth, containerHeight } = this.props;
    return (
      
      
      <div className="App">
        <div className="row">
          <div className="col-md-6">
            <h1> Pie Chart </h1>
            <PieChart           
              data={data}
              width={containerWidth}
              height={containerHeight}
            />
      </div>
      <div className="col-md-6">
          <h1> GroupBarChart </h1>
            <GroupBarChart 
              states={data}
              width={containerWidth}
              height={containerHeight}
            />
          </div>
        </div>
      </div>
    );
  }
}


export default App;