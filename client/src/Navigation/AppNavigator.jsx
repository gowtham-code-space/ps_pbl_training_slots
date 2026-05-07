import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout.jsx';
import SlotPage from '../pages/SlotPage.jsx';

function AppNavigator() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/slot" replace />} />

                <Route
                    path="/slot"
                    element={
                        <MainLayout>
                            <SlotPage />
                        </MainLayout>
                    }
                />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/slot" replace />} />
            </Routes>
        </Router>
    );
}

export default AppNavigator;
