import React, { Component } from "react";
import { connect } from "react-redux";
import { getNotifications, markAllRead, toggleNotificationState } from "./redux/action/notifictionAction";
import './App.css';
import Header from './common-components/header/Header';
import Notification from './widgets/notification/Notification';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.notificationClickHandler = this.notificationClickHandler.bind(this)
    this.clearBadgeHandler = this.clearBadgeHandler.bind(this)
    this.toggleNotificationState = this.toggleNotificationState.bind(this)
  }

  componentDidMount() {
    this.props.getNotifications('');
  }

  notificationClickHandler(message) {
    if (message.clickable)
      this.setState({ message: message });
  }

  clearBadgeHandler() {
    delete this.state.updated;
    setTimeout(
      function () {
        this.props.markAllRead();
      }
        .bind(this),
      1000
    );
  }


  toggleNotificationState(e, id, state) {
    e.stopPropagation();
    setTimeout(
      function () {
        this.props.toggleNotificationState(id, state);
        this.setState({ updated: { id: id, seen: state } });
      }
        .bind(this),
      500
    );
  }

  syncReadStatus(messages, updated) {
    let updatedMessages = [];
    messages.forEach(message => {
      if (typeof updated !== "undefined" && message.id == updated.id) {
        message.seen = updated.seen;
      } else if (typeof updated === "undefined") {
        message.seen = true;
      }
      updatedMessages.push(message);
    });
    return updatedMessages;
  }

  countUnread(messages) {
    let unread = messages.filter(message => !message.seen);
    return unread.length;
  }

  render() {
    let that = this;
    let unreadCount = 0;
    let fetched = false;
    const { messages, update } = that.props;

    var data;
    if (messages.data && !fetched) {
      fetched = true;
      data = messages.data;
      unreadCount = that.countUnread(data);
    }
    if (update.data && fetched) {
      data = that.syncReadStatus(messages.data, that.state.updated);
      unreadCount = that.countUnread(data);
    }

    return (
      <div>
        <header>
          <Header notificationWidget={data && <Notification unreadCount={unreadCount} toggleNotificationState={that.toggleNotificationState} clearBadge={that.clearBadgeHandler} openNotification={that.notificationClickHandler} messages={data} />} />
        </header>
        <div className="app-body">
          {that.state.message && <pre>{JSON.stringify(that.state.message, null, 2)}</pre>}
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (state) => ({
  messages: state.notification,
  update: state.notificationUpdate
});

const mapDispatchToProps = {
  getNotifications,
  markAllRead,
  toggleNotificationState
};

export default connect(mapStoreToProps, mapDispatchToProps)(App); 
