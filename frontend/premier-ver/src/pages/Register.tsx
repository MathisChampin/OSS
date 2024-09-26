import React, { useState } from "react";

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        nom_centre: "",
        ville: "",
        code_postal: "",
        id_hop: "",
        rea_usc: "",
        rea_usc_2: "",
        rea_sspi: "",
        rea_sspi_2: "",
        activite: "",
        nom: "",
        prenom: "",
        email: "",
        code: "",
        nb_medu: "",
        nb_medhosp: "",
        nb_int: "",
        nb_medpres: "",
        nb_etp_abs: "",
        nb_ide_jour: "",
        nb_ide_jour_usc: "",
        nb_ide_nuit: "",
        nb_ide_nuit_usc: "",
        nb_ash_jour: "",
        nb_ash_jour_usc: "",
        nb_ash_nuit: "",
        nb_ash_nuit_usc: "",
        nb_cadre_pres: "",
        nb_arret_ide: "",
        nb_arret_ash: "",
        nb_ide_renf: "",
        nb_ash_renf: "",
        nb_lits: "",
        nb_lits_surv: "",
        nb_admin: "",
        evitaII: "",
        evitaIV: "",
        evitaXL: "",
        savina: "",
        evitaIIdura: "",
        npb7200: "",
        galileo: "",
        G5: "",
        servoI: "",
        servo900: "",
        bird8400: "",
        Tbird: "",
        pb840: "",
        vela: "",
        npb740760: "",
        servo300: "",
        extend: "",
        horus: "",
        elisee: "",
        vision: "",
        v500: "",
        avea: "",
        engst: "",
        autre: "",
        ecmo: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Enregistrez votre service
            </h1>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Hospital Information Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Informations sur l'hôpital</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Nom de l'hôpital:
                            </label>
                            <input
                                name="nom_centre"
                                type="text"
                                value={formData.nom_centre}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Ville:
                            </label>
                            <input
                                name="ville"
                                type="text"
                                value={formData.ville}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Département:
                            </label>
                            <input
                                name="code_postal"
                                type="text"
                                value={formData.code_postal}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                maxLength={2}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Identité hôpital:
                            </label>
                            <select
                                name="id_hop"
                                value={formData.id_hop}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value=""> </option>
                                <option value="CHU">CHU</option>
                                <option value="CHG">CHG</option>
                                <option value="CH">CH</option>
                                <option value="PSPH">PSPH</option>
                                <option value="Privé">Privé</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Medical Information Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Informations médicales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Réanimation et/ou USC-USI médicale:
                            </label>
                            <select
                                name="rea_usc"
                                value={formData.rea_usc}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value=""></option>
                                <option value="Non">Non</option>
                                <option value="Oui">Oui</option>
                            </select>
                        </div>
                        {formData.rea_usc === "Oui" && (
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Type de réanimation médicale:
                                </label>
                                <select
                                    name="rea_usc_2"
                                    value={formData.rea_usc_2}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value=""></option>
                                    <option value="Médicale polyvalente">Médicale polyvalente</option>
                                    <option value="Pneumologique">Pneumologique</option>
                                    <option value="Nephrologique">Nephrologique</option>
                                    <option value="Autres">Autres</option>
                                </select>
                            </div>
                        )}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Réanimation et/ou USC-USI-SSPI chirurgicale:
                            </label>
                            <select
                                name="rea_sspi"
                                value={formData.rea_sspi}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value=""></option>
                                <option value="Non">Non</option>
                                <option value="Oui">Oui</option>
                            </select>
                        </div>
                        {formData.rea_sspi === "Oui" && (
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Type de réanimation chirurgicale:
                                </label>
                                <select
                                    name="rea_sspi_2"
                                    value={formData.rea_sspi_2}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value=""></option>
                                    <option value="Chirurgicale">Chirurgicale</option>
                                    <option value="Chirurgie cardiaque">Chirurgie cardiaque</option>
                                    <option value="Digestive">Digestive</option>
                                    <option value="Neurochirurgie">Neurochirurgie</option>
                                    <option value="SSPI">SSPI</option>
                                    <option value="Autre_sspi">Autre</option>
                                </select>
                            </div>
                        )}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Activité:
                            </label>
                            <select
                                name="activite"
                                value={formData.activite}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value=""></option>
                                <option value="Adulte">Adulte</option>
                                <option value="Pédiatrique">Pédiatrique</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Personal Information Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Informations personnelles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Nom:
                            </label>
                            <input
                                name="nom"
                                type="text"
                                value={formData.nom}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Prénom:
                            </label>
                            <input
                                name="prenom"
                                type="text"
                                value={formData.prenom}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                E-mail:
                            </label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Code:
                            </label>
                            <input
                                name="code"
                                type="text"
                                value={formData.code}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Ventilator Information Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Informations sur les ventilateurs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <input
                                name="evitaII"
                                type="text"
                                value={formData.evitaII}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Evita II</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="evitaIV"
                                type="text"
                                value={formData.evitaIV}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Evita IV</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="evitaXL"
                                type="text"
                                value={formData.evitaXL}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Evita XL</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="savina"
                                type="text"
                                value={formData.savina}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Savina</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="evitaIIdura"
                                type="text"
                                value={formData.evitaIIdura}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Evita II Dura</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="npb7200"
                                type="text"
                                value={formData.npb7200}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">NPB 7200</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="galileo"
                                type="text"
                                value={formData.galileo}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Galileo</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="G5"
                                type="text"
                                value={formData.G5}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">G5</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="servoI"
                                type="text"
                                value={formData.servoI}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Servo I</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="servo900"
                                type="text"
                                value={formData.servo900}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Servo 900</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="Tbird"
                                type="text"
                                value={formData.Tbird}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Tbird</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="pb840"
                                type="text"
                                value={formData.pb840}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">PB 840</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="vela"
                                type="text"
                                value={formData.vela}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Vela</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="npb740760"
                                type="text"
                                value={formData.npb740760}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">NPB 740-760</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="servo300"
                                type="text"
                                value={formData.servo300}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Servo 300</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="extend"
                                type="text"
                                value={formData.extend}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Extend</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="horus"
                                type="text"
                                value={formData.horus}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Horus</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="elisee"
                                type="text"
                                value={formData.elisee}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Elisée</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="vision"
                                type="text"
                                value={formData.vision}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Vision</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="v500"
                                type="text"
                                value={formData.v500}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">V500</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="avea"
                                type="text"
                                value={formData.avea}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Avea</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="engst"
                                type="text"
                                value={formData.engst}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Engström Carestation</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="autre"
                                type="text"
                                value={formData.autre}
                                onChange={handleChange}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Autre</span>
                        </div>
                    </div>
                </div>

                {/* ECMO Access Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Accès ECMO</h2>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Un accès à l’ECMO est-il possible dans votre établissement?
                        </label>
                        <select
                            name="ecmo"
                            value={formData.ecmo}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value=""></option>
                            <option value="non">Non</option>
                            <option value="oui">Oui</option>
                        </select>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Valider
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
