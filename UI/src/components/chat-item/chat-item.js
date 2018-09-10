import React, { Component } from 'react';
import './chat-item.scss';
import FaCircle from '../../../node_modules/react-icons/lib/fa/circle';

export default class ChatItem extends Component {
    constructor(props) {
        super(props)
        console.log(props);
    }
    render() {
        var ele = null;
        if(this.props.who == "Ayushi Jain"){
            ele =  <li className="chat-item clearfix">
            <div className="message-data align-right">
            <span className="message-data-time">10:12 AM, Today</span>
                <span className="message-data-name">{this.props.who}</span> <FaCircle className="me" />
            </div>
            <div className="message other-message float-right">
                {this.props.object.What}
            </div>
        </li>
        }else{
            ele = <li className="chat-item">
            <div className="message-data">
                <span className="message-data-name"> <FaCircle className="online" />
                    {/* <i class="fa fa-circle online"></i>  */}
                    {this.props.who}</span>
                <span className="message-data-time">10:12 AM, Today</span>
            </div>
            <div className="message my-message">
                {this.props.object.What}
            </div>
        </li>
        }
       return ele;
    }
}