import React from 'react';
import './chat-header.scss';
import FaStar from '../../../node_modules/react-icons/lib/fa/star';

const ChatHeader = (props) => {
    return (
        <div className="chat-header clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
            <div className="chat-about">
                <div className="chat-with">{props.user}</div>
                <div className="chat-num-messages">already 1 902 messages</div>
            </div>
            {/* <button onClick={props.toggleClick}>cl</button> */}
            <FaStar />
        </div>
    )
}

export default ChatHeader;