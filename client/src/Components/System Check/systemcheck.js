import React,{useState,useEffect} from "react";
import './systemcheck.css'
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
export function SystemCheck(){
    var {id}=useParams()
    const [tests, setTests] = useState([
        { id: 1, name: 'Install the Docker Desktop', status: false },
        // { id: 2, name: 'Speed Internet', status: false },
        // { id: 3, name: 'Test 3', status: false },
      ]);
      const [testStatus, setTestStatus] = useState('Initial');
    
      const handleCheckSystemSpec = () => {
        setTests(tests.map(test => ({ ...test, status: true })));
        setTestStatus('Checked');
      };
      const [dockerStatus, setDockerStatus] = useState(null);

      const checkDocker = async () => {
        try {
          const response = await axios.get('http://localhost:5000/check-docker');
          setDockerStatus(response.data);
        } catch (error) {
          setDockerStatus({ installed: false, message: 'Error checking Docker status' });
        }
      };
      return (
        <div className="container">
         <div class="container mt-5">
        <h1 class="text-center">Coding Test Portal Instructions and Terms & Conditions</h1>

        <section class="mt-4">
            <h2>Instructions for the Coding Test</h2>
            <h3>General Instructions:</h3>
            <ul>
                <li><strong>Duration:</strong> The coding test will last for 3 hours.</li>
                <li><strong>Proctoring:</strong> This is a proctored examination. Your webcam and microphone must be on throughout the test.</li>
                <li><strong>Environment:</strong> Ensure you are in a quiet, well-lit room free from disturbances. Only one person (you) should be present in the room during the test.</li>
            </ul>
            
            <h3>System Requirements:</h3>
            <ul>
                <li>A laptop or desktop computer with a webcam and microphone.</li>
                <li>Stable internet connection.</li>
                <li>Latest version of Chrome or Firefox browser.</li>
            </ul>
            
            <h3>Tools Allowed:</h3>
            <p>You may use any coding environment or editor of your choice, but all submissions must be done through the portal.</p>
            
            <h3>No External Help:</h3>
            <p>You are not allowed to use any external resources or receive assistance from others during the test. This includes books, websites, and online forums.</p>
            
            <h3>Before the Test:</h3>
            <ul>
                <li><strong>Login:</strong> Ensure you have the correct login credentials. Log in at least 15 minutes before the test starts.</li>
                <li><strong>Identity Verification:</strong> You will need to show a valid photo ID to the camera for verification.</li>
                <li><strong>System Check:</strong> Perform a system check to ensure your webcam, microphone, and internet connection are working properly.</li>
            </ul>
            
            <h3>During the Test:</h3>
            <ul>
                <li><strong>Submission:</strong> All answers and code submissions must be done through the portal. Partial submissions are allowed and will be graded accordingly.</li>
                <li><strong>Proctoring Alerts:</strong> Any suspicious activity detected by the proctoring software will be flagged and reviewed. Multiple flags may result in disqualification.</li>
                <li><strong>Breaks:</strong> You are not allowed to take breaks during the test. Ensure you have all necessities (water, etc.) before starting.</li>
                <li><strong>Queries:</strong> If you encounter any technical issues, use the provided chat support feature to seek assistance.</li>
            </ul>
            
            <h3>After the Test:</h3>
            <ul>
                <li><strong>Automatic Grading:</strong> Your submissions will be automatically graded. The results will be available within 24 hours.</li>
                <li><strong>Feedback:</strong> You will receive feedback on your performance, including areas of strength and improvement.</li>
            </ul>
        </section>

        <section class="mt-4">
            <h2>Terms and Conditions</h2>
            <ul>
                <li><strong>Acceptance of Terms:</strong> By participating in the coding test, you agree to adhere to these instructions and terms and conditions.</li>
                <li><strong>Proctoring Agreement:</strong> You consent to being monitored via webcam and microphone for the duration of the test.</li>
                <li><strong>Privacy:</strong> All personal information collected will be used solely for the purpose of administering and evaluating the test and will be kept confidential.</li>
                <li><strong>Code of Conduct:</strong> You agree to maintain academic integrity and honesty. Any form of cheating, plagiarism, or violation of test rules will result in immediate disqualification.</li>
                <li><strong>Technical Issues:</strong> The portal is not responsible for technical issues arising from your hardware, software, or internet connection. Ensure your system is prepared before the test.</li>
                <li><strong>Submission Responsibility:</strong> You are responsible for ensuring your code is correctly submitted through the portal. Late submissions will not be accepted.</li>
                <li><strong>Disqualification:</strong> Any breach of these terms or instructions may result in disqualification and a permanent ban from future tests.</li>
                <li><strong>Appeals:</strong> If you believe there has been an error in the evaluation, you may submit an appeal within 48 hours of receiving your results. The decision on the appeal will be final.</li>
            </ul>
            <p>By participating in this coding test, you confirm that you have read, understood, and agreed to these instructions and terms and conditions. Good luck!</p>
        </section>
    </div>
          <ul className="ullist ps-5">
            {tests.map(test => (
              <li className="list" key={test.id}>
                {test.name} {test.status && <span className="text-success">✔</span>}
              </li>
            ))}
          </ul>
          {/* {dockerStatus && (
          <p>
            {dockerStatus.installed
              ? `Docker is installed: ${dockerStatus.message}`
              : dockerStatus.message}
          </p>
        )} */}
          {testStatus === 'Checked' ?(
              <div className="ps-5">
              {/* <p>All tests are checked!</p> */}
              <Link to={`/user/${id}`} className="btn btn-success mb-5">Start Assessment</Link>
            </div>
          ):(
              <button onClick={handleCheckSystemSpec} className="btn btn-success mb-5">Check System Specifications</button>

          )
          }
          
        </div>
      );

}