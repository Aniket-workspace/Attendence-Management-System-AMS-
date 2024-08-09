import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import AdminPanelIndex from '../AdminPanelComponent/AdminPanelIndex';
import StudentPanelIndex from '../StudentPanelComponent/StudentPanelIndex';
import AttendanceComponent from '../AdminPanelComponent/AttendanceComponent';
import UpdateNewStudentData from '../AdminPanelComponent/UpdateNewStudentData';
import UpdateBatchStudentData from '../AdminPanelComponent/UpdateBatchStudentData';  //Shivanjali Changes
import StudentDataTable from '../AdminPanelComponent/StudentDataTable';
import ShowStudentAttendance from '../AdminPanelComponent/ShowStudentAttendance';
import ShowBatchAttendance from '../AdminPanelComponent/ShowBatchAttendance';
import StudentReport from '../AdminPanelComponent/StudentReport';
import BatchReport from '../Report/BatchReport';

function LoginIndex() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminPanelIndex />} />
        <Route path="/student" element={<StudentPanelIndex />} />
        <Route path="/AttendanceComponent" element={<AttendanceComponent/>}/>
        <Route path="/UpdateNewStudentData" element={<UpdateNewStudentData/>}/>
         <Route path="/UpdateBatchStudentData" element={<UpdateBatchStudentData/>}/>  {/*Shivanjali Chanages */}
        <Route path="/StudentDataTable" element={<StudentDataTable/>}/>
        <Route path="/ShowStudentAttendance" element={<ShowStudentAttendance/>}/>
        <Route path="/ShowBatchAttendance" element={<ShowBatchAttendance/>}/>
        <Route path="/StudentReport" element={<StudentReport/>}/>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default LoginIndex;
