import { useState } from "react";
import './screening_quotidien.css';

function ScreeningQuotidien() {
    // Placeholder data instead of reading from the database
    const placeholderHospitalData = {
        hospitalName: "Hôpital Saint-Jean",
        screeningDate: "2024-10-17",
        openICUBeds: 10,
        openUSCBeds: 5,
        fluConfirmedPatientsRefused: 3,
        nonFluPatientsRefused: 2,
        lackOfEquipmentRefused: 1,
        geoIsolationRefused: 0,
    };

    const [hospitalName] = useState<string>(placeholderHospitalData.hospitalName);
    const [screeningDate] = useState<string>(placeholderHospitalData.screeningDate);
    const [openICUBeds, setOpenICUBeds] = useState<number>(placeholderHospitalData.openICUBeds);
    const [openUSCBeds, setOpenUSCBeds] = useState<number>(placeholderHospitalData.openUSCBeds);
    const [fluConfirmedPatientsRefused, setFluConfirmedPatientsRefused] = useState<number>(placeholderHospitalData.fluConfirmedPatientsRefused);
    const [nonFluPatientsRefused, setNonFluPatientsRefused] = useState<number>(placeholderHospitalData.nonFluPatientsRefused);
    const [lackOfEquipmentRefused, setLackOfEquipmentRefused] = useState<number>(placeholderHospitalData.lackOfEquipmentRefused);
    const [geoIsolationRefused, setGeoIsolationRefused] = useState<number>(placeholderHospitalData.geoIsolationRefused);

    const [currentWeek, setCurrentWeek] = useState<number>(1);

    const weeks = Array.from({ length: 52 }, (_, i) => i + 1);

    const handlePreviousWeek = () => {
        if (currentWeek > 1) setCurrentWeek(currentWeek - 1);
    };

    const handleNextWeek = () => {
        if (currentWeek < weeks.length) setCurrentWeek(currentWeek + 1);
    };

    return (
        <div className="screening-container">
            <div className="header">
                <h1>Screening quotidien des malades présents et non admis</h1>
                <p>
                    La screening des malades a pour but de repérer les malades
                    positifs et réaliser leur transfert vers les secteurs d’isolement.
                </p>
                <p className="hospital-info">
                    <b>Tableau reçu de l’hôpital:</b> {hospitalName}<br />
                    <b>Semaines:</b> du {screeningDate}
                </p>
            </div>

            <div className="form-section">
                <h2>Modifier le nombre de lits ouverts en réanimation</h2>

                <div className="form-group">
                    <label>Nombre de lits "réanimation" ouverts:</label>
                    <input
                        type="number"
                        value={openICUBeds}
                        onChange={(e) => setOpenICUBeds(parseInt(e.target.value))}
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label>Nombre de lits USC et/ou USI et/ou SSPI ouverts:</label>
                    <input
                        type="number"
                        value={openUSCBeds}
                        onChange={(e) => setOpenUSCBeds(parseInt(e.target.value))}
                        className="input-field"
                    />
                </div>

                <div className="red-text">
                    Screening des malades refusés semaine 44 du <b>26/10/2024 au 01/11/2024</b>
                </div>

                <div className="form-group">
                    <label>
                        Nombre de malades grippés confirmés ou fortement suspects refusés la semaine 44:
                    </label>
                    <input
                        type="number"
                        value={fluConfirmedPatientsRefused}
                        onChange={(e) => setFluConfirmedPatientsRefused(parseInt(e.target.value))}
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label>
                        Nombre de malades non grippés ou peu suspects refusés la semaine 44:
                    </label>
                    <input
                        type="number"
                        value={nonFluPatientsRefused}
                        onChange={(e) => setNonFluPatientsRefused(parseInt(e.target.value))}
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label>
                        Certains malades ont-ils été refusés alors qu'une chambre était disponible
                        à cause d'un manque de matériel ?:
                    </label>
                    <input
                        type="number"
                        value={lackOfEquipmentRefused}
                        onChange={(e) => setLackOfEquipmentRefused(parseInt(e.target.value))}
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label>
                        Certaines malades ont-ils été refusés en raison d'une impossibilité d'isolement
                        géographique ?:
                    </label>
                    <input
                        type="number"
                        value={geoIsolationRefused}
                        onChange={(e) => setGeoIsolationRefused(parseInt(e.target.value))}
                        className="input-field"
                    />
                </div>

                <button className="submit-button">Enregistrer</button>
            </div>

            {/* Navigation for week switching */}
            <div className="week-navigation">
                <button className="week-nav-button" onClick={handlePreviousWeek}>Semaine précédente</button>
                <span className="current-week">Semaine {currentWeek}</span>
                <button className="week-nav-button" onClick={handleNextWeek}>Semaine suivante</button>
            </div>

            {/* Displaying the board for the selected week */}
            <div className="board-section">
                <table className="week-table">
                    <thead>
                        <tr>
                            <th>Lundi</th>
                            <th>Mardi</th>
                            <th>Mercredi</th>
                            <th>Jeudi</th>
                            <th>Vendredi</th>
                            <th>Samedi</th>
                            <th>Dimanche</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ScreeningQuotidien;
