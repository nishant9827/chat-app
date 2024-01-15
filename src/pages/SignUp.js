import React,{useState} from 'react';
import {useNavigate,Link} from 'react-router-dom'
import {toast } from 'react-toastify';
import '../css/login.css';

const SignUp = () => {
 
const navigate = useNavigate();
const [inputVal,setInputVal] = useState({
  username:'',
  email:'',
  password:'',
  cPassword:''
})

const setVal = (e)=>{
  const {name,value} =  e.target;
  setInputVal(()=>{
    return({...inputVal,[name]:value})
  })
}
const submitData = async (e)=>{
  e.preventDefault();
  const {username,email,password,cPassword} = inputVal;
  if(username === ""){
    toast.error("Please enter your username");
  }else if(email === ""){
      toast.error("Please enter your email");
  }else if(password === ""){
      toast.error('Enter your password');
  }
  else if(password.length < 6){
      toast.error("Password must be 6 char");
  }
  else if(cPassword !== password){
      toast.error('Password and confirm password not match')
  }else{
     try {
    const data = await fetch('https://chat-app-api-9yr1.vercel.app/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username,email,password}),
    });
    const resp = await data.json();
    if(resp.status === true){
      toast.success('Registered Successfully');
      setInputVal({...inputVal,username:'',email:'',password:'',cPassword:''});
      localStorage.setItem('userData',JSON.stringify(resp.result));
      navigate('/');
    }else{
      toast.error(resp.msg);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
  }
    
  }


  return (
    <div className="loginBox">
      <h2 className="loginHeading">Register</h2>
      <form onSubmit={submitData}>
        <div className="formGroup">
          <input type="text" className="formElement" name="username" autoComplete="off" onChange={setVal} required value={inputVal.name}/>
          <label className="floatingLabel">Username</label>
        </div>
        <div className="formGroup">
          <input type="text" className="formElement" name="email" autoComplete="off" onChange={setVal} required value={inputVal.email}/>
          <label className="floatingLabel">Email</label>
        </div>
        <div className="formGroup">
          <input type="password" className="formElement" name="password" autoComplete="off" onChange={setVal} required value={inputVal.password}/>
          <label className="floatingLabel">Password</label>
        </div>
        <div className="formGroup">
          <input type="password" className="formElement" name="cPassword" autoComplete="off" onChange={setVal} required value={inputVal.cPassword}/>
          <label className="floatingLabel">Confirm Password</label>
        </div>
        <button className="submitButton mt-2">Submit</button>
        <span class="already_span">Already Have An Account? <Link to={'/login'}>Login</Link></span>
      </form>
    </div>
  );
};

export default SignUp;
