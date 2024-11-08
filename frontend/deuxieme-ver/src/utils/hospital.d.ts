export enum Activity {
    ADULT = "ADULT",
    PEDIATRIC = "PEDIATRIC",
}

export type ventilatorsType = {
    evita2: number;
    evitaIV: number;
    evitaXL: number;
    savina: number;
    evitaDura: number;
    npb7200: number;
    galileo: number;
    G5: number;
    servoI: number;
    servo900: number;
    bird8400: number;
    tBird: number;
    vela: number;
    npb740760: number;
    servo300: number;
    extend: number;
    horus: number;
    elisee: number;
    vision: number;
    V500: number;
    avea: number;
    engstrom: number;
};

export type material = {
    nbBedRea: number;
    nbBedInRoom: number;
    nbBedMntr: number;
    nbAdmis: number;
    nbPersonalAbs: number;
    ecmo: boolean;
    ventilators: ventilatorsType;
    devices: Array<{ quantity: number; name: string; }>;
};

export type HospitalDataType = {
    NomHospital: string;
    ville: string;
    Departement: string;
    IdentiteHopital: string;
    ReanimationMedical: string;
    ReanimationChirurgical: string;
    Activite: Activity;
    Active: string;
    NbDoctorUniv: number;
    NbDoctorHosp: number;
    NbInternal: number;
    NbDoctor: number;
    NbPersonalAbs: number;
    NbIdeDay: number;
    NbIdeNight: number;
    NbIdeDayUsc: number;
    NbIdeNightUsc: number;
    NbAsDay: number;
    NbAsNight: number;
    NbAsDayUsc: number;
    NbAsNightUsc: number;
    NbExecDay: number;
    NbIdeSick: number;
    NbAsSick: number;
    NbAppIde: number;
    NbAppAs: number;
    material: material;
};

export type joinData = {
    NomHospital: string;
    ville: string;
    Departement: string;
    IdentiteHopital: string;
    ReanimationMedical: string;
    ReanimationChirurgical: string;
    Activite: Activity;
    nom: string;
    prenom: string;
    role: string;
    email: string;
    password: string;
    NbDoctorUniv: number;
    NbDoctorHosp: number;
    NbInternal: number;
    NbDoctor: number;
    NbPersonalAbs: number;
    NbIdeDay: number;
    NbIdeNight: number;
    NbIdeDayUsc: number;
    NbIdeNightUsc: number;
    NbAsDay: number;
    NbAsNight: number;
    NbAsDayUsc: number;
    NbAsNightUsc: number;
    NbExecDay: number;
    NbIdeSick: number;
    NbAsSick: number;
    NbAppIde: number;
    NbAppAs: number;
    material: material;
};

export type HospitalRegister = {
    NomHospital: string;
    ville: string;
    Departement: string;
    IdentiteHopital: string;
    ReanimationMedical: string;
    ReanimationChirurgical: string;
    Activite: Activity;
};

export type UserRegister = {
    nom: string;
    prenom: string;
    role: string;
    email: string;
    ville: string;
    Departement: string;
    IdentiteHopital: string;
    ReanimationMedical: string;
    ReanimationChirurgical: string;
    Activite: string;
    password: string;
    NomHospital: string;
};

export type UserLogin = {
    email: string;
    password: string;
};

export type Patient = {
    patient: {
        gender: string;
        age: number;
        dateDeNaissance: Date;
        height: number;
        weight: number;
        hospital: string;
    };
    hospitalisation: {
        dateHospitalisation: Date;
        hospitalisationRéa: boolean;
        dateHospitalisationRéa: Date;
        typeDeService: string;
        modaliteEntree: string;
    };
};

export type pmedical = {
    NbDoctorUniv: number;
    NbDoctorHosp: number;
    NbInternal: number;
    NbDoctor: number;
    NbPersonalAbs: number;
};

export type pnomedical = {
    NbIdeDay: number;
    NbIdeNight: number;
    NbIdeDayUsc: number;
    NbIdeNightUsc: number;
    NbAsDay: number;
    NbAsNight: number;
    NbAsDayUsc: number;
    NbAsNightUsc: number;
    NbExecDay: number;
    NbIdeSick: number;
    NbAsSick: number;
    NbAppIde: number;
    NbAppAs: number;
};