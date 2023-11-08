import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import DefaultLayout from './layouts/DefaultLayout';
import ProfilePage from './pages/ProfilePage';

function App() {
    return (
        <Router>
            <div className="App">
                <DefaultLayout>
                    <Routes>
                        <>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/upload" element={<UploadPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                        </>
                    </Routes>
                </DefaultLayout>
            </div>
        </Router>
    );
}

export default App;
