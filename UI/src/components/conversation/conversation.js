import React, { Component } from 'react';
import { Col } from 'reactstrap';
import './conversation.scss';
import ChatItem from '../chat-item/chat-item';
import ChatHeader from '../chat-header/chat-header';
import FaShareSquare from '../../../node_modules/react-icons/lib/fa/share-square';

export default class Conversation extends Component {
    constructor(props) {
        //super(props) would pass props to the parent constructor
        super(props);
        this.state = {
            sideMenu: false
        }
    }
    // Send Message Handler 
    onSend = (e) => {
        e.preventDefault();
        console.log(e)
        const message = this.refs.txtMessage.value;
        if (message.length === 0) {
            return;
        }
        const messageObj = {
            Who: "Ayushi Jain", //Hardcoded 
            What: message,
            When: new Date().valueOf(),
            To: this.props.user
        };
        this.props.sendMessage(messageObj);
        this.refs.txtMessage.value = '';
        this.refs.txtMessage.focus();
    }
    
    componentDidMount() {
        this.refs.txtMessage.focus();
    }
    // SideBar Handler
    sidebarToggleOpen = () => {
        this.setState({
            sideMenu: true
        }, () => {
            console.log(this.state);

        })
    }
    sidebarToggleClose = () => {
        this.setState({
            sideMenu: false
        })
    }
    render() {
        return (
            <div className="chat">
                <ChatHeader user={this.props.user} toggleClick={this.handleClick} />

                <div className="chat-history">
                    <ul>
                        {
                            this.props.user == "MTA" ? this.props.MTAhistory.map((obj) => {
                                return (<ChatItem object={obj} key={obj.When} who={obj.Who} username={this.props.user} />)
                            }) : this.props.history.map((obj) => {
                                return (<ChatItem object={obj} key={obj.When} who={obj.Who} username={this.props.user} />)
                            })
                        }

                    </ul>

                </div>
                <div className="chat-message clearfix">
                    <form onSubmit={(e) => this.onSend(e)}>
                        <textarea ref="txtMessage" name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>

                        <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
        <i className="fa fa-file-image-o"></i>
                        <button type="submit"><FaShareSquare /></button>
                        {/* <button >Send</button> */}
                    </form>
                </div>


            </div>


        )
    }
}