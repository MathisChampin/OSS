import './Footer.css';
import logo from '../assets/images/OSS_2.png';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-logo-section">
                <img src={logo} alt="Logo" className="footer-logo" />
            </div>
            <div className="footer-content">
                <button className="footer-button">Button 1</button>
                <button className="footer-button">Button 2</button>
                <button className="footer-button">Button 3</button>
                <button className="footer-button">Button 4</button>
            </div>
        </div>
    );
};

export default Footer;
