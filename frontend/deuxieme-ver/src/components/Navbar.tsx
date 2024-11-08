import { Link } from 'react-router-dom';
import img from '../assets/images/OSS_2.png';
import text from '../assets/images/Text.png';
import './Navbar.css';
import { FaHome, FaChartBar } from 'react-icons/fa';

const Navbar = () => {
    return (
        <div id="Global">
            <div className="logo-section">
                <img src={img} alt="Logo" className="logo-image" />
                <img src={text} alt="Text" className="text-image" />
            </div>

            <div className="text">
                <p>Pandémie de grippe H1N1</p>
            </div>

            <div className="nav-links">
                <Link to="/" className="nav-link"><FaHome /> Accueil</Link>
                <Link to="/screening_quotidien" className="nav-link"><FaChartBar /> Screening</Link>
                <Link to="/statistics" className="nav-link">Statistiques</Link>
            </div>
        </div>
    );
};

export default Navbar;
