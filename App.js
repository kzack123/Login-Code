import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import CreateAccount from './components/createAccount/createAccount.js';
import Login from './components/login/login.js';



/* This is a mock sign in/ create an account, form. 
   You can create any number of accounts, and actually 
   log in with the credentials you just made up. 
   Then a separate page will display your information. 
   Enjoy. :) Created by: Kyle Polson  */



class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      users: [],
      render: true,
      loggedIn: null,
      accountCreatedDuplicatePopup: '',
      accountCreatedDuplicatePopupCss: 'accountCreatedPopup' 

    }
    this.saveUser = this.saveUser.bind(this);
    this.load = this.load.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    alert("This is a mock sign in/ create an account, form. You can create any number of accounts, and actually log in with the credentials you just made up. Then a separate page will display your information. Enjoy. :) Created by: Kyle Polson");
  }

 
  saveUser(user) {
    if (user === false) {
      this.setState({accountCreatedDuplicatePopup: "Account with that email already exists"});
      if (this.state.accountCreatedDuplicatePopupCss === "accountCreatedDup") {
        this.setState({accountCreatedDuplicatePopupCss: "accountCreatedDupTwo"});
      } else {
        this.setState({accountCreatedDuplicatePopupCss: "accountCreatedDup"});
      }
    } else {

        axios({
          method: 'post',
          url: 'https://reactlogin-e8687.firebaseio.com/users.json',
          data: user
        });

      this.state.users.push(user);
      this.setState({accountCreatedDuplicatePopup: "Account created successfully"});
      if (this.state.accountCreatedDuplicatePopupCss === "accountCreated") {
        this.setState({accountCreatedDuplicatePopupCss: "accountCreatedDup"});
      } else {
        this.setState({accountCreatedDuplicatePopupCss: "accountCreated"});
      }
    }
  }

  loggedIn(user) {

    //console.log(user.firstName.charAt(0).toUpperCase() + user.firstName.substr(1));
    let account = user;
    this.setState({loggedIn: user});
    this.setState({render: false});
  }

  logOut() {
    this.setState({render: true});
    this.setState({loggedIn: null});
  }

  load() {
    if (this.state.render) {
      return (
        <div>
        
        <div className="loginCreate">
          <Login loggedIn={this.loggedIn} users={this.state.users} />
          
          <CreateAccount saveUser={this.saveUser} userAccounts={this.state.users} />
        </div>
        </div>
      );
    } else {
      return (
        <div className="loggedInAccountBackground">
          <h1>Welcome, {this.state.loggedIn.firstName}</h1>
          <h3>Account Details:</h3>
          <h4>First Name: {this.state.loggedIn.firstName}</h4>
          <h4>Last name: {this.state.loggedIn.lastName}</h4>
          <h4>Email Address: {this.state.loggedIn.email}</h4>
          <h4>Password: {this.state.loggedIn.password}</h4>
          <div className="logOut"><button onClick={this.logOut}>Logout</button></div>
        </div>
      )
    }
  }

  
  render() {
    return (
      <div className="App">
      <p className={this.state.accountCreatedDuplicatePopupCss}>{this.state.accountCreatedDuplicatePopup}</p>
        {this.load()}
      </div>
    );
  }
}

export default App;
