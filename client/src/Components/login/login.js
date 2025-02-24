import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faL, faXmark} from '@fortawesome/free-solid-svg-icons'
import './login.css'
import kglogo from '../Assest/KGGL Without Background.png'
import axios from 'axios';
export function Login(){
    const handlelogin=(event)=>{
        event.preventDefault();
        var username=document.getElementById("email").value 
        var password=document.getElementById("password").value
        var key={
            username:username,
            password:password
        }
        if(username===''){
            alert("Please Enter the Username")
        }
        else if(password==''){
            alert("Please Enter the Password")
        }
        else{
            axios.post("http://localhost:5000/login",key)
            .then((res)=>{
                
                if(res.data.status==="success"){
                    var role=res.data.role;
                    var id=res.data.id;
                    if(role===1){
                        window.location.href=`/admin/${id}`
                    }
                    else if(role===2){
                        window.location.href=`/question_creator/${id}`
                    }
                    else if(role===3){
                        window.location.href=`/systemcheck/${id}`
                    }
                    else if(role===4){
                        window.location.href=`/bde/${id}`
                    }
                }
                else if(res.data.status==="invalid_user"){
                    alert("Please check your password")
                }
                else if(res.data.status==="both_are_invalid"){
                    alert("Please check your username")
                }
                else{
                    alert("Please Contact Admin")
                }
            })
        }
      }
      const getIpAddress = async () => {
        try {
          const response = await axios.get('http://localhost:5000/ip');
        //   setIp(response.data.ip);
        } catch (error) {
          console.error('Error fetching IP address:', error);
        }
      };
      const [ip, setIp] = useState('');

    useEffect(() => {
        const fetchIp = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/get-ip');
                setIp(response.data.ip);
            } catch (error) {
                console.error('Error fetching the IP address', error);
            }
        };

        fetchIp();
    }, []);
    return(
        <>
              <div className="container-fluid padd">
               
                    <div className="col-lg-6 p-5 mx-auto">
                        <div className='mx-auto ms-5 ps-5'>
                            {/* <img src={kglogo} className='col-lg-8 col-8 mx-auto'/> */}
                            
                        </div>

                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                <form onSubmit={handlelogin}>
                                    
                                    <div className="form-group">
                                        <label className="form-control-label mb-3 textcolor"><h4 className='font-weight-bold'>Email Id</h4></label>
                                        <input type="text" className="form-control" name="email" id="email"/>
                                    </div>
                                    <br/>
                                    <br/>
                                    <div className="form-group">
                                    <label className="form-control-label mb-3 textcolor"><h4 className='font-weight-bold'>Password</h4></label>
                                        <input type="password" className="form-control" name="password" id="password" />
                                    </div>
                                    <br/>
                                    
                                    <div className=" text-left d-flex ">
                                      
                                        <div className="ms-auto ">
                                            <a href="#">Forgot Password</a>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="col-lg-12">
                                            <button type="submit" className="btn btn-primary col-lg-12 col-12">Sign in</button>
                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                           
                           
                           
                    </div> 
               
            </div>
            
            {/* <div className=" padd">
               
               <div className=" p-5 mx-auto">
                   <div className='mx-auto ms-5 ps-5'>
                       <img src={kglogo} className=' mx-auto'/>
                       
                   </div>

                   <div className=" login-form">
                       <div className=" login-form">
                           <form onSubmit={handlelogin}>
                               
                               <div className="form-group">
                                   <label className="form-control-label mb-3 textcolor"><h4 className='font-weight-bold'>Email Id</h4></label>
                                   <input type="text" className="form-control" name="email" id="email"/>
                               </div>
                               <br/>
                               <br/>
                               <div className="form-group">
                               <label className="form-control-label mb-3 textcolor"><h4 className='font-weight-bold'>Password</h4></label>
                                   <input type="password" className="form-control" name="password" id="password" />
                               </div>
                               <br/>
                               
                               <div className=" text-left d-flex ">
                                 
                                   <div className="ms-auto ">
                                       <a href="#">Forgot Password</a>
                                   </div>
                               </div>
                               <br/>
                               <div className="">
                                       <button type="submit" className="btn btn-primary ">Sign in</button>
                                   
                               </div>
                           </form>
                       </div>
                   </div>
                   
                      
                      
                      
               </div> 
          
       </div> */}
        {/* <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Your IP Address</h1>
      <button onClick={getIpAddress}>Get IP Address</button>
      {ip && <p>Your IP address is: {ip}</p>}
    </div> */}
     {/* <div className="App">
            <header className="App-header">
                <p>Your IP address is: {ip}</p>
            </header>
        </div> */}
        </>
    );
}