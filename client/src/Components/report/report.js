import React, { useEffect, useState } from "react";
import report from '../Assest/report.jpeg'
import './report.css'
export function Reportfile(){
    const[report,setreport]=useState([])
    useEffect(()=>{
        fetch("http://localhost:3000/responsive_test_results.json")
        .then(res=>res.json())
        .then(data=>setreport(data))
    })
    const mobileIcon = '📱';
const tabletIcon = '📲';
const laptopIcon = '💻';
const tickIcon = '✔️';

const getDeviceType = (width) => {
  if (width === 320) return mobileIcon;
  if (width === 768) return tabletIcon;
  if (width === 1440) return laptopIcon;
  return null;
};

const ResponsiveReport = () => {
  return (
    <div className="conatiner-fluid">
      <h1>Responsive Test Report</h1>
        <div className="conatiner-fluid">
            <div className="row ">
      {report.map((entry, index) => {
        const { width, height } = entry.viewport || {};
        const isResponsive = entry.isResponsive;

        const deviceIcon = getDeviceType(width);
        if (!deviceIcon) return null;

        return (
                    <div key={index} className="report-entry card col-lg-3">
                        <h2>{deviceIcon} Device (Width: {width})</h2>
                        <p><strong>Viewport Size:</strong> {width}x{height}</p>
                        <p><strong>Responsive:</strong> {isResponsive ? tickIcon : '✖️'}</p>
                    </div>
        );
    })}
        </div>
    </div>
    </div>
  );
};

    return(
        <>
         <ResponsiveReport />
             {/* <div className="conatiner-fluid">
                <h2>Reponsive Testing</h2>
                <div className="container-fluid">
                    {

                    <div className="col-lg-4">

                    </div>
                    }
                </div>
            </div> */}
        </>
    )
}