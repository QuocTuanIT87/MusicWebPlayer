import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
    return (
        <Router>
            <div className="App">
                <DefaultLayout>
                    <Routes>
                        <>
                            <Route path="/" element={<HomePage />} />
                        </>
                    </Routes>
                </DefaultLayout>
            </div>
        </Router>
    );
}

export default App;
