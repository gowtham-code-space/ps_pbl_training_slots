import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.jsx';
import { silentRefresh } from '../services/core/session.js';


//login
import Login from "../pages/Auth/Login.jsx"

//student
import StudentDashboard from '../pages/Student/StudentDashboard.jsx';
import PointsDashboard from '../pages/Student/PointsDashboard.jsx';
import MCQAssessment from '../pages/Student/McqAssessment.jsx';
import Compiler from "../pages/Student/Compiler.jsx";
import StudentFeedback from '../pages/Student/StudentFeedback .jsx';
import TrainingSlots from '../pages/Student/TrainingSlots.jsx';

//admin
import AdminDashboard from "../pages/Admin/AdminDashboard.jsx";
import Approvals from '../pages/Admin/Approvals.jsx';
import FacultyAllocation from '../pages/Admin/FacultyAllocation.jsx';
import {Reports ,Settings ,Notifications} from "../pages/Admin/OtherPages.jsx";
import {PBLSlots , PSSlots} from "../pages/Admin/Slots.jsx";
import Students from "../pages/Admin/Students.jsx"
import VenueAllocation from '../pages/Admin/VenueAllocation.jsx';

function useBootstrapAuth() {
    const accessToken = useAuthStore((s) => s.accessToken);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                if (!accessToken) {
                    await silentRefresh();
                }
            } finally {
                if (alive) setReady(true);
            }
        })();

        return () => {
            alive = false;
        };
    }, []);

    return { ready };
}

function HomeRedirect() {
    const user = useAuthStore((s) => s.user);
    const accessToken = useAuthStore((s) => s.accessToken);

    if (!accessToken || !user) return <Navigate to="/auth/login" replace />;

    const roleId = Number(user.role_id);
    if (roleId === 3) {
        return <Navigate to="/admin-dashboard" replace />;
    }
    if (roleId === 1) {
        return <Navigate to="/student-dashboard" replace />;
    }

    if (roleId === 2) {
        return <Navigate to="/admin-dashboard" replace />;
    }

    return <Navigate to="/auth/login" replace />;
}

function RequireAuth({ children }) {
    const user = useAuthStore((s) => s.user);
    const accessToken = useAuthStore((s) => s.accessToken);
    if (!accessToken || !user) return <Navigate to="/auth/login" replace />;
    return children;
}

function AppNavigator() {
    const { ready } = useBootstrapAuth();
    const user = useAuthStore((s) => s.user);
    const accessToken = useAuthStore((s) => s.accessToken);

    if (!ready) return null;

    return (
        <Router basename="/slot-matrix">
            <Routes>
                <Route path="/" element={<HomeRedirect />} />
                <Route path="/auth/login" element={<Login/>}/>

                {/* Routes are registered by role_id after auth */}
                {Number(user?.role_id) === 1 && (
                    <>
                    
                        <Route path="/student-dashboard" element={<RequireAuth><StudentDashboard/></RequireAuth>} />
                        <Route path="/points-page" element={<RequireAuth><PointsDashboard/></RequireAuth>} />
                        <Route path="/training-slots" element={<RequireAuth><TrainingSlots/></RequireAuth>} />
                        <Route path="/assessment/mcq" element={<RequireAuth><MCQAssessment/></RequireAuth>} />
                        <Route path="/assessment/compiler" element={<RequireAuth><Compiler/></RequireAuth>} />
                        <Route path="/assessment/Student-feedback" element={<RequireAuth><StudentFeedback/></RequireAuth>} />
                    </>
                )}

                {(Number(user?.role_id) === 3 || Number(user?.role_id) === 2) && (
                    <>
                        <Route path="/admin-dashboard" element={<RequireAuth><AdminDashboard/></RequireAuth>} />
                        <Route path="/approvals" element={<RequireAuth><Approvals/></RequireAuth>} />
                        <Route path="/faculty-allocation" element={<RequireAuth><FacultyAllocation/></RequireAuth>} />
                        <Route path="/reports" element={<RequireAuth><Reports/></RequireAuth>} />
                        <Route path="/settings" element={<RequireAuth><Settings/></RequireAuth>} />
                        <Route path="/notification" element={<RequireAuth><Notifications/></RequireAuth>} />
                        <Route path="/ps-slot-management" element={<RequireAuth><PSSlots/></RequireAuth>} />
                        <Route path="/pbl-slot-management" element={<RequireAuth><PBLSlots/></RequireAuth>} />
                        <Route path="/view-students" element={<RequireAuth><Students/></RequireAuth>} />
                        <Route path="/venue-allocation" element={<RequireAuth><VenueAllocation/></RequireAuth>} />
                    </>
                )}

                <Route path="/not-found" element={<h1>404 file not found</h1>}/>
                <Route
                    path="*"
                    element={
                        accessToken && user ? (
                            <Navigate to="/" replace />
                        ) : (
                            <Navigate to="/not-found" replace />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default AppNavigator;
