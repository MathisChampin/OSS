import React from "react";
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
    nom_centre: string;
    ville: string;
    code_postal: string;
    id_hop: string;
    rea_usc: string;
    rea_usc_2: string;
    rea_sspi: string;
    rea_sspi_2: string;
    activite: string;
    nom: string;
    prenom: string;
    email: string;
    code: string;
    nb_medu: string;
    nb_medhosp: string;
    nb_int: string;
    nb_medpres: string;
    nb_etp_abs: string;
    nb_ide_jour: string;
    nb_ide_jour_usc: string;
    nb_ide_nuit: string;
    nb_ide_nuit_usc: string;
    nb_ash_jour: string;
    nb_ash_jour_usc: string;
    nb_ash_nuit: string;
    nb_ash_nuit_usc: string;
    nb_cadre_pres: string;
    nb_arret_ide: string;
    nb_arret_ash: string;
    nb_ide_renf: string;
    nb_ash_renf: string;
    nb_lits: string;
    nb_lits_surv: string;
    nb_admin: string;
    evitaII: string;
    evitaIV: string;
    evitaXL: string;
    savina: string;
    evitaIIdura: string;
    npb7200: string;
    galileo: string;
    G5: string;
    servoI: string;
    servo900: string;
    bird8400: string;
    Tbird: string;
    pb840: string;
    vela: string;
    npb740760: string;
    servo300: string;
    extend: string;
    horus: string;
    elisee: string;
    vision: string;
    v500: string;
    avea: string;
    engst: string;
    autre: string;
    ecmo: string;
};

const RegisterPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Enregistrez votre service
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Hospital Information Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Informations sur l'hôpital</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Nom de l'hôpital:
                            </label>
                            <input
                                type="text"
                                {...register('nom_centre', { required: "Nom de l'hôpital is required" })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.nom_centre ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.nom_centre && (
                                <span className="text-sm text-red-500">{errors.nom_centre.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Ville:
                            </label>
                            <input
                                type="text"
                                {...register('ville', { required: "Ville is required" })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.ville ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.ville && (
                                <span className="text-sm text-red-500">{errors.ville.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Département:
                            </label>
                            <input
                                type="text"
                                {...register('code_postal', { required: "Département is required", maxLength: { value: 2, message: "Max length is 2" } })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.code_postal ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.code_postal && (
                                <span className="text-sm text-red-500">{errors.code_postal.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Identité hôpital:
                            </label>
                            <select
                                {...register('id_hop', { required: "Identité hôpital is required" })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.id_hop ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value=""> </option>
                                <option value="CHU">CHU</option>
                                <option value="CHG">CHG</option>
                                <option value="CH">CH</option>
                                <option value="PSPH">PSPH</option>
                                <option value="Privé">Privé</option>
                            </select>
                            {errors.id_hop && (
                                <span className="text-sm text-red-500">{errors.id_hop.message}</span>
                            )}
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
                                {...register('rea_usc', { required: "Ce champ est requis" })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.rea_usc ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value=""></option>
                                <option value="Non">Non</option>
                                <option value="Oui">Oui</option>
                            </select>
                            {errors.rea_usc && (
                                <span className="text-sm text-red-500">{errors.rea_usc.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Type de réanimation médicale:
                            </label>
                            <select
                                {...register('rea_usc_2', { required: "Ce champ est requis" })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.rea_usc_2 ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value=""></option>
                                <option value="Médicale polyvalente">Médicale polyvalente</option>
                                <option value="Pneumologique">Pneumologique</option>
                                <option value="Nephrologique">Nephrologique</option>
                                <option value="Autres">Autres</option>
                            </select>
                            {errors.rea_usc_2 && (
                                <span className="text-sm text-red-500">{errors.rea_usc_2.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Réanimation et/ou USC-USI-SSPI chirurgicale:
                            </label>
                            <select
                                {...register('rea_sspi', { required: "Ce champ est requis" })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.rea_sspi ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value=""></option>
                                <option value="Non">Non</option>
                                <option value="Oui">Oui</option>
                            </select>
                            {errors.rea_sspi && (
                                <span className="text-sm text-red-500">{errors.rea_sspi.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Type de réanimation chirurgicale:
                            </label>
                            <select
                                {...register('rea_sspi_2', { required: "Ce champ est requis" })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.rea_sspi_2 ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value=""></option>
                                <option value="Chirurgicale">Chirurgicale</option>
                                <option value="Chirurgie cardiaque">Chirurgie cardiaque</option>
                                <option value="Digestive">Digestive</option>
                                <option value="Neurochirurgie">Neurochirurgie</option>
                                <option value="SSPI">SSPI</option>
                                <option value="Autre_sspi">Autre</option>
                            </select>
                            {errors.rea_sspi_2 && (
                                <span className="text-sm text-red-500">{errors.rea_sspi_2.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Activité:
                            </label>
                            <select
                                {...register('activite', { required: "Ce champ est requis" })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.activite ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value=""></option>
                                <option value="Adulte">Adulte</option>
                                <option value="Pédiatrique">Pédiatrique</option>
                            </select>
                            {errors.activite && (
                                <span className="text-sm text-red-500">{errors.activite.message}</span>
                            )}
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
                                type="text"
                                {...register('nom', { required: "Le nom est requis" })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.nom ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.nom && (
                                <span className="text-sm text-red-500">{errors.nom.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Prénom:
                            </label>
                            <input
                                type="text"
                                {...register('prenom', { required: "Le prénom est requis" })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.prenom ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.prenom && (
                                <span className="text-sm text-red-500">{errors.prenom.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                E-mail:
                            </label>
                            <input
                                type="email"
                                {...register('email', { 
                                    required: "L'email est requis",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Adresse email invalide"
                                    }
                                })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.email && (
                                <span className="text-sm text-red-500">{errors.email.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Code:
                            </label>
                            <input
                                type="text"
                                {...register('code')}
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
                                type="text"
                                {...register('evitaII')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Evita II</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('evitaIV')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Evita IV</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('evitaXL')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Evita XL</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('savina')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Savina</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('evitaIIdura')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Evita II Dura</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('npb7200')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">NPB 7200</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('galileo')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Galileo</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('G5')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">G5</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('servoI')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Servo I</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('servo900')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Servo 900</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('Tbird')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Tbird</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('pb840')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">PB 840</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('vela')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Vela</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('npb740760')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">NPB 740-760</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('servo300')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Servo 300</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('extend')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Extend</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('horus')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Horus</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('elisee')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Elisée</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('vision')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Vision</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('v500')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">V500</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('avea')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Avea</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('engst')}
                                className="w-12 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2">Engström Carestation</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                {...register('autre')}
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
                            Un accès à l'ECMO est-il possible dans votre établissement?
                        </label>
                        <select
                            {...register('ecmo', { required: "Ce champ est requis" })}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.ecmo ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value=""></option>
                            <option value="non">Non</option>
                            <option value="oui">Oui</option>
                        </select>
                        {errors.ecmo && (
                            <span className="text-sm text-red-500">{errors.ecmo.message}</span>
                        )}
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
