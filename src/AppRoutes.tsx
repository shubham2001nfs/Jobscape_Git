import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

import HomePage from './Pages/HomePage';
import FindJobs from './Pages/FindJobs';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import FindTalent from './Pages/FindTalent';
import PostJobPage from './Pages/PostJobPage';
import JobDescPage from './Pages/JobDescPage';
import ApplyJob from './Pages/ApplyJob';
import CompanyPage from './Pages/CompanyPage';
import PostedJobPage from './Pages/PostedJobPage';
import JobHistoryPage from './Pages/JobHistoryPage';
import SignUpPage from './Pages/SignUpPage';
import Profile from './Header/Profile';
import TalentProfile from './FindTalent/TalentProfile';
import ProtectedRoute from './Services/ProtectedRoute';
import PublicRoute from './Services/PublicRoute';
import Unauthorize from './Pages/Unauthorize';

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

const AppRoutesContent = () => {
    const user = useSelector((state: any) => state.user);
    const location = useLocation();

    // Correctly identify when we're on an auth page
    const isAuthPage =
        location.pathname === '/' ||
        location.pathname === '/signup' ||
        location.pathname === '/login';

    return (
        <div className='relative'>
            {!isAuthPage && <Header />}
            <Routes>
                <Route path='/' element={<SignUpPage />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/find-jobs' element={
                    <ProtectedRoute allowedRoles={["APPLICANT"]}>
                        <FindJobs />
                    </ProtectedRoute>
                } />
                <Route path='/find-talent' element={
                    <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                        <FindTalent />
                    </ProtectedRoute>
                } />
                <Route path='/jobs/:id' element={<JobDescPage />} />
                <Route path='/apply-job/:id' element={<ApplyJob />} />
                <Route path='/company/:name' element={<CompanyPage />} />
                <Route path='/post-job/:id' element={
                    <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                        <PostJobPage />
                    </ProtectedRoute>
                } />
                <Route path='/job-history' element={
                    <ProtectedRoute allowedRoles={["APPLICANT"]}>
                        <JobHistoryPage />
                    </ProtectedRoute>
                } />
                <Route path='/posted-job/:id' element={
                    <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                        <PostedJobPage />
                    </ProtectedRoute>
                } />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/login' element={<SignUpPage />} />
                <Route path='/unauthorized' element={<Unauthorize />} />
                <Route path='/talent-profile/:id' element={<TalentProfile />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
            {!isAuthPage && <Footer />}
        </div>
    );
}

const AppRoutes = () => (
    <BrowserRouter>
        <AppRoutesContent />
    </BrowserRouter>
);

export default AppRoutes;
