import { useState } from "react";
import { postHospital, postPersonelMdeical, postPnoMedical, postMaterial } from "../api/hospital.requests";
import "./style.css"; // Keep your existing styles

function HospitalRegister() {
  const [hospitalData, setHospitalData] = useState({
    NomHospital: "",
    ville: "",
    Departement: "",
    IdentiteHopital: "",
    ReanimationMedical: "",
    ReanimationChirurgical: "",
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
    },
    devices: [{ quantity: 0, name: "" }],
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
        material: {
          nbBedRea: hospitalData.material.nbBedRea,
          nbBedInRoom: hospitalData.material.nbBedInRoom,
          nbBedMntr: hospitalData.material.nbBedMntr,
          nbAdmis: hospitalData.material.nbAdmis,
          nbPersonalAbs: hospitalData.material.nbPersonalAbs,
          ecmo: hospitalData.material.ecmo,
        },
        devices: hospitalData.devices,
      });

      if (resHospital.status === 200 && resPmedical.status === 200 && resPnoMedical.status === 200 && resMaterial.status === 200) {
        alert("Hospital registered successfully!");
      }
    } catch (error) {
      alert("Internal Server Error");
      throw new Error(error);
    }
  };

  return (
    <div id="Global">
      <table width={800} border={0} align="center" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td valign="top">
              <div style={{ textAlign: "center" }}>
                <form name="form1" onSubmit={handleSubmit}>
                  <table
                    width="603"
                    border={0}
                    align="center"
                    cellPadding={0}
                    cellSpacing={3}
                    id="tableForm"
                  >
                    <tbody>
                      <tr>
                        <td height="25" colSpan={7}>
                          <div style={{ textAlign: "center" }}>
                            <span className="titre_blanc18">Enregistrez votre hôpital</span>
                          </div>
                        </td>
                      </tr>

                      {/* Hospital Information */}
                      <tr>
                        <td colSpan={6}>
                          <table width="100%" border={0} cellSpacing={3} cellPadding={0}>
                            <tbody>
                              <tr style={{ backgroundColor: "#91ABE3" }}>
                                <td colSpan={6}>
                                  <div style={{ textAlign: "center" }}>
                                    <span className="titre_blanc16">Informations sur l'hôpital</span>
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>Nom de l'hôpital :</td>
                                <td colSpan={5}>
                                  <input
                                    type="text"
                                    size={30}
                                    onChange={(e) =>
                                      setHospitalData({
                                        ...hospitalData,
                                        NomHospital: e.target.value,
                                      })
                                    }
                                  />
                                  *
                                </td>
                              </tr>

                              <tr>
                                <td>Ville :</td>
                                <td colSpan={5}>
                                  <input
                                    type="text"
                                    size={30}
                                    onChange={(e) =>
                                      setHospitalData({ ...hospitalData, ville: e.target.value })
                                    }
                                  />
                                  *
                                </td>
                              </tr>

                              <tr>
                                <td>Département :</td>
                                <td colSpan={5}>
                                  <input
                                    type="text"
                                    size={30}
                                    onChange={(e) =>
                                      setHospitalData({
                                        ...hospitalData,
                                        Departement: e.target.value,
                                      })
                                    }
                                  />
                                  *
                                </td>
                              </tr>

                              <tr>
                                <td>Identité Hôpital :</td>
                                <td colSpan={5}>
                                  <select
                                    onChange={(e) =>
                                      setHospitalData({
                                        ...hospitalData,
                                        IdentiteHopital: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="">Sélectionnez</option>
                                    <option value="CHU">CHU</option>
                                    <option value="CHG">CHG</option>
                                    <option value="CH">CH</option>
                                    <option value="PSPH">PSPH</option>
                                    <option value="Priv">Privé</option>
                                  </select>
                                  *
                                </td>
                              </tr>

                              <tr>
                                <td>Réanimation Médicale :</td>
                                <td colSpan={5}>
                                  <select
                                    onChange={(e) =>
                                      setHospitalData({
                                        ...hospitalData,
                                        ReanimationMedical: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="">Sélectionnez</option>
                                    <option value="Non">Non</option>
                                    <option value="Oui">Oui</option>
                                  </select>
                                  *
                                </td>
                              </tr>

                              <tr>
                                <td>Réanimation Chirurgicale :</td>
                                <td colSpan={5}>
                                  <select
                                    onChange={(e) =>
                                      setHospitalData({
                                        ...hospitalData,
                                        ReanimationChirurgical: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="">Sélectionnez</option>
                                    <option value="Non">Non</option>
                                    <option value="Oui">Oui</option>
                                  </select>
                                  *
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          {/* Medical Personnel */}
                          <table width="100%" border={0} cellSpacing={3} cellPadding={0}>
                            <tbody>
                              <tr style={{ backgroundColor: "#91ABE3" }}>
                                <td colSpan={6}>
                                  <div style={{ textAlign: "center" }}>
                                    <span className="titre_blanc16">
                                      Personnel médical (Octobre 2009)
                                    </span>
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>Nombre moyen de médecins universitaires :</td>
                                <td colSpan={5}>
                                  <input
                                    type="text"
                                    size={5}
                                    onChange={(e) =>
                                      setHospitalData({
                                        ...hospitalData,
                                        NbDoctorUniv: parseInt(e.target.value),
                                      })
                                    }
                                  />
                                  *
                                </td>
                              </tr>

                              <tr>
                                <td>Nombre moyen de médecins hospitaliers :</td>
                                <td colSpan={5}>
                                  <input
                                    type="text"
                                    size={5}
                                    onChange={(e) =>
                                      setHospitalData({
                                        ...hospitalData,
                                        NbDoctorHosp: parseInt(e.target.value),
                                      })
                                    }
                                  />
                                  *
                                </td>
                              </tr>

                              <tr>
                                <td>Nombre moyen d'internes :</td>
                                <td colSpan={5}>
                                  <input
                                    type="text"
                                    size={5}
                                    onChange={(e) =>
                                      setHospitalData({
                                        ...hospitalData,
                                        NbInternal: parseInt(e.target.value),
                                      })
                                    }
                                  />
                                  *
                                </td>
                              </tr>

                              <tr>
                                <td>Nombre de médecins présents pendant la garde :</td>
                                <td colSpan={5}>
                                  <input
                                    type="text"
                                    size={5}
                                    onChange={(e) =>
                                      setHospitalData({
                                        ...hospitalData,
                                        NbDoctor: parseInt(e.target.value),
                                      })
                                    }
                                  />
                                  *
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          {/* Non-medical Personnel */}
                          <table width="100%" border={0} cellSpacing={3} cellPadding={0}>
                            <tbody>
                              <tr style={{ backgroundColor: "#91ABE3" }}>
                                <td colSpan={6}>
                                  <div style={{ textAlign: "center" }}>
                                    <span className="titre_blanc16">
                                      Personnel non-médical (Octobre 2009)
                                    </span>
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>Nombre moyen d'IDE présents jour :</td>
                                <td colSpan={5}>
                                  <input
                                    type="text"
                                    size={5}
                                    onChange={(e) =>
                                      setHospitalData({
                                        ...hospitalData,
                                        NbIdeDay: parseInt(e.target.value),
                                      })
                                    }
                                  />
                                  *
                                </td>
                              </tr>

                              <tr>
                                <td>Nombre moyen d'IDE présents nuit :</td>
                                <td colSpan={5}>
                                  <input
                                    type="text"
                                    size={5}
                                    onChange={(e) =>
                                      setHospitalData({
                                        ...hospitalData,
                                        NbIdeNight: parseInt(e.target.value),
                                      })
                                    }
                                  />
                                  *
                                </td>
                              </tr>

                              <tr>
                                <td>Nombre moyen d'AS présents jour :</td>
                                <td colSpan={5}>
                                  <input
                                    type="text"
                                    size={5}
                                    onChange={(e) =>
                                      setHospitalData({
                                        ...hospitalData,
                                        NbAsDay: parseInt(e.target.value),
                                      })
                                    }
                                  />
                                  *
                                </td>
                              </tr>

                              <tr>
                                <td>Nombre moyen d'AS présents nuit :</td>
                                <td colSpan={5}>
                                  <input
                                    type="text"
                                    size={5}
                                    onChange={(e) =>
                                      setHospitalData({
                                        ...hospitalData,
                                        NbAsNight: parseInt(e.target.value),
                                      })
                                    }
                                  />
                                  *
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          {/* Equipment Section */}
                          <table width="100%" border={0} cellSpacing={3} cellPadding={0}>
                            <tbody>
                              <tr style={{ backgroundColor: "#91ABE3" }}>
                                <td colSpan={6}>
                                  <div style={{ textAlign: "center" }}>
                                    <span className="titre_blanc16">Matériel</span>
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>Nombre de lits de réanimation ouverts :</td>
                                <td colSpan={5}>
                                  <input
                                    type="text"
                                    size={5}
                                    onChange={(e) =>
                                      setHospitalData({
                                        ...hospitalData,
                                        material: {
                                          ...hospitalData.material,
                                          nbBedRea: parseInt(e.target.value),
                                        },
                                      })
                                    }
                                  />
                                  *
                                </td>
                              </tr>

                              <tr>
                                <td>Nombre de lits de surveillance continue :</td>
                                <td colSpan={5}>
                                  <input
                                    type="text"
                                    size={5}
                                    onChange={(e) =>
                                      setHospitalData({
                                        ...hospitalData,
                                        material: {
                                          ...hospitalData.material,
                                          nbBedMntr: parseInt(e.target.value),
                                        },
                                      })
                                    }
                                  />
                                  *
                                </td>
                              </tr>

                              <tr>
                                <td>Accès à l'ECMO :</td>
                                <td colSpan={5}>
                                  <select
                                    onChange={(e) =>
                                      setHospitalData({
                                        ...hospitalData,
                                        material: {
                                          ...hospitalData.material,
                                          ecmo: e.target.value === "Oui",
                                        },
                                      })
                                    }
                                  >
                                    <option value="">Sélectionnez</option>
                                    <option value="Non">Non</option>
                                    <option value="Oui">Oui</option>
                                  </select>
                                  *
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          {/* Devices Section */}
                          <table width="100%" border={0} cellSpacing={3} cellPadding={0}>
                            <tbody>
                              <tr style={{ backgroundColor: "#91ABE3" }}>
                                <td colSpan={6}>
                                  <div style={{ textAlign: "center" }}>
                                    <span className="titre_blanc16">Ventilateurs</span>
                                  </div>
                                </td>
                              </tr>

                              {hospitalData.devices.map((device, index) => (
                                <tr key={index}>
                                  <td>Quantité :</td>
                                  <td colSpan={2}>
                                    <input
                                      type="text"
                                      size={5}
                                      value={device.quantity}
                                      onChange={(e) => {
                                        const updatedDevices = [...hospitalData.devices];
                                        updatedDevices[index].quantity = parseInt(e.target.value);
                                        setHospitalData({
                                          ...hospitalData,
                                          devices: updatedDevices,
                                        });
                                      }}
                                    />
                                    *
                                  </td>
                                  <td>Nom du ventilateur :</td>
                                  <td colSpan={2}>
                                    <input
                                      type="text"
                                      size={20}
                                      value={device.name}
                                      onChange={(e) => {
                                        const updatedDevices = [...hospitalData.devices];
                                        updatedDevices[index].name = e.target.value;
                                        setHospitalData({
                                          ...hospitalData,
                                          devices: updatedDevices,
                                        });
                                      }}
                                    />
                                    *
                                  </td>
                                </tr>
                              ))}

                              <tr>
                                <td colSpan={6}>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setHospitalData({
                                        ...hospitalData,
                                        devices: [
                                          ...hospitalData.devices,
                                          { quantity: 0, name: "" },
                                        ],
                                      })
                                    }
                                  >
                                    Ajouter un ventilateur
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={6}>
                          <div style={{ textAlign: "center" }}>
                            <input type="submit" name="formGeneral" value="Valider" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default HospitalRegister;
