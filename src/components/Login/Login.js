import React, { useState,useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer=(state,action)=>{
  if(action.type === 'User_Input'){
    return{value:action.val , isValid:action.val.includes('@')};
  }
  if(action.type === 'Input_Blur'){
    return{value:state.value , isValid:state.value.includes('@')};
  }
return{val:'',isValid:false};
};

const passwordReducer = (state,action) => { 
  if(action.type === 'User_Input'){
    return {value:action.val, isValid:action.val.trim().length > 6};
  }
  if(action.type === 'Input_Blur'){
    return{value:state.value, isValid:state.value.trim().length > 6};
  }
  return{value:'',isValid:false};
};

const collegeReducer = (state,action) => { 
  if(action.type === 'User_Input'){
    return {value:action.val, isValid:action.val.trim().length > 2};
  }
  if(action.type === 'Input_Blur'){
    return{value:state.value, isValid:state.value.trim().length > 2};
  }
  return{value:'',isValid:false};
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollege,setEnteredCollege] = useState('');
  // const [collegeIsValid,setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

const [emailState,dispatchEmail] = useReducer(emailReducer,{value:'',isValid:null});
const [passwordState,dispatchPassword] = useReducer(passwordReducer,{value:'',isValid:null});
const [collegeState,dispatchCollege] = useReducer(collegeReducer,{value:'',isValid:null});

const {isValid:emailIsValid}=emailState;
const {isValid:passwordIsValid}=passwordState;
const {isValid:collegeIsValid}=collegeState;

  useEffect(()=>{
     const identifier = setTimeout(()=>{
      console.log("Checking for validity")
   setFormIsValid(
    emailIsValid && passwordIsValid && collegeIsValid
   )},1000);
    return ()=>{
    console.log('Cleanup');
    clearTimeout(identifier);
  }
  },[emailIsValid,passwordIsValid,collegeIsValid]);

  const collegeChangeHandler=event=>{
    dispatchCollege({type:'User_Input',val:event.target.value});

    // setFormIsValid(
    //     event.target.value.trim().length > 0 && passwordState.isValid > 6 && emailState.isValid
    // );
  }
  const emailChangeHandler = (event) => {
   dispatchEmail({type:'User_Input',val:event.target.value});

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid && enteredCollege.trim().length > 0
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'User_Input',val:event.target.value})

    // setFormIsValid(
    //   passwordState.isValid && emailState.isValid && enteredCollege.trim().length > 0
    // );
  };

  const validateEmailHandler = () => {
   dispatchEmail({type:'Input_Blur'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'Input_Blur'});
  };

  const validateCollegeHandler=()=>{
    dispatchCollege({type:'Input_Blur'}); 
  };

  const submitHandler = (event) => {
    event.preventDefault();
    localStorage.setItem('isLoggedIn','1');
    props.onLogin(emailState.value, passwordState.value,collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
           passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={collegeState.value}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
