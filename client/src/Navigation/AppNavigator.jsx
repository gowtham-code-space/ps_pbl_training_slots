import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout.jsx';


//login
import Login from "../pages/Auth/Login.jsx"

//student
import PointsDashboard from '../pages/Student/PointsDashboard.jsx';
import MCQAssessment from '../pages/Student/McqAssessment.jsx';
import Compiler from "../pages/Student/Compiler.jsx";
import StudentFeedback from '../pages/Student/StudentFeedback .jsx';

//admin
import AdminDashboard from "../pages/Admin/AdminDashboard.jsx";
import Approvals from '../pages/Admin/Approvals.jsx';
import FacultyAllocation from '../pages/Admin/FacultyAllocation.jsx';
import {Reports ,Settings ,Notifications} from "../pages/Admin/OtherPages.jsx";
import {PBLSlots , PSSlots} from "../pages/Admin/Slots.jsx";
import Students from "../pages/Admin/Students.jsx"
import VenueAllocation from '../pages/Admin/VenueAllocation.jsx';

function AppNavigator() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/auth/login" replace />} />
                <Route path="/auth/login" element={<Login/>}/>

                <Route path="/points-dashboard" element={<PointsDashboard/>}/>
                <Route path="/assessment/mcq" element={<MCQAssessment/>}/>
                <Route path="/assessment/compiler" element={<Compiler/>}/>
                <Route path="/assessment/Student-feedback" element={<StudentFeedback/>}/>

                <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
                <Route path="/approvals" element={<Approvals/>}/>
                <Route path="/faculty-allocation" element={<FacultyAllocation/>}/>
                <Route path="/reports" element={<Reports/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/notification" element={<Notifications/>}/>
                <Route path="/ps-slot-management" element={<PSSlots/>}/>
                <Route path="/pbl-slot-management" element={<PBLSlots/>}/>
                <Route path="/view-students" element={<Students/>}/>
                <Route path="/venue-allocation" element={<VenueAllocation/>}/>

                <Route path="/not-found" element={<h1>404 file not found</h1>}/>
                <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Routes>
        </Router>
    );
}

export default AppNavigator;
