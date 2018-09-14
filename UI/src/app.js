import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import UserList from './components/user-list/user-list';
import Conversation from './components/conversation/conversation';

// import './index.scss'


// The higher order component that combines all major components of the application
class App extends Component {
  constructor(props) {
    super(props);
    // local state of the class
    this.state = {
      userID: Math.round(Math.random() * 1000000).toString(),
      userName: "Sarah Porter", //Hardcoded user
      history: [],
      MTAhistory: [],
      MTAunread: 0,
      unread: 0,
      showSideMenu: false

    }
  }
  // Toggle Handler
  handleToggle = () => this.setState({ drawerState: !this.state.drawerState });

  handleClose = () => this.setState({ drawerState: false });

  //Lifecycle method to subscribe to pubnub channel as soon the application has been mounted
  componentDidMount() {
    this.PubNub = PUBNUB.init({
      publish_key: 'pub-c-e2f048dc-74a5-4283-a99d-c54f98734cb0',
      subscribe_key: 'sub-c-cc11b4d4-8fa8-11e6-a8c4-0619f8945a4f',
      ssl: (location.protocol.toLowerCase() === 'https:'),
    });

    this.PubNub.subscribe({
      channel: 'ReactChat',
      message: (message) => {
        this.setState({
          history: this.state.history.concat(message),
          unread: this.state.unread + 1
        })
      }
      ,
    });
    this.PubNub.subscribe({
      channel: 'MTA',
      message: (message) => {
        this.setState({
          MTAhistory: this.state.MTAhistory.concat(message),
          MTAunread: this.state.MTAunread + 1,
        })
      }
      ,
    });
  }
  //Publishing to the pubnub channel
  sendMessage = (message) => {
    console.log('sendMessage', message);
    if (this.state.userName == "MTA") {
      console.log("publishing MTA");

      this.PubNub.publish({
        channel: 'MTA',
        message: message,
      });
    } else {
      this.PubNub.publish({
        channel: 'ReactChat',
        message: message,
      });
    }
  }
  channelHandler = (userName) => {
    console.log(userName);
    this.setState({
      userName: userName,
      MTAunread: 0,
      unread: 0
    })
  }
  openSideMenu = () => {
    this.setState({
      showSideMenu: true
    })
  }
  closeSideMenu = () => {
    this.setState({
      showSideMenu: false
    })
  }
  render() {
    return (

      <div className="chat-bubble">
        <button onClick={this.openSideMenu}>Click ME!</button> 
        <div className={'side-menu ' + (this.state.showSideMenu ? 'open' : 'hidden')}>
          <UserList click={this.channelHandler} activeUser={this.state.userName} MTAunread={this.state.MTAunread} unread={this.state.unread} closeSideMenu={this.closeSideMenu} />
        </div>
        <Conversation history={this.state.history} user={this.state.userName} MTAhistory={this.state.MTAhistory} sendMessage={this.sendMessage} />
      </div>


    );
  }
}

export default App;
