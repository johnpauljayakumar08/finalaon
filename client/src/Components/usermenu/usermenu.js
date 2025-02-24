import React,{useState,useEffect} from "react";
import '../menu/menu.css'
import logo from '../Assest/logowhitesmaill.png'
import { Link, useParams } from "react-router-dom";
import axios from "axios";
export function Menuuser() {
    var { id } = useParams()
    const [timeLeft, setTimeLeft] = useState(10800);

  useEffect(() => {
    // If the timer reaches 0, stop the countdown
    if (timeLeft === 0) return;

    // Set up the interval to decrement the timer every second
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clean up the interval on component unmount or if timeLeft changes
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // Convert the time left from seconds to hours, minutes, and seconds
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
    function handeleinvite(event) {
        event.preventDefault()
        var emails = document.getElementById("emailids").value
        var emailsplit = emails.split(',')
        var key = {
            emails: emails
        }
        if (emails === '') {
            alert("Plz give the mailid")
        }

        else {
            axios.post("http://localhost:5000/text-mail", key)
                .then((res) => {
                    if (res.data.message === "Mail send") {
                        alert("Mail sended Successfully")
                        window.location.reload()
                    }
                    else {
                        alert("mail is not sendted")
                    }
                })
        }
    }
    return (
        <>
            <nav class="navbar navbar-expand-lg bgcolor navmain">
                <div class="container-fluid">
                    <a class="navbar-brand " href="#">
                        <img src={logo} className="siz" />
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
                    <div className="container">

                    <div className="d-flex justify-content-between">
                        <div>

                           <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Grade</button>
                        </div>
                        <div>

                            <Link to={`/report/${id}`} className="ms-auto me-5"><button className="btn btn-success">Submit Assessment</button></Link>
                        </div>

                        <div>
                            <h1 className="text-white me-5">

                            {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                            </h1>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            </nav>
            <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header modleborderbottom">
                            <h5 class="modal-title" id="exampleModalLabel">Grade</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-5">
                        <table class="table table-hover table-nowrap col-lg-10">
                             <thead class="thead-light">
                                 <tr>
                                     <th scope="col">Date</th>
                                     <th scope="col">Test Case-Status</th>
                                     <th scope="col">Result</th>
                                     <th scope="col">Score</th>
                                     
                                    
                                 </tr>
                             </thead>
                             <tbody>
                             
                                 
                                 <tr>
                                   <td rowSpan={6} className="algin">04.06.2024</td>
                                   <td>1. Performance Test - Pass</td>
                                   <td rowSpan={6} className="algin">Fail</td>
                                    <td rowSpan={6} className="algin">66.66%</td>
                                 </tr>
                                 <tr>
                                   
                                   <td>2. Responsive Test - Pass</td>
                                   
                                 </tr>
                                 <tr>
                                   
                                   <td> 3. Login with company ID - Pass</td>
                                   
                                 </tr>
                                 <tr>
                                   
                                   <td> 4. Login with gmail ID - Pass</td>
                                   
                                 </tr>
                                 <tr>
                                  
                                   <td> 5. Create user inside Admin Login - Fail</td>
                                   
                                 </tr>
                                 <tr>
                                   
                                   <td>6. Create Admin inside Admin Login - Fail</td>
                                   
                                 </tr>
                              
                            </tbody>
            </table>

                        </div>  

                    </div>
                </div>
            </div>
        </>
    );
}