import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/head.jpg'

const Navbar = () => {
    return (
        <div id="Global" className="flex justify-center w-full">
            <table className="w-full border-0 m-auto">
                <tr>
                    <td colSpan={4}>
                        <img src={img} className="w-full max-w-full h-auto" alt="Header" style={{ height: '100px' }} />
                    </td>
                </tr>
                <tr className="bg-blue-900 text-center text-white">
                    <td className="py-1">
                        <div>
                            <Link to="/" className="text-white no-underline">Home</Link>
                        </div>
                    </td>
                    <td>
                        <div>
                            <a href="http://www.srlf.org/Data/ModuleGestionDeContenu/PagesGenerees/Biblioth%C3%A8que%20-%20R%C3%A9f%C3%A9rentiels/R%C3%A9f%C3%A9rentiels/Recommandations/autres/632.asp" target="_blank" className="text-white no-underline">SRLF Grippe</a>
                        </div>
                    </td>
                    <td>
                        <div>
                            <a href="http://www.sfar.org/t/spip.php?article454" target="_blank" className="text-white no-underline">SFAR Grippe</a>
                        </div>
                    </td>
                    <td>&nbsp;</td>
                </tr>
            </table>
        </div>
    );
};

export default Navbar;