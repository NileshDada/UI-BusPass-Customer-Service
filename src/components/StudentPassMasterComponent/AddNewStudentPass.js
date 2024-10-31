import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";

import { BASE_URL_API } from '../../services/URLConstants';
import AlertboxComponent from '../AlertboxComponent/AlertboxComponent'
import StudentPassMasterService from '../../services/StudentPassMasterService';
import PassTypeMasterService from '../../services/MasterServices/PassTypeMasterService';
import BusStopMasterService from '../../services/MasterServices/BusStopMasterService';
import RoutesMasterService from '../../services/MasterServices/RoutesMasterService';
import SchoolInformationMasterService from '../../services/MasterServices/SchoolInformationMasterService';
import CustomerMasterService from '../../services/CustomerMasterService';
import { useNavigate } from 'react-router-dom';
export default function AddNewStudentPass() {

    const navigate = useNavigate();

    const [custId, setCustId] = useState('');
    const [custFirstName, setCustFirstName] = useState('');
    const [custMiddleName, setCustMiddleName] = useState('');
    const [custLastName, setCustLastName] = useState('');
    const [custGender, setCustGender] = useState('');
    const [custDateOfBirth, setCustDateOfBirth] = useState('');
    const [custLoginUserName, setCustLoginUserName] = useState('');
    const [custAddress, setCustAddress] = useState('');
    const [custMobileNo, setCustMobileNo] = useState('');
    const [custEmailId, setCustEmailId] = useState('');

    const [studPassId, setStudPassId] = useState('');

    const [passTypeCollectionLocation, setPassTypeCollectionLocation] = useState('');
    const [passTypeAgeLimit, setPassTypeAgeLimit] = useState('');

    const [passTypeId, setPassTypeId] = useState('');
    const [passTypeName, setPassTypeName] = useState('');
    const [passTypeAmount, setPassTypeAmount] = useState('');
    const [passTypeDescription, setPassTypeDescription] = useState('');
    const [passTypeEndDate, setPassTypeEndDate] = useState('');

    const [studPassCreatedDate, setStudPassCreatedDate] = useState('');
    const [studPassExpiryDate, setStudPassExpiryDate] = useState('');
    const [routesName, setRoutesName] = useState('');

    const [fromBusStopName, setFromBusStopName] = useState('');
    const [toBusStopName, setToBusStopName] = useState('');
    const [studPassAmountPaidStatus, setStudPassAmountPaidStatus] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [schoolAddress, setSchoolAddress] = useState('')
    const [schoolAutonomus, setSchoolAutonomus] = useState('')
    const [schoolEveryDayStartTiming, setSchoolEveryDayStartTiming] = useState('')
    const [schoolEveryDayEndTiming, setSchoolEveryDayEndTiming] = useState('')



    const [routesId, setRoutesId] = useState('');
    const [routesStartLocation, setRoutesStartLocation] = useState('');
    const [routesEndLocation, setRoutesEndLocation] = useState('');
    const [fromBusStopId, setFromBusStopId] = useState('');
    const [toBusStopId, setToBusStopId] = useState('');


    const [studPassAmount, setStudPassAmount] = useState('');
    const [schoolId, setSchoolId] = useState('');

    const [schoolIdentificationNumber, setSchoolIdentificationNumber] = useState('');


    const [studCourseName, setStudCourseName] = useState('');
    const [studClassName, setStudClassName] = useState('');
    const [studRollNo, setStudRollNo] = useState('');

    const [remark, setRemark] = useState('');
    const [customerMasters, setCustomerMasters] = useState([])


    const [saveStudentMasterMasterAlert, setSaveStudentMasterMasterAlert] = useState(false);
    const [deleteCustomerMasterAlert, setDeleteCustomerMasterAlert] = useState(false);
    const [updateCustomerMasterAlert, setUpdateCustomerMasterAlert] = useState(false);

    const [isSuccess, setIsSuccess] = useState(true)
    const [passTypeMasters, setPassTypeMasters] = useState([])

    const [routesMasters, setRoutesMasters] = useState([])

    const [ddSchoolInfoMasters, setDdSchoolInfoMasters] = useState([])

    const [ddFromBusStopMasters, setDdFromBusStopMasters] = useState([])
    const [ddToBusStopMasters, setDdToBusStopMasters] = useState([])


    const handleClose = () => {



        setRoutesName('');
        setRemark('');
    };
    //loading all department and roles while page loading at first time
    useEffect(() => {

        //To create new student pass
        let custId = Cookies.get('empId')
        CustomerMasterService.getCustomerDetailsById(custId).then(res => {
            let studPassMaster = res.data;

            setCustId(studPassMaster.custId)
            setCustFirstName(studPassMaster.custFirstName)
            setCustMiddleName(studPassMaster.custMiddleName)
            setCustLastName(studPassMaster.custLastName)

            setCustAddress(studPassMaster.custAddress)
            setCustDateOfBirth(studPassMaster.custDateOfBirth)
            setCustEmailId(studPassMaster.custEmailId)
            setCustMobileNo(studPassMaster.custMobileNo)
            setCustGender(studPassMaster.custGender)
        }
        );



    

        PassTypeMasterService.ddPassTypeMaster().then((res) => {
            setPassTypeMasters(res.data);
            setPassTypeId(res.data?.[0].passTypeId)

            PassTypeMasterService.getPassTypeDetailsById(passTypeId).then(res => {
                let routesmaster = res.data;

                setPassTypeId(routesmaster.passTypeId)
                setPassTypeName(routesmaster.passTypeName)
                setPassTypeDescription(routesmaster.passTypeDescription)
                setPassTypeEndDate(routesmaster.passTypeEndDate)

                setPassTypeCollectionLocation(routesmaster.passTypeCollectionLocation)
                setPassTypeAmount(routesmaster.passTypeAmount)
                setPassTypeAgeLimit(routesmaster.passTypeAgeLimit)

                setRemark(routesmaster.remark)
            }
            );

        });

        BusStopMasterService.ddRoutesMaster().then((res) => {
            setRoutesMasters(res.data);
            setRoutesId(res.data?.[0].routesId)
            let routesId = res.data?.[0].routesId;

            RoutesMasterService.getRoutesDetailsById(routesId).then(res => {
                let routesmaster = res.data;

                setRoutesId(routesmaster.routesId)
                setRoutesName(routesmaster.routesName)
                setRoutesStartLocation(routesmaster.routesStartLocation)
                setRoutesEndLocation(routesmaster.routesEndLocation)
                setRemark(routesmaster.remark)

            }
            );

            BusStopMasterService.ddBusStopMaster(routesId).then((res) => {
                setDdFromBusStopMasters(res.data);
                setDdToBusStopMasters(res.data);
                setFromBusStopId(res.data?.[0].busStopId)
                setToBusStopId(res.data?.[0].busStopId)
            });

        });

        SchoolInformationMasterService.ddSchoolInformationMaster().then((res) => {
            setDdSchoolInfoMasters(res.data);
            setSchoolId(res.data?.[0].schoolId)

            SchoolInformationMasterService.getSchoolInformationDetailsById(schoolId).then(res => {
                let schoolInformation = res.data;

                setSchoolId(schoolInformation.schoolId)
                setSchoolIdentificationNumber(schoolInformation.schoolIdentificationNumber)
                setSchoolName(schoolInformation.schoolName)
                setSchoolAddress(schoolInformation.schoolAddress)
                setSchoolAutonomus(schoolInformation.schoolAutonomus)
                setSchoolEveryDayStartTiming(schoolInformation.schoolEveryDayStartTiming)
                setSchoolEveryDayEndTiming(schoolInformation.schoolEveryDayEndTiming)

                setRemark(schoolInformation.remark)
            }
            );

        });



    }, []);




    const saveStudentPassMastertDetails = (e) => {
        e.preventDefault()
console.log(e)
        let statusCd = 'A';
        let employeeId = Cookies.get('empId')

        let studentpassmaster = { custId, passTypeId, passTypeAmount, routesId, fromBusStopId, toBusStopId, schoolId, schoolIdentificationNumber, studCourseName, studClassName, studRollNo, remark, statusCd, employeeId };
console.log(studentpassmaster)
        StudentPassMasterService.saveStudentPassMastertDetails(studentpassmaster).then(res => {

            if (res.data.success) {
                alert(res.data.responseMessage)
            } else{
                alert(res.data.responseMessage)
            }
           

        }
        );
        // window.location.reload(); 
    }


    // handle region id change
    //for role , department and designation
    const handlePassTypeIdChange = (value) => {
        setPassTypeId(value)
        let passTypeId = value;
        PassTypeMasterService.getPassTypeDetailsById(passTypeId).then(res => {
            let routesmaster = res.data;

            setPassTypeId(routesmaster.passTypeId)
            setPassTypeName(routesmaster.passTypeName)
            setPassTypeDescription(routesmaster.passTypeDescription)
            setPassTypeEndDate(routesmaster.passTypeEndDate)

            setPassTypeCollectionLocation(routesmaster.passTypeCollectionLocation)
            setPassTypeAmount(routesmaster.passTypeAmount)
            setPassTypeAgeLimit(routesmaster.passTypeAgeLimit)

            setRemark(routesmaster.remark)
        }
        );
    }

    const handleFromBusStopIdChange = (value) => {
        setFromBusStopId(value)
    }

    const handleToBusStopIdChange = (value) => {
        setToBusStopId(value)
    }


    // handle region id change
    //for role , department and designation
    const handleSchoolInfoIdChange = (value) => {
        setPassTypeId(value)
        let schoolId = value;
        SchoolInformationMasterService.getSchoolInformationDetailsById(schoolId).then(res => {
            let schoolInformation = res.data;

            setSchoolId(schoolInformation.schoolId)
            setSchoolIdentificationNumber(schoolInformation.schoolIdentificationNumber)
            setSchoolName(schoolInformation.schoolName)
            setSchoolAddress(schoolInformation.schoolAddress)
            setSchoolAutonomus(schoolInformation.schoolAutonomus)
            setSchoolEveryDayStartTiming(schoolInformation.schoolEveryDayStartTiming)
            setSchoolEveryDayEndTiming(schoolInformation.schoolEveryDayEndTiming)

            setRemark(schoolInformation.remark)
        }
        );
    }

    // handle routes id change

    const handleRoutesIdChange = (value) => {
        setRoutesId(value)
        let routesId = value;
        RoutesMasterService.getRoutesDetailsById(routesId).then(res => {
            let routesmaster = res.data;

            setRoutesId(routesmaster.routesId)
            setRoutesName(routesmaster.routesName)
            setRoutesStartLocation(routesmaster.routesStartLocation)
            setRoutesEndLocation(routesmaster.routesEndLocation)
            setRemark(routesmaster.remark)
        }
        );

        BusStopMasterService.ddBusStopMaster(routesId).then((res) => {
            setDdFromBusStopMasters(res.data);
            setDdToBusStopMasters(res.data);
            setFromBusStopId(res.data?.[0].busStopId)
            setToBusStopId(res.data?.[0].busStopId)
        });
    }





    return (
        <React.Fragment>

            <div className="row">
                <h2 className="text-center">Add New Pass</h2>
                <div className="col-md-1"></div>
                <div className="col-md-9">
                    <form className="form-horizontal">


                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="studentName">Student Name:</label>
                            <div className="col-sm-8">
                                {custFirstName + " " + custMiddleName + " " + custLastName}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="custMiddleName">Student Address:</label>
                            <div className="col-sm-3">
                                {custAddress}
                            </div>

                            <label className="control-label col-sm-3" htmlFor="custMiddleName">Mobile Number:</label>
                            <div className="col-sm-3">
                                {custMobileNo}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="custMiddleName">Student Email Id:</label>
                            <div className="col-sm-3">
                                {custEmailId}
                            </div>

                            <label className="control-label col-sm-3" htmlFor="custMiddleName">Student Gender:</label>
                            <div className="col-sm-3">
                                {custGender}
                            </div>
                        </div>

                        <div className="form-group">
                            <hr></hr>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="custMiddleName">Student School Name:</label>
                            <div className="col-sm-4">
                                <select className="form-control" id="passTypeId" onChange={(e) => handleSchoolInfoIdChange(e.target.value)}>

                                    {
                                        ddSchoolInfoMasters.map(
                                            ddSchoolInfoMaster =>
                                                <option key={ddSchoolInfoMaster.schoolId} value={ddSchoolInfoMaster.schoolId}>{ddSchoolInfoMaster.schoolName}</option>
                                        )
                                    };
                                </select>

                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="custMiddleName">Selected School Name:</label>
                            <div className="col-sm-3">
                                {schoolName}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="custMiddleName">School Number:</label>
                            <div className="col-sm-3">
                                {schoolIdentificationNumber}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="custMiddleName">School Address:</label>
                            <div className="col-sm-3">
                                {schoolAddress}
                            </div>

                            <label className="control-label col-sm-3" htmlFor="custMiddleName">School Autonomous:</label>
                            <div className="col-sm-3">
                                {schoolAutonomus}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="custMiddleName">School Start Timing:</label>
                            <div className="col-sm-3">
                                {schoolEveryDayStartTiming}
                            </div>

                            <label className="control-label col-sm-3" htmlFor="custMiddleName">School End Timig:</label>
                            <div className="col-sm-3">
                                {schoolEveryDayEndTiming}
                            </div>
                        </div>

                        <div className="form-group">
                            <hr></hr>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="custMiddleName">Pass Type Details:</label>
                            <div className="col-sm-3">
                                <select className="form-control" id="passTypeId" onChange={(e) => handlePassTypeIdChange(e.target.value)}>

                                    {
                                        passTypeMasters.map(
                                            passTypeMaster =>
                                                <option key={passTypeMaster.passTypeId} value={passTypeMaster.passTypeId}>{passTypeMaster.passTypeName}</option>
                                        )
                                    };
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="custMiddleName">Pass Type Descriptioin:</label>
                            <div className="col-sm-8">
                                {passTypeDescription}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="custMiddleName">Pass Type End Date:</label>
                            <div className="col-sm-3">
                                {passTypeEndDate}
                            </div>

                            <label className="control-label col-sm-3" htmlFor="custMiddleName">Pass Collection Place:</label>
                            <div className="col-sm-3">
                                {passTypeCollectionLocation}
                            </div>
                        </div>


                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="custMiddleName">Pass Type Amount:</label>
                            <div className="col-sm-3">
                                {passTypeAmount}
                            </div>

                            <label className="control-label col-sm-3" htmlFor="custMiddleName">Pass Type Age limit:</label>
                            <div className="col-sm-3">
                                {passTypeAgeLimit}
                            </div>
                        </div>


                        <div className="form-group">
                            <hr></hr>
                        </div>




                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="routesId">Select Route Name:</label>
                            <div className="col-sm-3">
                                <select className="form-control" id="routesId" onChange={(e) => handleRoutesIdChange(e.target.value)}>

                                    {
                                        routesMasters.map(
                                            routesMaster =>
                                                <option key={routesMaster.routesId} value={routesMaster.routesId}>{routesMaster.routesName}</option>
                                        )
                                    };
                                </select>

                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="routesStartLocation">Route Start Location:</label>
                            <div className="col-sm-3">
                                {routesStartLocation}
                            </div>

                            <label className="control-label col-sm-3" htmlFor="routesEndLocation">Route End Location:</label>
                            <div className="col-sm-3">
                                {routesEndLocation}
                            </div>
                        </div>
                        <div className="form-group">
                            <hr></hr>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="custMiddleName">Start Bus Stop Name:</label>
                            <div className="col-sm-3">
                                <select className="form-control" id="passTypeId" onChange={(e) => handleFromBusStopIdChange(e.target.value)}>

                                    {
                                        ddFromBusStopMasters.map(
                                            ddFromBusStopMaster =>
                                                <option key={ddFromBusStopMaster.busStopId} value={ddFromBusStopMaster.busStopId}>{ddFromBusStopMaster.busStopName}</option>
                                        )
                                    };
                                </select>
                            </div>


                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="custMiddleName">To Bus Stop Name:</label>
                            <div className="col-sm-3">
                                <select className="form-control" id="passTypeId" onChange={(e) => handleToBusStopIdChange(e.target.value)}>

                                    {
                                        ddToBusStopMasters.map(
                                            ddFromBusStopMaster =>
                                                <option key={ddFromBusStopMaster.busStopId} value={ddFromBusStopMaster.busStopId}>{ddFromBusStopMaster.busStopName}</option>
                                        )
                                    };
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <hr></hr>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="studCourseName">Course Name:</label>
                            <div className="col-sm-3">
                                <input type="text" className="form-control" id="studCourseName" placeholder="Enter Course namee here" value={studCourseName} onChange={(e) => setStudCourseName(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="studClassName">Class Name:</label>
                            <div className="col-sm-3">
                                <input type="text" className="form-control" id="studClassName" placeholder="Enter Course namee here" value={studClassName} onChange={(e) => setStudClassName(e.target.value)} />
                            </div>

                            <label className="control-label col-sm-3" htmlFor="studRollNo">Roll No:</label>
                            <div className="col-sm-3">
                                <input type="text" className="form-control" id="studRollNo" placeholder="Enter Course namee here" value={studRollNo} onChange={(e) => setStudRollNo(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <hr></hr>

                            <button type="submit" className="col-sm-offset-7 btn btn-success" onClick={(e) => saveStudentPassMastertDetails(e)} > Submit</button>
                            <button type="button" className="col-sm-offset-1 btn btn-danger" onClick={() => navigate(`/studentpass`, { replace: true })}>Back</button>
                            
                        </div>


                    </form>
                </div>
                <div className="col-md-2"></div>

            </div>








        </React.Fragment>
    );
}