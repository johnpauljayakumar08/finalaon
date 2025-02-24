import React from "react";
import './menu.css'
import logo from '../Assest/logowhitesmaill.png'
import { Link, useParams } from "react-router-dom";
import axios from "axios";
export function Menu(){
    var {id}=useParams()
    function handeleinvite(event){
        event.preventDefault()
        var emails=document.getElementById("emailids").value
        var emailsplit=emails.split(',')
        var key={
            emails:emails
        }
        if(emails===''){
            alert("Plz give the mailid")
        }
        
        else{
            axios.post("http://localhost:5000/text-mail",key)
            .then((res)=>{
                if(res.data.message==="Mail send"){
                    alert("Mail sended Successfully")
                    window.location.reload()
                }
                else{
                    alert("mail is not sendted")
                }
            })
        }
    }
    return(
        <>
            <nav class="navbar navbar-expand-lg bgcolor navmain">
                <div class="container-fluid">
                    <a class="navbar-brand " href="#">
                        <img src={logo} className="siz"/>
                    </a>
                    <button class="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon "></span>
                    </button>
                    <div class="collapse navbar-collapse " id="navbarSupportedContent">
                    {/* <ul class="navbar-nav mx-auto mb-2 mb-lg-0 text-white">
                        <li class="nav-item text-white">
                        <a class="nav-link active text-white" aria-current="page" data-bs-toggle="modal" data-bs-target="#exampleModal" href="#">Invite User</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link text-white" href="#">Link</a>
                        </li>
                        
                        <li class="nav-item">
                        <a class="nav-link text-white" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li>
                    </ul> */}
                    {/* <button className="btn btn-primary ms-5 me-5 ">Launch Workspace</button>
                    <button className="btn btn-success">Submit Assessment</button> */}
                    </div>
                    <Link to='/'><button className="btn btn-danger me-5 float-end">Logout</button></Link>
                </div>
            </nav>
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                    <div class="modal-header modleborderbottom">
                                        <h5 class="modal-title" id="exampleModalLabel">Invite User</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body p-5">
                                        <form onSubmit={handeleinvite}>

                                            <textarea className="col-lg-12 boderthickness" id="emailids"></textarea>
                                            <p >You may specify multiple email addresses by separating them with commas</p>
                                            <div className=" d-flex justify-content-between p-5">

                                                <button type="submit" class="btn btn-primary ms-auto">Invite</button>
                                                
                                                
                                            </div>
                                        </form>

                                    </div>
                                    
                                    </div>
                                </div>
                            </div>
        </>
    );
}