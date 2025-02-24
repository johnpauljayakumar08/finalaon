import React,{useState,useEffect} from "react";
import HTMLViewer from './htmlviewer.js';
import './user.css'
import { Workspace } from "./testcase.js";
import { useParams } from "react-router-dom";
export function User(){
    var {id}=useParams()
    const[testdata,setTestdata]=useState([])
    const [htmlContent, setHtmlContent] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [timeLeft, setTimeLeft] = useState(6);
    useEffect(() => {
        
        fetch("http://localhost:5000/getquestion")
        .then(res=>res.json())
        .then((data)=>{
            setHtmlContent(data[0].context)
        },[])
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
              setTimeLeft(timeLeft - 1);
            }, 1000); // Decrement the timeLeft by 1 second
      
            return () => clearTimeout(timer); // Cleanup the timer
          } else {
            setIsButtonEnabled(true); // Enable the button when timeLeft reaches 0
          }
        }, [timeLeft]);
       
          
          
          
        
          
          const [showTable, setShowTable] = useState(false);

          const toggleTable = () => {
              setShowTable(!showTable);
          };
          const runScript = async () => {
            try {
                const response = await fetch('http://localhost:5000/run-script', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    
                });
                const data = await response.json();
                console.log('Script output:', data);
                // alert("workspace created");
                window.location.href=`/workspace/${id}`
            } catch (error) {
                console.error('Error running script:', error);
            }
        };
    return(
        <>
            <div className="container-fluid">
                {/* <h1 className="text-center">MERN Assessment</h1> */}
                            <div className="row border p-5 mb-2">
                        
                            <div className="col-lg-12">
                                
                            <div class="container mt-5">

<h1 class="text-center">CRM Application Project Description</h1>



<section class="mt-4">

  <h2>Objective</h2>

  <p>Develop a CRM application using the MERN stack (MySQL, Express.js, React.js, and Node.js). The application will include role-based login functionality for Admin, Manager, BDM (Business Development Manager), and BDE (Business Development Executive). Each user will be able to register with their company domain email and roles, and reporting persons will be dynamically loaded from the database.</p>

</section>



<section class="mt-4">

  <h2>Requirements</h2>

  <h3>User Roles:</h3>

  <ul>

    <li><strong>Admin:</strong>

      <ul>

        <li>Can add users belonging to the Manager, BDM, and BDE roles.</li>

        <li>Cannot add other Admins.</li>

      </ul>

    </li>

    <li><strong>Manager, BDM, BDE:</strong>

      <ul>

        <li>Can register with a company domain email (e.g., manager@abccollege.com).</li>

        <li>Cannot register with generic email providers (e.g., manager@gmail.com).</li>

      </ul>

    </li>

  </ul>



  <h3>Registration Form:</h3>

  <p>The registration form must include the following fields:</p>

  <ul>

    <li><strong>Name:</strong> Text field for the user's name.</li>

    <li><strong>Phone Number:</strong> Numeric field for the user's phone number.</li>

    <li><strong>Email ID:</strong> Email field for the user's email address.</li>

    <li><strong>Reporting Person:</strong> Dropdown menu dynamically populated with users from the Admin, Manager, and BDM roles.</li>

    <li><strong>Role:</strong> Dropdown menu with roles (BDE, BDM, Manager).</li>

    <li><strong>Password:</strong> Password field for the user's password.</li>

    <li><strong>Employee Code:</strong> Text field for the user's employee code.</li>

  </ul>

</section>



<section class="mt-4">

  <h2>Functional Requirements</h2>

  <h3>User Registration:</h3>

  <ul>

    <li>Users must register with a company domain email address.</li>

    <li>Validation to ensure the email is not from a generic email provider.</li>

    <li>Form submission should save user details to the MySQL database.</li>

  </ul>



  <h3>Login Functionality:</h3>

  <ul>

    <li>Users can log in with their email and password.</li>

    <li>Access should be restricted based on roles (e.g., only Admin can add users).</li>

  </ul>



  <h3>Dynamic Dropdown Data:</h3>

  <ul>

    <li>The Reporting Person and Role dropdowns should load data dynamically from the database.</li>

  </ul>

</section>



<section class="mt-4">

  <h2>Technical Specifications</h2>

  <h3>Frontend:</h3>

  <ul>

    <li><strong>React.js:</strong> For building the user interface.</li>

    <li><strong>React Router:</strong> For handling routing between different pages (e.g., login, registration, dashboard).</li>

    <li><strong>Form Validation:</strong> Implement form validation to ensure correct data input.</li>

  </ul>



  <h3>Backend:</h3>

  <ul>

    <li><strong>Node.js:</strong> For server-side operations.</li>

    <li><strong>Express.js:</strong> For building the REST API.</li>

    <li><strong>MySQL:</strong> For the database to store user details and roles.</li>

    <li><strong>JWT (JSON Web Tokens):</strong> For handling authentication and authorization.</li>

  </ul>

</section>



<section class="mt-4">

  <h2>Project Steps</h2>

  <h3>Setup Environment:</h3>

  <ul>

    <li>Install Node.js and MySQL.</li>

    <li>Set up a new React.js project.</li>

    <li>Initialize a new Node.js project with Express.js.</li>

  </ul>



  <h3>Create Database:</h3>

  <ul>

    <li>Design the database schema.</li>

    <li>Create the necessary tables in MySQL.</li>

  </ul>



  <h3>Backend Development:</h3>

  <ul>

    <li>Set up Express.js server.</li>

    <li>Implement REST API endpoints for user registration, login, and fetching dynamic dropdown data.</li>

    <li>Implement JWT for authentication.</li>

  </ul>



  <h3>Frontend Development:</h3>

  <ul>

    <li>Develop the registration and login forms using React.js.</li>

    <li>Implement form validation.</li>

    <li>Fetch dynamic data for dropdowns from the backend.</li>

  </ul>

</section>



<section class="mt-4">

  <h2>Evaluation Criteria</h2>

  <ul>

    <li>Performance Testing</li>

    <li>Page load Time</li>

    <li>Page Responsiveness</li>

    <li>Registration with gmail ID</li>

    <li>Admin Registration within Admin Login</li>

    <li>Registration with company ID</li>

  </ul>

</section>

</div>
                                <button onClick={runScript} className="btn btn-primary float-end" disabled={!isButtonEnabled}>start Assessment</button>
                                <h4 className="text-success">Assessment will Start : {timeLeft} seconds</h4>
                            </div>
                           

                        </div>
                {
                    testdata.map((value,index)=>(
                        <>
                        </>
                    ))
                }
                 {/* <button onClick={toggleTable} className="btn btn-success float-end me-5">submit</button>
                 {showTable && (

                    <Workspace />
                 )} */}
            </div>
        </>
    );
}


