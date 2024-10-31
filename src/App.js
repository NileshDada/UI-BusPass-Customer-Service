import Cookies from 'js-cookie';
import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import RoutesMasterComponent from './components/MasterComponents/RoutesMasterComponent';
import PassTypeMasterComponent from './components/MasterComponents/PassTypeMasterComponent';

import StudentPassMasterComponent from './components/StudentPassMasterComponent/StudentPassMasterComponent';
import SchoolInformationMasterComponent from './components/MasterComponents/SchoolInformationMasterComponent';
import BusStopMasterComponent from './components/MasterComponents/BusStopMasterComponent';
import PassTypeDocumentMasterComponent from './components/MasterComponents/PassTypeDocumentMasterComponent';
import AddNewStudentPass from './components/StudentPassMasterComponent/AddNewStudentPass';
import ReportStudentPassMasterComponent from './components/StudentPassMasterComponent/ReportStudentPassMasterComponent';


function App() {
  return (
    <BrowserRouter>
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="http://localhost:3008" >FutureBizops</a>
        </div>

        
        <ul className="nav navbar-nav">

        <li><Link to="/studentpass">New Student Pass</Link></li>    
        <li><Link to="/historypass">Student Pass History</Link></li>  
          <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Master Records
            <span className="caret"></span></a>
          <ul className="dropdown-menu">
                    
          
          
          <li><Link to="/routes">Routes Master</Link></li>
          <li><Link to="/busstop">Bus Stop Master</Link></li>
          <li><Link to="/passtype">Pass Type Master</Link></li>
            
          <li><Link to="/passtypedocument">Pass Type Document Master</Link></li>
          <li><Link to="/schoolinfo">School Information</Link></li>
          <li><Link to="/addnewpass">Add New Pass</Link></li>

          </ul>
        </li>


         

        

        </ul>

        <ul className="nav navbar-nav navbar-right">
          <li><a href="#">Welcome: {Cookies.get('custName')}</a></li>
          <li><a href="http://localhost:3002" >Logout</a></li>
        </ul>
      </div>
    </nav>
    <Routes>

      <Route exact path="/" ></Route>
      
      
      <Route exact path="addnewpass" element={<AddNewStudentPass></AddNewStudentPass>}></Route>
      <Route exact path="/routes" element={<RoutesMasterComponent></RoutesMasterComponent>}></Route>
      <Route exact path="/busstop" element={<BusStopMasterComponent></BusStopMasterComponent>}></Route>
      
      <Route exact path="/passtype" element={<PassTypeMasterComponent></PassTypeMasterComponent>}></Route>
      
      <Route exact path="/studentpass" element={<StudentPassMasterComponent></StudentPassMasterComponent>}></Route>
      <Route exact path="/historypass" element={<ReportStudentPassMasterComponent></ReportStudentPassMasterComponent>}></Route>
      <Route exact path="/schoolinfo" element={<SchoolInformationMasterComponent></SchoolInformationMasterComponent>}></Route>

      <Route exact path="/passtypedocument" element={<PassTypeDocumentMasterComponent></PassTypeDocumentMasterComponent>} ></Route>
      <Route exact path="/updateDOB" ></Route>
      <Route exact path="/announcement" ></Route>
    </Routes>
  </BrowserRouter>

  );
}

export default App;
