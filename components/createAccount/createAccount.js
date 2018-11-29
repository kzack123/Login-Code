import React, { Component } from 'react';

import './style.css';
import checkMark from './checked.png';
import cross from './cross.png';


class createAccount extends Component {
  constructor(props) {
    super(props);
    
    this.state = {

    }
    this.addUser = this.addUser.bind(this);
  }


    textChecker(event) {
      let passwordChecker = document.getElementById('createPassword');

      let comfirmPassword = document.getElementById('comfirmPassword');

      let comfirmPasswordCheck = document.getElementById('comfirmPasswordCheck');

      let passwordInstructions = document.getElementById('passwordInstructions');

      let inputPlaceholder = event.target.placeholder;

      let checkMarkClass = event.currentTarget.children[1];

      let inputValue = event.target.value;

      let regexName = /^\w/;

      let regexEmail = /^\w+@[a-z A-Z]+\.[a-z A-Z]+/;

      // Password must be at least 6 char long atleast one number and one capital letter
      let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;

      let regexComfirm = /^\w+@[a-z]+/;


      switch(inputPlaceholder) {
        case "First Name":
          if(regexName.test(inputValue)) {
            checkMarkClass.className = "checked visible";
          } else {
            checkMarkClass.className = "checked";
          }
          break;
        case "Last Name":
        if(regexName.test(inputValue)) {
          checkMarkClass.className = "checked visible";
        } else {
          checkMarkClass.className = "checked";
        }
          break;
        case "Email":
        if(regexEmail.test(inputValue)) {
          checkMarkClass.className = "checked visible";
        } else {
          checkMarkClass.className = "checked";
        }
          break;
        case "Password":
        let instructionTimeout = passwordInstructions.className = "passwordInstructions showInstructions";
        let clearTimeout = window.clearTimeout(setsTimeout);
        let setsTimeout = setTimeout(function(){passwordInstructions.className = "passwordInstructions";}, 3000);
        instructionTimeout;
        clearTimeout;
        instructionTimeout;
        setsTimeout;
        if (comfirmPassword.value == "") {
          if(regexPassword.test(inputValue)) {
            checkMarkClass.className = "checked visible";
          } else {
            checkMarkClass.className = "checked";
          }
        } else {
          if(regexPassword.test(inputValue) && inputValue === comfirmPassword.value) {
            checkMarkClass.className = "checked visible";
            comfirmPasswordCheck.className = "checked visible";
          } else if (regexPassword.test(inputValue) && inputValue != comfirmPassword.value) {
            checkMarkClass.className = "checked visible";
            comfirmPasswordCheck.className = "checked";
          } else {
            checkMarkClass.className = "checked";
            comfirmPasswordCheck.className = "checked";
          }
        }
          break;
        case "Comfirm Password":
          if(inputValue == "") {
            checkMarkClass.className = "checked";
          } else {
            if(inputValue === passwordChecker.value && regexPassword.test(inputValue)) {
              checkMarkClass.src = checkMark;
              checkMarkClass.className = "checked visible";
            } else {
              checkMarkClass.className = "checked wrong";
              checkMarkClass.src = cross;
            }
          }
          break;
        default:
          return;
      }
    }

    addUser() {
      let find = document.getElementsByClassName("create");

      let varifidedInputs  = document.getElementsByClassName("visible").length;

      let inputValues = document.getElementsByClassName("input");

      let userAccounts = this.props.userAccounts;

      let duplicateAccount = false;

      for(let i =0; i < userAccounts.length; i++) {
        if (userAccounts[i].email === inputValues[2].value.toLowerCase()) {
          duplicateAccount = true;
        }
        //console.log(duplicateAccount);
      };

      if (varifidedInputs === 5 && duplicateAccount === false) {
        //console.log("they are all varifided!");
        let user = {};

        user.firstName = inputValues[0].value.charAt(0).toUpperCase() + inputValues[0].value.substr(1);
        user.lastName = inputValues[1].value.charAt(0).toUpperCase() + inputValues[1].value.substr(1);
        user.email = inputValues[2].value.toLowerCase();
        user.password = inputValues[3].value;

        this.props.saveUser(user);

        inputValues[0].value = "";
        inputValues[1].value = "";
        inputValues[2].value = "";
        inputValues[3].value = "";
        inputValues[4].value = "";

        let findChecks = document.getElementsByClassName("checked");
        
        findChecks[0].className = "checked";
        findChecks[1].className = "checked";
        findChecks[2].className = "checked";
        findChecks[3].className = "checked";
        findChecks[4].className = "checked";
        
      } else if (varifidedInputs === 5 && duplicateAccount === true) {
        //console.log("there are duplicates");
        this.props.saveUser(false);
      };
    }

    render() {
      return (
        <div className="create">
          <h3>Create account</h3>
          <span onChange={this.textChecker} ><input className="input" placeholder="First Name" /><img className="checked" src={checkMark}/></span>
          <span onChange={this.textChecker} ><input className="input" placeholder="Last Name" /><img className="checked" src={checkMark}/></span>
          <span onChange={this.textChecker} ><input className="input" placeholder="Email" /><img className="checked" src={checkMark}/></span>
          <span onChange={this.textChecker} ><input className="input" id="createPassword" type="password" placeholder="Password" /><img className="checked" src={checkMark}/></span>
          <div id="passwordInstructions" className="passwordInstructions"><p>Use at least 6 character with one upercase later and at least 1 number.</p></div>
          <span onChange={this.textChecker} ><input className="input" type="password" id="comfirmPassword" placeholder="Comfirm Password" /><img id="comfirmPasswordCheck" className="checked" src={checkMark}/></span>
          <button onClick={this.addUser}>Create Account</button>
        </div>
      );
    }
}

export default createAccount;