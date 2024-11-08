import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HospitalRegister from './pages/HospitalRegistration';
import ScreeningQuotidien from './pages/screening_quotidien';
import Statistics from './pages/Statistics';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hospital_register" element={<HospitalRegister />} />
            <Route path="/screening_quotidien" element={<ScreeningQuotidien />} />
            <Route path="/statistics" element={<Statistics />} />
        </Routes>
    );
}

export default App;
