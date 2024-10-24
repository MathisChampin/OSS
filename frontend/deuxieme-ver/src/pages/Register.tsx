import { useState } from "react";
import { postUser } from "../api/user.request";
import "./style.css"; // Keep your existing styles
import { redirect } from "react-router-dom";

function Register() {
  const [userData, setUserData] = useState({
    nom: "",
    prenom: "",
    role: "user",
    email: "",
    password: "",
    NomHospital: "",
    ville: "",
    Departement: "",
    IdentiteHopital: "",
    ReanimationMedical: "",
    ReanimationChirurgical: "",
    Activite: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resUser = await postUser({
        nom: userData.nom,
        prenom: userData.prenom,
        role: userData.role,
        email: userData.email,
        password: userData.password,
        NomHospital: userData.NomHospital,
        ville: userData.ville,
        Departement: userData.Departement,
        IdentiteHopital: userData.IdentiteHopital,
        ReanimationMedical: userData.ReanimationMedical,
        ReanimationChirurgical: userData.ReanimationChirurgical,
        Activite: userData.Activite,

      });

      if (resUser.status === 200) {
        redirect("/");
      }
    } catch (error) {
      alert("Internal Server Error");
      throw new Error(error);
    }
  };

  return (
    <div id="Global">
      <table width={800} border={0} align="center" cellPadding={0} cellSpacing={0}>
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
                  <tr>
                    <td height="25" colSpan={7}>
                      <div style={{ textAlign: "center" }}>
                        <span className="titre_blanc18">
                          Enregistrez votre service
                        </span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={6}>
                      <table
                        width="100%"
                        border={0}
                        cellSpacing={3}
                        cellPadding={0}
                      >
                        <tr style={{ backgroundColor: "#91ABE3" }}>
                          <td colSpan={6}>
                            <div style={{ textAlign: "center" }}>
                              <span className="titre_blanc16">
                                Données personnelles
                              </span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="144">&nbsp;</td>
                          <td colSpan={5}>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>Nom :</td>
                          <td colSpan={5}>
                            <input
                              name="nom"
                              type="text"
                              size={30}
                              onChange={(e) =>
                                setUserData({ ...userData, nom: e.target.value })
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Prénom :</td>
                          <td colSpan={5}>
                            <input
                              name="prenom"
                              type="text"
                              size={30}
                              onChange={(e) =>
                                setUserData({ ...userData, prenom: e.target.value })
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>E-mail :</td>
                          <td colSpan={5}>
                            <input
                              name="email"
                              type="text"
                              size={30}
                              onChange={(e) =>
                                setUserData({ ...userData, email: e.target.value })
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Nom de l'hôpital :</td>
                          <td colSpan={5}>
                            <input
                              name="NomHospital"
                              type="text"
                              size={30}
                              onChange={(e) =>
                                setUserData({ ...userData, NomHospital: e.target.value })
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Ville :</td>
                          <td colSpan={5}>
                            <input
                              name="ville"
                              type="text"
                              size={30}
                              onChange={(e) =>
                                setUserData({ ...userData, ville: e.target.value })
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Département :</td>
                          <td colSpan={5}>
                            <input
                              name="Departement"
                              type="text"
                              size={30}
                              onChange={(e) =>
                                setUserData({ ...userData, Departement: e.target.value })
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Identité Hôpital :</td>
                          <td colSpan={5}>
                            <select
                              name="IdentiteHopital"
                              value={userData.IdentiteHopital}
                              onChange={(e) =>
                                setUserData({ ...userData, IdentiteHopital: e.target.value })
                              }
                            >
                              <option value="" disabled>Choisir...</option>
                              <option value="CHU">CHU</option>
                              <option value="CHG">CHG</option>
                              <option value="CH">CH</option>
                              <option value="PSPH">PSPH</option>
                              <option value="Priv">Privé</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>R&eacute;animation et/ou USC-USI m&eacute;dicale :</td>
                          <td colSpan={5}>
                            <select
                              name="ReanimationMedical"
                              value={userData.ReanimationMedical}
                              onChange={(e) =>
                                setUserData({ ...userData, ReanimationMedical: e.target.value })
                              }
                            >
                              <option value="" disabled>Choisir...</option>
                              <option value="Non">Non</option>
                              <option value="Oui">Oui</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>R&eacute;animation et/ou USC-USI-SSPI chirurgicale :</td>
                          <td colSpan={5}>
                            <select
                              name="ReanimationChirurgical"
                              value={userData.ReanimationChirurgical}
                              onChange={(e) =>
                                setUserData({ ...userData, ReanimationChirurgical: e.target.value })
                              }
                            >
                              <option value="" disabled>Choisir...</option>
                              <option value="Non">Non</option>
                              <option value="Oui">Oui</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Activité :</td>
                          <td colSpan={5}>
                            <select
                              name="Activite"
                              value={userData.Activite}
                              onChange={(e) =>
                                setUserData({ ...userData, Activite: e.target.value })
                              }
                            >
                              <option value="" disabled>Choisir...</option>
                              <option value="Non">Non</option>
                              <option value="Oui">Oui</option>
                            </select>
                          </td>
                        </tr>
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
                </table>
              </form>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Register;