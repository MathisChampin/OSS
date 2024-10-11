
import left from "../assets/images/left.jpg";
import { postHospital, postMaterial, postPersonelMdeical, postPnoMedical } from "../api/hospital.requests";
import { postUser } from "../api/user.request";
import "./style.css";
import { redirect } from "react-router-dom";
import { useState } from "react";
import { joinData, Activity } from "../utils/hospital.d";


function Register() {
  const [hspData, setHspData] = useState<joinData>({
    NomHospital: "",
    ville: "",
    Departement: "",
    IdentiteHopital: "",
    ReanimationMedical: "",
    ReanimationChirurgical: "",
    Activite: Activity.ADULT,
    nom: "",
    prenom: "",
    role: "",
    email: "",
    password: "",
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
        ecmo: false
    },
    devices: [{ quantity: 0, name: "" }],
    ecmo: false
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //const [resData, resUser, resPmedical, resPnoMedical, resMaterial] = await Promise.all([
        const resData = await postHospital({
          NomHospital: hspData.NomHospital,
          ville: hspData.ville,
          Departement: hspData.Departement,
          IdentiteHopital: hspData.IdentiteHopital,
          ReanimationMedical: hspData.ReanimationMedical,
          ReanimationChirurgical: hspData.ReanimationChirurgical,
          Activite: hspData.Activite
        })
        const resUser = await postUser({
          nom: hspData.nom,
          prenom: hspData.prenom,
          role: hspData.role = "user",
          email: hspData.email,
          password: hspData.password,
          NomHospital: hspData.NomHospital
        })
        const resPmedical = await postPersonelMdeical({
          NbDoctorUniv: hspData.NbDoctorUniv,
          NbDoctorHosp: hspData.NbDoctorHosp,
          NbInternal: hspData.NbInternal,
          NbDoctor: hspData.NbDoctor,
          NbPersonalAbs: hspData.NbPersonalAbs
        })
        const resPnoMedical = await postPnoMedical({
          NbIdeDay: hspData.NbIdeDay,
          NbIdeNight: hspData.NbIdeNight,
          NbIdeDayUsc: hspData.NbIdeDayUsc,
          NbIdeNightUsc: hspData.NbIdeNightUsc,
          NbAsDay: hspData.NbAsDay,
          NbAsNight: hspData.NbAsNight,
          NbAsDayUsc: hspData.NbAsDayUsc,
          NbAsNightUsc: hspData.NbAsNightUsc,
          NbExecDay: hspData.NbExecDay,
          NbIdeSick: hspData.NbIdeSick,
          NbAsSick: hspData.NbAsSick,
          NbAppIde: hspData.NbAppIde,
          NbAppAs: hspData.NbAppAs
        })
        const resMaterial = await postMaterial({
          material: {
            nbBedRea: hspData.material.nbBedRea,
            nbBedInRoom: hspData.material.nbBedInRoom,
            nbBedMntr: hspData.material.nbBedMntr,
            nbAdmis: hspData.material.nbAdmis,
            nbPersonalAbs: hspData.material.nbPersonalAbs,
            ecmo: hspData.material.ecmo
          },
          devices: hspData.devices
        })
      //]);

      if (resData.status === 200 && resUser.status === 200 && resPmedical.status === 200 && resPnoMedical.status === 200 && resMaterial.status === 200) {
        redirect("/");
      }
      console.log(resData, resUser, resPmedical, resPnoMedical, resMaterial);
    } catch (error: any) {
      alert("Internal Server Error");
      throw new Error(error);
    }
  }


  return (
    <div id="Global">
      <table
        width={800}
        border={0}
        align="center"
        cellPadding={0}
        cellSpacing={0}
      >
        <tr>
          <td width={197} valign="top">
            <div style={{ textAlign: "left" }}>
              <img src={left} width={197} height={397} />
            </div>
          </td>
          <td valign="top">
            <div style={{ textAlign: "center" }}>
              <form
                name="form1"
                onSubmit={handleSubmit}
              >
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
                    <td>&nbsp;</td>
                    <td colSpan={5}>
                      <div style={{ textAlign: "right" }}></div>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#FFFFCC" }}>
                    <td height="80" colSpan={6}>
                      <div style={{ textAlign: "left" }}>
                        <table
                          width="100%"
                          border={0}
                          cellSpacing={5}
                          cellPadding={5}
                        >
                          <tr>
                            <td>
                              <div style={{ textAlign: "justify" }}>
                                <span className="note">
                                  Si vous &ecirc;tes impliqu&eacute; dans le
                                  suivi de ce registre veuillez renseigner les
                                  champs suivants&nbsp; qui vous donneront
                                  acc&egrave;s &agrave; la fiche
                                  d'enregistrement des donn&eacute;es
                                  gr&acirc;ce &agrave; un code confidentiel.
                                  <br />
                                  Pour un m&ecirc;me service plusieurs codes
                                  correspondant &agrave; plusieurs
                                  identit&eacute;s peuvent &ecirc;tre
                                  d&eacute;livr&eacute;s
                                </span>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="144">&nbsp;</td>
                    <td height="30" colSpan={5}>
                      &nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td colSpan={5}>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>
                      <div style={{ textAlign: "left" }}>
                        Nom de l'h&ocirc;pital :
                      </div>
                    </td>
                    <td colSpan={5}>
                      <div style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          id="nom_centre"
                          style={{ opacity: 5 }}
                          onChange={(e) => setHspData({ ...hspData, NomHospital: e.target.value })}
                        />
                        *
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style={{ textAlign: "left" }}>Ville&nbsp;:</div>
                    </td>
                    <td colSpan={5}>
                      <div style={{ textAlign: "left" }}>
                        <input name="ville" type="text" size={30} onChange={(e) => setHspData({ ...hspData, ville: e.target.value })} />*
                      </div>
                      <div style={{ textAlign: "left" }}></div>
                    </td>
                  </tr>
                  <tr>
                    <td height="22">
                      <div style={{ textAlign: "left" }}>
                        D&eacute;partement :
                      </div>
                    </td>
                    <td colSpan={5}>
                      <div style={{ textAlign: "left" }}>
                        <input
                          name="code_postal"
                          type="text"
                          id="code_postal"
                          size={2}
                          maxLength={2}
                          onChange={(e) => setHspData({ ...hspData, Departement: e.target.value })}
                        />
                        *
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td height="22">
                      <div style={{ textAlign: "left" }}>
                        Identit&eacute; h&ocirc;pital&nbsp;:
                      </div>
                    </td>
                    <td colSpan={5}>
                      <div style={{ textAlign: "left" }}>
                        <select name="id_hop" id="select7" onChange={(e) => setHspData({ ...hspData, IdentiteHopital: e.target.value })}>
                          <option value=" "></option>
                          <option value="CHU">CHU</option>
                          <option value="CHG">CHG</option>
                          <option value="CH">CH</option>
                          <option value="PSPH">PSPH</option>
                          <option value="Priv">Priv</option>
                        </select>
                        *
                      </div>
                      <div style={{ textAlign: "left" }}></div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={6}>&nbsp;</td>
                  </tr>
                  <tr>
                    <td colSpan={6}>
                      <div style={{ textAlign: "left" }}>
                        Type de service: (1 seule r&eacute;ponse possible qui
                        carract&eacute;rise le mieux votre unit&eacute;)
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={6}>
                      <div style={{ textAlign: "left" }}>
                        R&eacute;animation et/ou USC-USI m&eacute;dicale :
                        <select name="rea_usc" id="rea_usc" onChange={(e) => setHspData({ ...hspData, ReanimationMedical: e.target.value })}>
                          <option value=""></option>
                          <option value="Non">Non</option>
                          <option value="Oui">Oui</option>
                        </select>
                        *
                      </div>
                    </td>
                  </tr>
                  <tr id="matd3" style={{ display: "none" }}>
                    <td>
                      <div style={{ textAlign: "left" }}></div>
                    </td>
                    <td colSpan={5}>
                      <div style={{ textAlign: "left" }}>
                        <img
                          src="images/espaceur.gif"
                          width="150"
                          height="10"
                        />
                        <select name="rea_usc_2" id="select2" onChange={(e) => setHspData({ ...hspData, ReanimationMedical: e.target.value })}>
                          <option value=""></option>
                          <option value="Mdicale polyvalente">
                            Mdicale polyvalente
                          </option>
                          <option value="Pneumologique">Pneumologique</option>
                          <option value="Nephrologique">Nephrologique</option>
                          <option value="Autres">Autres</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style={{ textAlign: "left" }}></div>
                    </td>
                    <td height="10" colSpan={5}>
                      <div style={{ textAlign: "left" }}></div>
                    </td>
                  </tr>
                  <tr>
                    <td height="24" colSpan={6}>
                      <div style={{ textAlign: "left" }}>
                        R&eacute;animation et/ou USC-USI-SSPI chirurgicale&nbsp;
                        :
                        <select name="rea_sspi" id="select4" onChange={(e) => setHspData({ ...hspData, ReanimationChirurgical: e.target.value })}>
                          <option value=""></option>
                          <option value="Non">Non</option>
                          <option value="Oui">Oui</option>
                        </select>
                        *
                      </div>
                    </td>
                  </tr>
                  <tr id="matd4" style={{ display: "none" }}>
                    <td>
                      <div style={{ textAlign: "left" }}></div>
                    </td>
                    <td colSpan={5}>
                      <div style={{ textAlign: "left" }}>
                        <img
                          src="images/espaceur.gif"
                          width="150"
                          height="10"
                        />
                        <select name="rea_sspi_2" id="select8" onChange={(e) => setHspData({ ...hspData, ReanimationChirurgical: e.target.value })}>
                          <option value=""></option>
                          <option value="Chirurgicale">Chirurgicale</option>
                          <option value="Chirurgie cardiaque">
                            Chirurgie cardiaque
                          </option>
                          <option value="Digestive">Digestive</option>
                          <option value="Neurochirurgie">Neurochirurgie</option>
                          <option value="SSPI">SSPI</option>
                          <option value="Autre_sspi">Autre</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td colSpan={5}>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>
                      <div style={{ textAlign: "left" }}>
                        <span className="style4">Activit&eacute;&nbsp;: </span>
                      </div>
                    </td>
                    <td colSpan={5}>
                      <div style={{ textAlign: "left" }}>
                        <select name="activite" id="select" onChange={(e) => setHspData({ ...hspData, Activite: e.target.value === "Adulte" ? Activity.ADULT : Activity.PEDIATRIC })}>
                          <option value=""></option>
                          <option value="Adulte">Adulte</option>
                          <option value="P&eacute;diatrique">
                            P&eacute;diatrique
                          </option>
                        </select>
                        *
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style={{ textAlign: "left" }}></div>
                    </td>
                    <td colSpan={5}>
                      <div style={{ textAlign: "left" }}></div>
                      <div style={{ textAlign: "left" }}></div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={6} className="listemateriel">
                      <div style={{ textAlign: "left" }}></div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={6}>&nbsp;</td>
                  </tr>
                  <tr style={{ backgroundColor: "#91ABE3" }}>
                    <td colSpan={6}>
                      <div style={{ textAlign: "center" }}>
                        <span className="titre_blanc16">
                          Donn&eacute;es personnelles
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td colSpan={5}>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>
                      <div style={{ textAlign: "left" }}>Nom :</div>
                    </td>
                    <td colSpan={5}>
                      <div style={{ textAlign: "left" }}>
                        <input name="nom" type="text" id="nom" size={30} onChange={(e) => setHspData({ ...hspData, nom: e.target.value })} />*
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style={{ textAlign: "left" }}>Pr&eacute;nom :</div>
                    </td>
                    <td colSpan={5}>
                      <div style={{ textAlign: "left" }}>
                        <input
                          name="prenom"
                          type="text"
                          id="prenom"
                          size={30}
                          onChange={(e) => setHspData({ ...hspData, prenom: e.target.value })}
                        />
                        *
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style={{ textAlign: "left" }}>E-mail :</div>
                    </td>
                    <td colSpan={5}>
                      <div style={{ textAlign: "left" }}>
                        <input name="email" type="text" id="email" size={30} onChange={(e) => setHspData({ ...hspData, email: e.target.value })} />*
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td colSpan={5}>&nbsp;</td>
                  </tr>
                  <tr>
                    <td colSpan={6}>
                      <table
                        width="100%"
                        border={0}
                        cellSpacing={3}
                        cellPadding={0}
                      >
                        <tr>
                          <td
                            colSpan={5}
                            style={{ backgroundColor: "#91ABE3" }}
                          >
                            <div style={{ textAlign: "center" }}>
                              <span className="titre_blanc16">
                                Description du service
                              </span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td height="15" colSpan={3}>
                            &nbsp;
                          </td>
                          <td colSpan={2}>&nbsp;</td>
                        </tr>
                        <tr>
                          <td height="15" colSpan={5}>
                            <table
                              width="100%"
                              border={0}
                              cellSpacing={2}
                              cellPadding={0}
                              id="tableForm"
                            >
                              <tr
                                style={{
                                  verticalAlign: "middle",
                                  backgroundColor: "#91ABE3",
                                }}
                              >
                                <td colSpan={3}>
                                  <div
                                    style={{ textAlign: "center" }}
                                    className="titre_blanc16"
                                  >
                                    Personnel m&eacute;dical
                                    <strong>affect&eacute; </strong>
                                    <span className="lienblanchead">
                                      <strong>(Octobre 2009)</strong>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td width="32%" height="20">
                                  <div style={{ textAlign: "left" }}></div>
                                </td>
                                <td height="20" colSpan={2}>
                                  <div style={{ textAlign: "left" }}>
                                    <span className="style9"> </span>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2} className="style4">
                                  <div style={{ textAlign: "left" }}>
                                    <span className="listemed">
                                      Nombre moyen de m&eacute;decins
                                      Universitaires
                                      <span className="style1">
                                        (CCA,PHU,MCUPH,PUPH)
                                      </span>
                                      pr&eacute;sents dans le service :{" "}
                                    </span>
                                    <br />
                                  </div>
                                </td>
                                <td width="8%" className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_medu"
                                      type="text"
                                      id="nb_medu2"
                                      size={1}
                                      onChange={(e) => setHspData({ ...hspData, NbDoctorUniv: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2} className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="listemed"
                                  >
                                    <span className="style9">Nombre</span> moyen
                                    de m&eacute;decins hospitaliers, non
                                    Universitaires, pr&eacute;sents dans le
                                    service :
                                  </div>
                                </td>
                                <td className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_medhosp"
                                      type="text"
                                      id="nb_medhosp"
                                      size={1}
                                      onChange={(e) => setHspData({ ...hspData, NbDoctorHosp: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2} className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="listemed"
                                  >
                                    <span className="style9">Nombre</span> moyen
                                    d&rsquo;internes ou faisant fonction
                                    d&rsquo;internes pr&eacute;sents dans le
                                    service :
                                  </div>
                                </td>
                                <td className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_int"
                                      type="text"
                                      id="nb_int"
                                      size={1}
                                      onChange={(e) => setHspData({ ...hspData, NbInternal: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2} className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="listemed"
                                  >
                                    <span className="style9">Nombre</span> de
                                    m&eacute;decins (internes et/ou seniors)
                                    pr&eacute;sents pendant la garde :
                                  </div>
                                </td>
                                <td className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_medpres"
                                      type="text"
                                      id="nb_medpres"
                                      size={1}
                                      onChange={(e) => setHspData({ ...hspData, NbDoctor: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2} className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="listemed"
                                  >
                                    <span className="style9">Nombre</span> de
                                    personnels m&eacute;dicaux absents 1
                                    journ&eacute;e (ou plus) en raison de la
                                    grippe :
                                  </div>
                                </td>
                                <td className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_etp_abs"
                                      type="text"
                                      id="nb_etp_abs2"
                                      size={1}
                                      onChange={(e) => setHspData({ ...hspData, NbPersonalAbs: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td height="20" colSpan={3}></td>
                              </tr>
                              <tr
                                style={{
                                  verticalAlign: "middle",
                                  backgroundColor: "#91ABE3",
                                }}
                              >
                                <td colSpan={3} className="style4">
                                  <div style={{ textAlign: "center" }}>
                                    <span className="titre_blanc16">
                                      Personnel non m&eacute;dical
                                      <strong>affect&eacute; </strong>
                                    </span>
                                    <span className="lienblanchead">
                                      <strong>(Octobre 2009)</strong>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td height="5" className="style4">
                                  &nbsp;
                                </td>
                                <td width="60%" height="20" className="style4">
                                  &nbsp;
                                </td>
                                <td height="20" className="style4 style2">
                                  &nbsp;
                                </td>
                              </tr>
                              <tr style={{ backgroundColor: "#FFFFCC" }}>
                                <td height="30" colSpan={3} className="style4">
                                  <div
                                    style={{ textAlign: "center" }}
                                    className="note"
                                  >
                                    Entrez le nombre moyen d'IDE/AS
                                    pr&eacute;sents la journ&eacute;e
                                    <br />
                                    (ind&eacute;pendamment de l'organisation en
                                    3x8 et 2x12 heures )
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td height="5" className="style4">
                                  <div style={{ textAlign: "left" }}></div>
                                </td>
                                <td height="20" className="style4">
                                  &nbsp;
                                </td>
                                <td height="20" className="style4 style2">
                                  &nbsp;
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2} className="style4">
                                  <div style={{ textAlign: "left" }}>
                                    Nombre moyen d'IDE pr&eacute;sents la
                                    journ&eacute;e en r&eacute;animation :
                                  </div>
                                </td>
                                <td className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_ide_jour"
                                      type="text"
                                      id="nb_ide_jour"
                                      size={1}
                                      onChange={(e) => setHspData({ ...hspData, NbIdeDay: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2} className="style4">
                                  <div style={{ textAlign: "left" }}>
                                    Nombre moyen d'IDE pr&eacute;sents la
                                    journ&eacute;e en USC et/ou USI :
                                  </div>
                                </td>
                                <td className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_ide_jour_usc"
                                      type="text"
                                      id="nb_ide_jour_usc"
                                      size={1}
                                      onChange={(e) => setHspData({ ...hspData, NbIdeDayUsc: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2} className="style4">
                                  <div style={{ textAlign: "left" }}>
                                    Nombre moyen d'IDE pr&eacute;sents la nuit
                                    en r&eacute;animation :
                                  </div>
                                </td>
                                <td className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_ide_nuit"
                                      type="text"
                                      id="nb_ide_nuit"
                                      size={1}
                                      onChange={(e) => setHspData({ ...hspData, NbIdeNight: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2} className="style4">
                                  <div style={{ textAlign: "left" }}>
                                    Nombre moyen d'IDE pr&eacute;sents la nuit
                                    en USC et/ou USI :
                                  </div>
                                </td>
                                <td className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_ide_nuit_usc"
                                      type="text"
                                      id="nb_ide_nuit_usc"
                                      onChange={(e) => setHspData({ ...hspData, NbIdeNightUsc: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td height="20" colSpan={3} className="style4">
                                  <div style={{ textAlign: "left" }}></div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2} className="style4">
                                  <div style={{ textAlign: "left" }}>
                                    Nombre moyen d'AS pr&eacute;sents la
                                    journ&eacute;e en r&eacute;animation :
                                  </div>
                                </td>
                                <td className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_ash_jour"
                                      type="text"
                                      id="nb_ash_jour"
                                      size={1}
                                      onChange={(e) => setHspData({ ...hspData, NbAsDay: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2} className="style4">
                                  <div style={{ textAlign: "left" }}>
                                    Nombre moyen d'AS pr&eacute;sents la
                                    journ&eacute;e en USC et/ou USI :
                                  </div>
                                </td>
                                <td className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_ash_jour_usc"
                                      type="text"
                                      id="nb_ash_jour_usc"
                                      onChange={(e) => setHspData({ ...hspData, NbAsDayUsc: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2} className="style4">
                                  <div style={{ textAlign: "left" }}>
                                    Nombre moyen d'AS pr&eacute;sents la nuit en
                                    r&eacute;animation :
                                  </div>
                                </td>
                                <td className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_ash_nuit"
                                      type="text"
                                      id="nb_ash_nuit"
                                      onChange={(e) => setHspData({ ...hspData, NbAsNight: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2} className="style4">
                                  <div style={{ textAlign: "left" }}>
                                    Nombre moyen d'AS pr&eacute;sents la nuit en
                                    USC et/ou USI :
                                  </div>
                                </td>
                                <td className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_ash_nuit_usc"
                                      type="text"
                                      id="nb_ash_nuit_usc"
                                      onChange={(e) => setHspData({ ...hspData, NbAsNightUsc: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td height="20" colSpan={3} className="style4">
                                  <div style={{ textAlign: "left" }}></div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2} className="style4">
                                  <div style={{ textAlign: "left" }}>
                                    Nombre de cadres ou faisant fonction
                                    pr&eacute;sents la journ&eacute;e :
                                  </div>
                                </td>
                                <td className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_cadre_pres"
                                      type="text"
                                      id="nb_cadre_pres"
                                      onChange={(e) => setHspData({ ...hspData, NbExecDay: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td height="20" colSpan={2} className="style4">
                                  &nbsp;
                                </td>
                                <td height="14" className="style4 style2">
                                  &nbsp;
                                </td>
                              </tr>
                              <tr>
                                <td height="22" colSpan={2} className="style4">
                                  <div style={{ textAlign: "left" }}>
                                    Nombre d&rsquo;arr&ecirc;ts maladie total en
                                    cours pour les IDE :
                                  </div>
                                </td>
                                <td height="22" className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_arret_ide"
                                      type="text"
                                      id="nb_arret_ide"
                                      onChange={(e) => setHspData({ ...hspData, NbIdeSick: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2} className="style4">
                                  <div style={{ textAlign: "left" }}>
                                    Nombre d&rsquo;arr&ecirc;ts maladie total en
                                    cours pour les AS :
                                  </div>
                                </td>
                                <td className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_arret_ash"
                                      type="text"
                                      id="nb_arret_ash"
                                      onChange={(e) => setHspData({ ...hspData, NbAsSick: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td height="20" className="style4">
                                  &nbsp;
                                </td>
                                <td colSpan={2}>&nbsp;</td>
                              </tr>
                              <tr>
                                <td height="5" colSpan={2} className="style4">
                                  <div style={{ textAlign: "left" }}>
                                    Nombre approximatif d'IDE en renfort :<br />
                                    (Travaillant habituellement dans un autre
                                    service)
                                  </div>
                                </td>
                                <td height="5" className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_ide_renf"
                                      type="text"
                                      id="nb_ide_renf"
                                      onChange={(e) => setHspData({ ...hspData, NbAppIde: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td height="20" className="style4">
                                  &nbsp;
                                </td>
                                <td colSpan={2}>&nbsp;</td>
                              </tr>
                              <tr>
                                <td height="5" colSpan={2} className="style4">
                                  <div style={{ textAlign: "left" }}>
                                    Nombre approximatif d'AS en renfort : <br />
                                    (Travaillant habituellement dans un autre
                                    service)
                                  </div>
                                </td>
                                <td height="5" className="style4">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="style2"
                                  >
                                    <input
                                      name="nb_ash_renf"
                                      type="text"
                                      id="nb_ash_renf2"
                                      onChange={(e) => setHspData({ ...hspData, NbAppAs: parseInt(e.target.value) })}
                                    />
                                    *
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td height="5" className="style4">
                                  &nbsp;
                                </td>
                                <td colSpan={2}>&nbsp;</td>
                              </tr>
                              <tr style={{ backgroundColor: "#91ABE3" }}>
                                <td height="5" colSpan={3} className="style4">
                                  <div style={{ textAlign: "left" }}></div>
                                  <div style={{ textAlign: "center" }}>
                                    <span className="titre_blanc16">
                                      Mat&eacute;riel<strong></strong>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td height="15" colSpan={3}>
                            <div style={{ textAlign: "left" }}></div>
                          </td>
                          <td colSpan={2}>
                            <div style={{ textAlign: "left" }}></div>
                          </td>
                        </tr>
                        <tr>
                          <td height="25" colSpan={3}>
                            <div style={{ textAlign: "left" }}>
                              <span className="style4">
                                Nombre de lits de r&eacute;animation ouverts
                                &agrave; ce jour :
                              </span>
                            </div>
                          </td>
                          <td colSpan={2}>
                            <div style={{ textAlign: "left" }}>
                              <input size={2} type="text" name="nb_lits" onChange={(e) => setHspData({ ...hspData, material: { ...hspData.material, nbBedRea: parseInt(e.target.value) } })}/>*
                            </div>
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
                        <tr>
                          <td colSpan={5}>
                          <table width="80%" border={0} align="left" cellPadding="0" cellSpacing="0">
                        <tr>
                          <td>
                            <div style={{ alignItems: "left"}}>1 lit :
                              <input name="lit1_rea" type="text" id="lit1_rea" size={2} onChange={(e) => setHspData({ ...hspData, material: { ...hspData.material, nbBedInRoom: parseInt(e.target.value) } })}/>
                            </div>
                          </td>
                          <td>
                            <div style={{ alignItems: "left"}}>2 lits :
                              <input name="lit2_rea" type="text" id="lit2_rea" size={2} onChange={(e) => setHspData({ ...hspData, material: { ...hspData.material, nbBedInRoom: parseInt(e.target.value) } })}/>
                            </div>
                          </td>
                          <td>
                            <div style={{ alignItems: "left"}}>plus de 2 lits :
                              <input name="litplus_rea" type="text" id="litplus_rea" size={2} onChange={(e) => setHspData({ ...hspData, material: { ...hspData.material, nbBedInRoom: parseInt(e.target.value) } })}/>
                            </div>
                          </td>
                        </tr>
                      </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <p style={{ textAlign: "right" }}>&nbsp;</p>
                          </td>
                          <td colSpan={2}>
                            <div style={{ textAlign: "left" }}></div>
                          </td>
                        </tr>
                        <tr>
                          <td height="25" colSpan={5}>
                            <div style={{ textAlign: "left" }}>
                              <span className="style4">
                                Nombre de lits de surveillance continue ouverts
                                &agrave; ce jour :
                              </span>
                              <input type="text" name="nb_lits_surv" size={2} onChange={(e) => setHspData({ ...hspData, material: { ...hspData.material, nbBedMntr: parseInt(e.target.value) } })}/>
                              *
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td height="25" colSpan={5}>
                            <div style={{ textAlign: "left" }}>
                              Combien de ces lits
                              <span className="style4">
                                de surveillance continue
                              </span>
                              sont dans des chambres &agrave; :
                            </div>
                            <div style={{ textAlign: "left" }}></div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={5}>
                          <table width="80%" border={0} align="left" cellPadding="0" cellSpacing="0">
                        <tr>
                          <td>
                            <div style={{alignItems: "left"}}>1 lit :
                              <input name="lit1_usc" type="text" id="lit1_usc2" size={2} onChange={(e) => setHspData({ ...hspData, material: { ...hspData.material, nbBedMntr: parseInt(e.target.value) } })}/>
                            </div>
                          </td>
                          <td>
                            <div style={{alignItems: "left"}}>2 lits :
                              <input name="lit2_usc" type="text" id="lit2_usc2" size={2} onChange={(e) => setHspData({ ...hspData, material: { ...hspData.material, nbBedMntr: parseInt(e.target.value) } })}/>
                            </div>
                          </td>
                          <td>
                            <div style={{alignItems: "left"}}>plus de 2 lits :
                              <input name="litplus_usc" type="text" id="litplus_usc2" size={2} onChange={(e) => setHspData({ ...hspData, material: { ...hspData.material, nbBedMntr: parseInt(e.target.value) } })}/>
                            </div>
                          </td>
                        </tr>
                      </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <p style={{ textAlign: "right" }}>&nbsp;</p>
                          </td>
                          <td colSpan={2}>
                            <div style={{ textAlign: "left" }}></div>
                          </td>
                        </tr>
                        <tr>
                          <td height="26" colSpan={3}>
                            <div style={{ textAlign: "left" }}>
                              <span className="style4">
                                Nombre approximatif d'admissions par an :
                              </span>
                            </div>
                          </td>
                          <td height="26" colSpan={2}>
                            <div style={{ textAlign: "left" }}>
                              <input
                                name="nb_admin"
                                type="text"
                                id="nb_admin4"
                                size={6}
                                onChange={(e) => setHspData({ ...hspData, material: { ...hspData.material, nbAdmis: parseInt(e.target.value) } })}
                              />
                              *
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td height="17" colSpan={5}>
                            <div style={{ textAlign: "left" }}></div>
                            <div style={{ textAlign: "left" }}></div>
                            <div style={{ textAlign: "left" }}>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td>
                                    <div style={{ textAlign: "left" }}>
                                      <span className="style2"> </span>
                                      <input
                                        name="nb_lits_uscrea"
                                        type="hidden"
                                        id="nb_lits_uscrea"
                                        size={6}
                                        onChange={(e) => setHspData({ ...hspData, material: { ...hspData.material, nbAdmis: parseInt(e.target.value) } })}  
                                      />
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td height="26" colSpan={5}>
                            <div style={{ textAlign: "left" }}></div>
                            <div style={{ textAlign: "left" }}></div>
                            <div style={{ textAlign: "left" }}>
                              Nombre et type de ventilateurs affect&eacute;s au
                              service &agrave; ce jour&nbsp;:
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2"> </span>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td>
                                    <span className="style2">
                                      <input
                                        name="evitaII"
                                        type="text"
                                        id="evitaII"
                                        size={1}
                                        maxLength={2}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "EvitaII" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10">&nbsp;</td>
                                  <td width="94%">
                                    <span className="listemateriel">
                                      Evita 2 (Drager)
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                          <td colSpan={2}>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2"> </span>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td>
                                    <span className="style2">
                                      <input
                                        name="evitaIV"
                                        type="text"
                                        id="evitaIV"
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "EvitaIV" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10">&nbsp;</td>
                                  <td width="94%">
                                    <span className="style2">
                                      Evita IV (Drager){" "}
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                          <td colSpan={2}>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2"> </span>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td width="2%">
                                    <span className="style2">
                                      <input
                                        name="evitaXL"
                                        type="text"
                                        id="nb_admin233"
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "EvitaXL" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10">&nbsp;</td>
                                  <td width="93%">
                                    <span className="style2">
                                      Evita XL (Drager)
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2"></span>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td>
                                    <span className="style2">
                                      <input
                                        name="savina"
                                        type="text"
                                        id="savina" 
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "Savina" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10">&nbsp;</td>
                                  <td width="94%">
                                    <span className="style2">
                                      SAVINA (Drager)
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                          <td colSpan={2}>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2"> </span>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td>
                                    <span className="style2">
                                      <input
                                        name="evitaIIdura"
                                        type="text"
                                        id="evitaIIdura"
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "EvitaIIdura" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10">&nbsp;</td>
                                  <td width="94%">
                                    <span className="style2">
                                      Evita 2 DURA (Drager)
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                          <td colSpan={2}>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2"> </span>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td>
                                    <span className="style2">
                                      <input
                                        name="npb7200"
                                        type="text"
                                        id="npb7200"
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "NPB7200" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10">&nbsp;</td>
                                  <td width="94%">
                                    <span className="style2">7200 (NPB) </span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2"> </span>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td>
                                    <span className="style2">
                                      <input
                                        name="galileo"
                                        type="text"
                                        id="galileo"
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "Galileo" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10">&nbsp;</td>
                                  <td width="94%">
                                    <span className="style2">
                                      Galil&eacute;o (Hamilton)
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                          <td colSpan={2}>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2"> </span>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td>
                                    <span className="style2">
                                      <input
                                        name="G5"
                                        type="text"
                                        id="G5"
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "G5" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10">&nbsp;</td>
                                  <td width="94%">
                                    <span className="style2">
                                      G5 (Hamilton)
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                          <td colSpan={2}>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2"> </span>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td>
                                    <span className="style2">
                                      <input
                                        name="servoI"
                                        type="text"
                                        id="servoI"
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "ServoI" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10">&nbsp;</td>
                                  <td width="94%">
                                    <span className="style2">
                                      Servo I (Maquet){" "}
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2"> </span>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td width="21">
                                    <span className="style2">
                                      <input
                                        name="servo900"
                                        type="text"
                                        id="servo9002"
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "Servo900" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="8"></td>
                                  <td width="303">
                                    <span className="style2">
                                      Servo 900 (Siemens)
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                          <td colSpan={2}>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2"> </span>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td>
                                    <span className="style2">
                                      <input
                                        name="bird8400"
                                        type="text"
                                        id="bird8400"
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "Bird8400" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10">&nbsp;</td>
                                  <td width="94%">
                                    <span className="style2">Bird 8400 </span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                          <td colSpan={2}>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2"> </span>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td>
                                    <span className="style2">
                                      <input
                                        name="Tbird"
                                        type="text"
                                        id="Tbird"
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "Tbird" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10">&nbsp;</td>
                                  <td width="94%">
                                    <span className="style2">T Bird </span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div style={{ textAlign: "left" }}>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td>
                                    <span className="style2">
                                      <input
                                        name="pb840"
                                        type="text"
                                        id="pb8402"
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "PB840" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10">&nbsp;</td>
                                  <td width="94%">
                                    <span className="style2">
                                      840 (Codivien){" "}
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                          <td width="15">
                            <div style={{ textAlign: "left" }}>
                              <span className="style2">
                                <input
                                  name="vela"
                                  type="text"
                                  id="vela3"
                                  size={1}
                                  onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "Vela" }] })}
                                />
                              </span>
                            </div>
                          </td>
                          <td width="219">
                            <div style={{ textAlign: "left" }}>
                              <span className="style2">Vela </span>
                            </div>
                          </td>
                          <td width="24">
                            <div style={{ textAlign: "left" }}>
                              <span className="style2">
                                <input
                                  name="npb740760"
                                  type="text"
                                  id="npb7407604"
                                  size={1}
                                  onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "NPB740760" }] })}
                                />
                              </span>
                            </div>
                          </td>
                          <td width="386">
                            <div style={{ textAlign: "left" }}>
                              <span className="style2">740-760 (NPB</span>)
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="249">
                            <div style={{ textAlign: "left" }}>
                              <span className="style2">
                                <span>
                                  <span>
                                    <input
                                      name="servo300"
                                      type="text"
                                      id="nb_admin2193"
                                      value=""
                                      size={1}
                                      onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "Servo300" }] })}
                                    />
                                  </span>{" "}
                                </span>
                                Servo 300 (Siemens)
                              </span>
                            </div>
                          </td>
                          <td colSpan={2}>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2"> </span>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td width="15">
                                    <span className="style2">
                                      <input
                                        name="extend"
                                        type="text"
                                        id="extend"
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "Extend" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10"></td>
                                  <td width="218">
                                    <span className="style2">
                                      Extend (Taema)
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                          <td colSpan={2}>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2"> </span>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td>
                                    <span className="style2">
                                      <input
                                        name="horus"
                                        type="text"
                                        id="horus"
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "Horus" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10"></td>
                                  <td width="345">
                                    <span className="style2">
                                      {" "}
                                      Horus (Taema)
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2"> </span>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td width="5%">
                                    <span className="style2">
                                      <input
                                        name="elisee"
                                        type="text"
                                        id="elisee"
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "Elisee" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10">&nbsp;</td>
                                  <td width="95%">
                                    <span className="style2">
                                      Elis&eacute;e (Saime Resmed)
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                          <td colSpan={2}>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2"> </span>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td width="12">
                                    <span className="style2">
                                      <input
                                        name="vision"
                                        type="text"
                                        id="vision"
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "Vision" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10">&nbsp;</td>
                                  <td width="281">
                                    <div style={{ textAlign: "left" }}>
                                      <span className="style2">
                                        Vision (Respironics) ou V60
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                          <td colSpan={2}>
                            <div style={{ textAlign: "left" }}>
                              <table
                                width={100}
                                border={0}
                                cellSpacing={0}
                                cellPadding={0}
                              >
                                <tr>
                                  <td width="2%">
                                    <span className="style2">
                                      <input
                                        name="v500"
                                        type="text"
                                        id="evitaXL"
                                        size={1}
                                        onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "V500" }] })}
                                      />
                                    </span>
                                  </td>
                                  <td width="10">&nbsp;</td>
                                  <td width="93%">
                                    <span className="style2">
                                      V500 (Drager)
                                    </span>
                                  </td>
                                </tr>
                              </table>
                              <span className="style2"> </span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table
                              width={100}
                              border={0}
                              cellSpacing={0}
                              cellPadding={0}
                            >
                              <tr>
                                <td width="15">
                                  <span className="style2">
                                    <input
                                      name="avea"
                                      type="text"
                                      id="npb7407602"
                                      size={1}
                                      onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "Avea" }] })}
                                    />
                                  </span>
                                </td>
                                <td width="10">&nbsp;</td>
                                <td width="321" className="listemateriel">
                                  <div style={{ textAlign: "left" }}>
                                    Avea (Viasys)
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td colSpan={2}>
                            <table
                              width={100}
                              border={0}
                              cellSpacing={0}
                              cellPadding={0}
                            >
                              <tr>
                                <td width="16">
                                  <span className="style2">
                                    <input
                                      name="engst"
                                      type="text"
                                      id="engst"
                                      size={1}
                                      onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "Engstrom" }] })}
                                    />
                                  </span>
                                </td>
                                <td width="152">
                                  <div
                                    style={{ textAlign: "left" }}
                                    className="listemateriel"
                                  >
                                    Engstr&ouml;m Carestation (GE)
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td>
                            <div style={{ textAlign: "left" }}>
                              <span className="style2">
                                <input
                                  name="autre"
                                  type="text"
                                  id="autre2"
                                  size={1}
                                  onChange={(e) => setHspData({ ...hspData, devices: [...hspData.devices, { quantity: parseInt(e.target.value), name: "Autre" }] })}
                                />
                              </span>
                            </div>
                          </td>
                          <td>
                            <div style={{ textAlign: "left" }}>
                              <span className="listemateriel">Autre </span>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={6}>&nbsp;</td>
                  </tr>
                  <tr>
                    <td colSpan={6}>
                      <div style={{ textAlign: "left" }}>
                        Un acc&egrave;s &agrave; l&rsquo;ECMO est-il possible
                        dans votre &eacute;tablissement ?
                        <select name="ecmo" id="ecmo" onChange={(e) => setHspData({ ...hspData, ecmo: e.target.value === "oui" })}>
                          <option value={0} selected></option>
                          <option value="non">Non</option>
                          <option value="oui">Oui</option>
                        </select>
                        *
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td height="30" colSpan={6}>
                      <div style={{ textAlign: "left" }}></div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={6}>
                      <div style={{ textAlign: "left" }}></div>
                      <div style={{ textAlign: "left" }} className="style4">
                        <span className="note">
                          Pour tout probl&egrave;me ou renseignement, vous
                          pouvez nous contacter par
                        </span>
                        <span>
                          <a
                            href="mailto:contact@revaweb.org"
                            className="lienbleuitalique"
                          >
                            <strong>mail</strong>
                          </a>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td height="22" colSpan={6}>
                      <div style={{ textAlign: "left" }}></div>
                      <div style={{ textAlign: "left" }}></div>
                      <div
                        style={{ textAlign: "left" }}
                        className="info style1"
                      >
                        *Champs obligatoires
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td height="20" colSpan={7}>
                      <div style={{ textAlign: "center" }}>
                        <input
                          type="submit"
                          name="formGeneral"
                          value="Valider"
                        />
                      </div>
                    </td>
                  </tr>
                </table>
              </form>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>&nbsp;</td>
        </tr>
      </table>
    </div>
  );
}

export default Register;
