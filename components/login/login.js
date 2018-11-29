import React, { Component } from 'react';

import axios from 'axios';

import './style.css';


class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popUp: ""
    }
    this.login = this.login.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  changeState() {
    //console.log("we Made it");
    this.setState({popUp: null});
  }

  login() {
    let self = this;

    let users = [];

    axios.get('https://reactlogin-e8687.firebaseio.com/users.json')
      .then(function (response) {


        Object.keys(response.data).map(function(key) {
          users.push(response.data[key]);
        });
        let emailInput = document.getElementById("email").value.toLowerCase();

        let passwordInput = document.getElementById("password").value;

        let popUpId = document.getElementById("popupId");
        //console.log(users);
        for(let i = 0; i < users.length; i++) {
          //console.log('it is')
          if (emailInput === users[i].email) {
            if (passwordInput === users[i].password) {
              
              self.setState({popUp: "Email and Password Match"});

              if (popUpId.className === "invalid") {
                popUpId.className = "valid";
              } else {
                popUpId.className = "invalid";
              }
              
              self.props.loggedIn(users[i]);

              i = users.length;

            } else {

              self.setState({popUp: "Your password is incorrect"});

              if (popUpId.className === "invalid") {
                popUpId.className = "valid";
              } else {
                popUpId.className = "invalid";
              }

              i = users.length;
            }
          } else {
            self.setState({popUp: "Account doesn't exist"});

            if (popUpId.className === "doesntExist") {
              popUpId.className = "valid";
            } else {
              popUpId.className = "doesntExist";
            }       
          }
        }
    });
    

    

  }


  render() {
    return (
      <div className="loginContainer">
        <div className="loginTab">
          <h3>Sign in</h3>
          <div><p id="popupId" className='hidden'>{this.state.popUp}</p></div>
          <input id="email" placeholder="Email" />
          <input type="password" id="password" placeholder="Password"/>
          <button onClick={this.login}>Login</button>
        </div>
      </div>
    );
  }
}


export default login;