import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/OSS_2.png';
import text from '../assets/images/Text.png';
import './Navbar.css';

const Navbar = () => {
    return (
        <div id="Global">
            <div className="logo-section">
                <img src={img} alt="Logo" className="logo-image" />

                <img src={text} alt="Text" className="text-image" />
            </div>

            <div className="nav-links">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Link to="/" className="nav-link">Home</Link>
                            </td>
                            <td>
                                <a href="http://www.srlf.org/Data/ModuleGestionDeContenu/PagesGenerees/Biblioth%C3%A8que%20-%20R%C3%A9f%C3%A9rentiels/R%C3%A9f%C3%A9rentiels/Recommandations/autres/632.asp" target="_blank" rel="noopener noreferrer" className="nav-link">
                                    SRLF Grippe
                                </a>
                            </td>
                            <td>
                                <a href="http://www.sfar.org/t/spip.php?article454" target="_blank" rel="noopener noreferrer" className="nav-link">
                                    SFAR Grippe
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Navbar;
