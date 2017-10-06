import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.connection = new WebSocket('ws://localhost:3001');
    this.state = {

      currentUser: {name: "Bob"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
    this.connection.onopen = function (event) {
      console.log('Connected to server');
      this.send("Here's some text that the server is urgently awaiting!");

      // on receiving messages from the server
      // ws.onmessage = function (event) {
      //   console.log(1);
      // }


    };

  }

  uploadMessage = (message) => {
    const newMessage = {
      username: this.state.currentUser.name,
      content: message
    }
    this.connection.send(JSON.stringify(newMessage));

    this.setState({
      messages: this.state.messages.concat(newMessage)
    });

  }



  render() {
    return (
       <div>
          <nav className="navbar">
            <a href='/' className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages} />
          <ChatBar currentUser={this.state.currentUser} uploadMessage={this.uploadMessage} />
      </div>
    );
  }
}
export default App;
