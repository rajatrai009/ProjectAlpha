import React, { Component } from 'react';
import { Col } from 'reactstrap'
import './user-list.scss';
import FaCircle from '../../../node_modules/react-icons/lib/fa/circle';
import FaSearch from '../../../node_modules/react-icons/lib/fa/search';

export default class UserList extends Component {
    constructor(props) {
        //super(props) would pass props to the parent constructor
        super(props);
        // local state of the class
        this.state = {
            activeChat: this.props.activeUser,
            MTAunread: this.props.MTAunread,
            unread: this.props.unread,
        }
    }
    
    //Handler for multiple channels
    channelSelectHandler = (userName) => {
        this.setState({
            activeChat: userName
        }, () => {
            this.props.click(userName);
            this.props.closeSideMenu();
        })

    }
    //Lifecycle method to set new props to the state
    componentWillReceiveProps(nextProps) {
        this.setState({
            MTAunread: nextProps.MTAunread,
            unread: nextProps.unread,
        })

    }
    render() {
        return (
            <Col sm="12" className="user-list" id="user-list">
                <div className="search">
                    <input type="text" placeholder="search" />
                    <FaSearch />
                </div>
                <ul>
                    <li>
                        <h5>Corporate Rooms</h5>
                        <ul>
                            <li onClick={() => this.channelSelectHandler("MTA")} className={(this.state.activeChat == "MTA" ? "activeChat" : "")}>
                                MTA
                            </li>
                            {
                                this.state.activeChat != "MTA" ? (this.state.MTAunread > 0 ? <span style={{
                                    float: "right",
                                    marginTop: "-44px"
                                }}>{this.state.MTAunread}</span> : null) : null
                            }
                        </ul>
                    </li>
                    <li>
                        <h5>Direct Messages</h5>
                        <ul>
                            <li onClick={() => this.channelSelectHandler("Sarah Porter")} className={(this.state.activeChat == "Sarah Porter" ? "activeChat" : "")}>
                                <h6>Sarah Porter</h6>
                            </li>
                            {
                                this.state.activeChat != "Sarah Porter" ? (this.state.unread > 0 ? <span style={{
                                    float: "right",
                                    marginTop: "-47px"
                                }}>{this.state.unread}</span> : null) : null
                            }

                            {/* <li onClick={() => this.channelSelectHandler("John Thomson")}>
                                <h6>John Thomson</h6>
                            </li>
                            <li onClick={() => this.channelSelectHandler("Clint Johnson")}>
                                <h6>Clint Johnson</h6>
                            </li> */}
                        </ul>

                    </li>
                </ul>
            </Col>




        )

    }
}
