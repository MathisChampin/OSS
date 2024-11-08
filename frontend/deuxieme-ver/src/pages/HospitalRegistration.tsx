import { useState } from "react";
import { postHospital, postPersonelMdeical, postPnoMedical, postMaterial } from "../api/hospital.requests";
import "./style.css";
import { Activity, HospitalDataType } from "../utils/hospital.d";

function HospitalRegister() {
    const [hospitalData, setHospitalData] = useState<HospitalDataType>({
        NomHospital: "",
        ville: "",
        Departement: "",
        IdentiteHopital: "",
        ReanimationMedical: "",
        ReanimationChirurgical: "",
        Activite: Activity.ADULT,
        Active: "",
        NbDoctorUniv: 0,
        NbDoctorHosp: 0,
        NbInternal: 0,
        NbDoctor: 0,
        NbPersonalAbs: 0,
        NbIdeDay: 0,
        NbIdeNight: 0,
        NbIdeDayUsc: 0,
        NbIdeNightUsc: 0,
        NbAsDay: 0,
        NbAsNight: 0,
        NbAsDayUsc: 0,
        NbAsNightUsc: 0,
        NbExecDay: 0,
        NbIdeSick: 0,
        NbAsSick: 0,
        NbAppIde: 0,
        NbAppAs: 0,
        material: {
            nbBedRea: 0,
            nbBedInRoom: 0,
            nbBedMntr: 0,
            nbAdmis: 0,
            nbPersonalAbs: 0,
            ecmo: false,
            ventilators: {
                evita2: 0,
                evitaIV: 0,
                evitaXL: 0,
                savina: 0,
                evitaDura: 0,
                npb7200: 0,
                galileo: 0,
                G5: 0,
                servoI: 0,
                servo900: 0,
                bird8400: 0,
                tBird: 0,
                vela: 0,
                npb740760: 0,
                servo300: 0,
                extend: 0,
                horus: 0,
                elisee: 0,
                vision: 0,
                V500: 0,
                avea: 0,
                engstrom: 0,
            },
            devices: [],
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const resHospital = await postHospital({
                NomHospital: hospitalData.NomHospital,
                ville: hospitalData.ville,
                Departement: hospitalData.Departement,
                IdentiteHopital: hospitalData.IdentiteHopital,
                ReanimationMedical: hospitalData.ReanimationMedical,
                ReanimationChirurgical: hospitalData.ReanimationChirurgical,
                Activite: hospitalData.Activite,
            });

            const resPmedical = await postPersonelMdeical({
                NbDoctorUniv: hospitalData.NbDoctorUniv,
                NbDoctorHosp: hospitalData.NbDoctorHosp,
                NbInternal: hospitalData.NbInternal,
                NbDoctor: hospitalData.NbDoctor,
                NbPersonalAbs: hospitalData.NbPersonalAbs,
            });

            const resPnoMedical = await postPnoMedical({
                NbIdeDay: hospitalData.NbIdeDay,
                NbIdeNight: hospitalData.NbIdeNight,
                NbIdeDayUsc: hospitalData.NbIdeDayUsc,
                NbIdeNightUsc: hospitalData.NbIdeNightUsc,
                NbAsDay: hospitalData.NbAsDay,
                NbAsNight: hospitalData.NbAsNight,
                NbAsDayUsc: hospitalData.NbAsDayUsc,
                NbAsNightUsc: hospitalData.NbAsNightUsc,
                NbExecDay: hospitalData.NbExecDay,
                NbIdeSick: hospitalData.NbIdeSick,
                NbAsSick: hospitalData.NbAsSick,
                NbAppIde: hospitalData.NbAppIde,
                NbAppAs: hospitalData.NbAppAs,
            });

            const resMaterial = await postMaterial({
                nbBedRea: hospitalData.material.nbBedRea,
                nbBedInRoom: hospitalData.material.nbBedInRoom,
                nbBedMntr: hospitalData.material.nbBedMntr,
                nbAdmis: hospitalData.material.nbAdmis,
                nbPersonalAbs: hospitalData.material.nbPersonalAbs,
                ecmo: hospitalData.material.ecmo,
                ventilators: hospitalData.material.ventilators,
                devices: hospitalData.material.devices,
            });
            
            if (resHospital.status === 200 && resPmedical.status === 200 && resPnoMedical.status === 200 && resMaterial.status === 200) {
                alert("Hospital registered successfully!");
            }
        } catch (error) {
            alert("Internal Server Error");
            console.error(error);
        }
    };

    return (
        <div id="Global">
            <div className="blue-box-title">Enregistrez votre service</div>
            <form onSubmit={handleSubmit}>
                <table cellPadding="5" cellSpacing="0" style={{ width: "100%", margin: "0 auto" }}>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <div className="yellow-background">
                                    <div className="note">
                                        Si vous &ecirc;tes impliqu&eacute; dans le suivi de ce registre veuillez renseigner les champs suivants&nbsp;
                                        qui vous donneront acc&egrave;s &agrave; la fiche d'enregistrement des donn&eacute;es gr&acirc;ce &agrave; un code confidentiel.
                                        <br />
                                        Pour un m&ecirc;me service plusieurs codes correspondant &agrave; plusieurs identit&eacute;s peuvent &ecirc;tre d&eacute;livr&eacute;s.
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className="blue-box-sub">Description du service</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className="blue-box-sub">Personnel médical affecté (Octobre 2009)</div>
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre moyen de médecins Universitaires<br />(CCA,PHU,MCUPH,PUPH) présents dans le service:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbDoctorUniv}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbDoctorUniv: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre moyen de médecins hospitaliers, non Universitaires, présents dans le service:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbDoctorHosp}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbDoctorHosp: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre d'internes ou faisant fonction d'internes présents dans le service:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbInternal}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbInternal: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre de médecins (internes et/ou seniors) présents pendant la garde:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbDoctor}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbDoctor: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre de personnels médicaux absents 1 journée (ou plus) en raison de la grippe:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbPersonalAbs}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbPersonalAbs: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="blue-box-sub">Personnel non médical affecté</div>
                <div className="yellow-background">
                    <div className="note">
                        Entrez le nombre moyen d'IDE/AS présents la journée<br />
                        (indépendamment de l'organisation en 3x8 et 2x12 heures)
                    </div>
                </div>

                <table cellPadding="5" cellSpacing="0" style={{ width: "100%", margin: "0 auto" }}>
                    <tbody>
                        <tr>
                            <td>Nombre moyen d'IDE présents la journée en réanimation:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbIdeDay}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbIdeDay: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre moyen d'IDE présents la journée en USC et/ou USI:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbIdeNight}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbIdeNight: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre moyen d'IDE présents la nuit en réanimation:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbAsDay}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbAsDay: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre moyen d'IDE présents la nuit en USC et/ou USI:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbAsDay}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbAsDay: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre moyen d'AS présents la journée en réanimation:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbAsDay}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbAsDay: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre moyen d'AS présents la journée en USC et/ou USI:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbAsDay}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbAsDay: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre moyen d'AS présents la nuit en réanimation:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbAsDay}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbAsDay: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre moyen d'AS présents la nuit en USC et/ou USI:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbAsDay}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbAsDay: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre de cadres ou faisant fonction présents la journée:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbAsDay}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbAsDay: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre d'arrêts maladie total en cours pour les IDE:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbAsDay}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbAsDay: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre d'arrêts maladie total en cours pour les AS:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbAsDay}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbAsDay: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre approximatif d'IDE en renfort:<br />(Travaillant habituellement dans un autre service)<br /></td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbAsDay}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbAsDay: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre approximatif d'AS en renfort:<br />(Travaillant habituellement dans un autre service)<br /></td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.NbAsDay}
                                    onChange={(e) => setHospitalData({ ...hospitalData, NbAsDay: parseInt(e.target.value) })}
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="blue-box-sub">Matériel</div>

                <table cellPadding="5" cellSpacing="0" style={{ width: "100%", margin: "0 auto" }}>
                    <tbody>
                        <tr>
                            <td>Nombre de lits de r&eacute;animation ouverts à ce jour:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.nbBedRea}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, nbBedRea: parseInt(e.target.value) } })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td height="25" colSpan={5}>
                                <div style={{ textAlign: "left" }}>
                                    Combien de ces lits de r&eacute;animation sont
                                    dans des chambres &agrave; :
                                </div>
                                <div style={{ textAlign: "left" }}></div>
                            </td>
                        </tr>
                        <div className="form-row">
                            <div className="form-column">
                                <label>1 lit:</label>
                                <input
                                    type="number"
                                    className="inputField"
                                    value={hospitalData.material.nbBedInRoom}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, nbBedInRoom: parseInt(e.target.value) } })}
                                    required
                                />
                            </div>
                            <div className="form-column">
                                <label>2 lits:</label>
                                <input
                                    type="number"
                                    className="inputField"
                                    value={hospitalData.material.nbBedInRoom}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, nbBedInRoom: parseInt(e.target.value) } })}
                                    required
                                />
                            </div>
                            <div className="form-column">
                                <label>Plus de 2 lits:</label>
                                <input
                                    type="number"
                                    className="inputField"
                                    value={hospitalData.material.nbBedInRoom}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, nbBedInRoom: parseInt(e.target.value) } })}
                                    required
                                />
                            </div>
                        </div>
                        <tr>
                            <td>Nombre de lits de surveillance continue ouverts à ce jour:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.nbBedMntr}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, nbBedMntr: parseInt(e.target.value) } })}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td height="25" colSpan={5}>
                                <div style={{ textAlign: "left" }}>
                                    Combien de ces lits de surveillance sont
                                    dans des chambres &agrave; :
                                </div>
                                <div style={{ textAlign: "left" }}></div>
                            </td>
                        </tr>
                        <div className="form-row">
                            <div className="form-column">
                                <label>1 lit:</label>
                                <input
                                    type="number"
                                    className="inputField"
                                    value={hospitalData.material.nbBedInRoom}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, nbBedInRoom: parseInt(e.target.value) } })}
                                    required
                                />
                            </div>
                            <div className="form-column">
                                <label>2 lits:</label>
                                <input
                                    type="number"
                                    className="inputField"
                                    value={hospitalData.material.nbBedInRoom}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, nbBedInRoom: parseInt(e.target.value) } })}
                                    required
                                />
                            </div>
                            <div className="form-column">
                                <label>Plus de 2 lits:</label>
                                <input
                                    type="number"
                                    className="inputField"
                                    value={hospitalData.material.nbBedInRoom}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, nbBedInRoom: parseInt(e.target.value) } })}
                                    required
                                />
                            </div>
                        </div>
                        <tr>
                            <td>Nombre approximatif d'admissions par an:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.nbAdmis}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, nbAdmis: parseInt(e.target.value) } })}
                                    required
                                />
                            </td>
                        </tr>

                        {/* Ventilators Section */}
                        <div className="form-row">
                            <div className="form-column">
                                <label>Evita 2 <br />(Drager):</label>
                                <input
                                    type="number"
                                    className="inputField"
                                    value={hospitalData.material.ventilators.evita2}
                                    onChange={(e) => setHospitalData({
                                        ...hospitalData,
                                        material: {
                                            ...hospitalData.material,
                                            ventilators: {
                                                ...hospitalData.material.ventilators,
                                                evita2: parseInt(e.target.value)
                                            }
                                        }
                                    })}
                                    required
                                />
                            </div>
                            <div className="form-column">
                                <label>Evita IV <br />(Drager):</label>
                                <input
                                    type="number"
                                    className="inputField"
                                    value={hospitalData.material.ventilators.evitaIV}
                                    onChange={(e) => setHospitalData({
                                        ...hospitalData,
                                        material: {
                                            ...hospitalData.material,
                                            ventilators: {
                                                ...hospitalData.material.ventilators,
                                                evitaIV: parseInt(e.target.value)
                                            }
                                        }
                                    })}
                                    required
                                />
                            </div>
                            <div className="form-column">
                                <label>Evita XL <br />(Drager):</label>
                                <input
                                    type="number"
                                    className="inputField"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({
                                        ...hospitalData,
                                        material: {
                                            ...hospitalData.material,
                                            ventilators: {
                                                ...hospitalData.material.ventilators,
                                                evitaXL: parseInt(e.target.value)
                                            }
                                        }
                                    })}
                                    required
                                />
                            </div>
                        </div>
                        <tr>
                            <td>SAVINA <br />(Drager):</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Evita 2 DURA <br />(Drager):</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>7200 (NPB):</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Galiléo<br />(Hamilton):</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>G5<br />(Hamilton):</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Servo 1<br />(Maquet):</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Servo 900<br />(Siemens):</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Bird 8400:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>T Bird:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>840<br />(Codivien):</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Vela:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>740-760 (NPB):</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Servo 300 (Siemens):</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Extend<br />(Taema):</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Horus<br />(Taema):</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Elisée (Saime<br />Resmed):</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Vision<br />(Respironics) ou V60:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>V500<br />(Drager):</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Avea (Viasys):</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Engstrom Carestation<br />(GE):</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Autre:</td>
                            <td>
                                <input
                                    type="number"
                                    value={hospitalData.material.ventilators.evitaXL}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ventilators: { ...hospitalData.material.ventilators, evitaXL: parseInt(e.target.value) } } })}
                                />
                            </td>
                        </tr>

                    </tbody>
                </table>

                <table cellPadding="5" cellSpacing="0" style={{ width: "100%", margin: "0 auto" }}>
                    <tbody>
                        <tr>
                            <td>Un accès à l'ECMO est-il possible?</td>
                            <td>
                                <select
                                    value={hospitalData.material.ecmo ? "Oui" : "Non"}
                                    onChange={(e) => setHospitalData({ ...hospitalData, material: { ...hospitalData.material, ecmo: e.target.value === "Oui" } })}
                                    required
                                >
                                    <option value="Non">Non</option>
                                    <option value="Oui">Oui</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="note">
                    Pour tout problème ou renseignement, vous pouvez nous contacter par mail.
                </div>

                <table cellPadding="5" cellSpacing="0" style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
                    <tbody>
                        <tr>
                            <td>
                                <button type="submit" className="submit-button">Valider</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default HospitalRegister;
