import React, { useState,useEffect, useReducer,useContext,useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

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

const Login = () => {
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

const emailInputRef=useRef();
const passwordInputRef=useRef();
const collegeInputRef=useRef();

const {isValid:emailIsValid}=emailState;
const {isValid:passwordIsValid}=passwordState;
const {isValid:collegeIsValid}=collegeState;

const authCtx =  useContext(AuthContext);

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
    if(formIsValid){
    authCtx.onLogin(emailState.value, passwordState.value,collegeState.value);
    }
    else if(!emailIsValid){
       emailInputRef.current.outside();
    }else if(!passwordIsValid){
       passwordInputRef.current.outside();
    }else{
       collegeInputRef.current.outside();
    }
  };



  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
        ref={emailInputRef}
        label='E-Mail'
        id='email'
        type='email'
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler} 
        isValid={emailIsValid}/>

       <Input 
       ref={passwordInputRef}
        label='PASSWORD'
        id='password'
        type='password'
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler} 
        isValid={passwordIsValid}/>
        
        <Input 
        ref={collegeInputRef}
        label='COLLEGE'
        id='college'
        type='text'
        value={collegeState.value}
        onChange={collegeChangeHandler}
        onBlur={validateCollegeHandler} 
        isValid={collegeIsValid}/>
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
