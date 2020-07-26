import React, { Component } from "react";
import './Notification.css';
import { Badge, OverlayTrigger, Popover, Image, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'

export default class Notification extends Component {

  messageRow(messageObject) {
    return (
      <div className={`message ${messageObject.seen ? '' : 'unread'}`}>
        <div className="author-info">
          <div className="avator">
            <Image src={messageObject.avator} roundedCircle />
          </div>
          <div className="author">
            <strong>{messageObject.author} </strong> Wrote
          </div>
          <div className="envelope-icon" onClick={(e) => { this.props.toggleNotificationState(e, messageObject.id, !messageObject.seen) }} >
            <strong> <FontAwesomeIcon icon={messageObject.seen ? faEnvelopeOpen : faEnvelope} /> </strong>
          </div>
        </div>
        <p>
          {messageObject.text}
        </p>
        <pre className="datetime">
          {messageObject.dateTime}
        </pre>
      </div>
    );
  }

  render() {
    let that = this;
    const { messages, unreadCount, clearBadge, openNotification } = that.props;
    let unreadMessages = `${unreadCount} Unread message${unreadCount > 1 ? 's' : ''}`;

    return (
      <div>
        <div >
          <OverlayTrigger
            trigger={messages ? "click" : ""}
            key="notification-tray"
            placement="bottom"
            delay={{ show: 400, hide: 100 }}
            overlay={
              <Popover id={`popover-positioned-bottom`}>
                {unreadCount > 0 && <Popover.Title>


                  <Row >
                    <Col className="title"> {unreadMessages}</Col>
                    <Col className="mark-read" onClick={clearBadge}>
                      Mark All as read</Col>
                  </Row>

                </Popover.Title>}
                {messages && <Popover.Content>
                  {messages.map((message, i) => {
                    return <div className={message.clickable ? "clickable-notification" : "non-clickable-notification"} onClick={() => { openNotification(message) }} key={i}> {that.messageRow(message)}</div>
                  })}
                </Popover.Content>}
              </Popover>
            }
            rootClose>
            <div>
              <FontAwesomeIcon icon={faBell} />
              {messages && unreadCount > 0 && <Badge variant="primary" className="notification-badge">{unreadCount}</Badge>}
            </div>
          </OverlayTrigger>
        </div>
      </div>
    );
  }
}
