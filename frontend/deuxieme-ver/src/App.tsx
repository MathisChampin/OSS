import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import HospitalRegister from './pages/HospitalRegistration';
import ScreeningQuotidien from './pages/screening_quotidien';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout><Login /></Layout>} />
            <Route path="/register" element={<Layout><Register /></Layout>} />
            <Route path="/hospital_register" element={<Layout><HospitalRegister /></Layout>} />
            <Route path="/screening_quotidien" element={<Layout><ScreeningQuotidien /></Layout>} />
        </Routes>
    );
}

export default App;
