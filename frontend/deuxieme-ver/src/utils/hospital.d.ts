enum Activity {
    ADULT = "ADULT",
    PEDIATRIC = "PEDIATRIC",
}

type HospitalRegister = {
    NomHospital: string;
    ville: string;
    Departement: string;
    IdHospital: string;
    ReanimationMedical: string;
    ReanimationChirurgical: string;
    Activite: Activity;
}

type UserRegister = {
    nom: string;
    prenom: string;
    role: string;
    email: string;
    password: string;
    NomHospital: string;
}

type UserLogin = {
    email: string;
    password: string;
};

type Patient = {
    patient: {
        gender: string;
        age: number;
        dateDeNaissance: Date;
        heaight: number;
        weight: number;
        hospital: string;
    },
    hospitalisation: {
        dateHospitalisation: Date;
        hospitalisationRéa: boolean;
        dateHospitalisationRéa: Date;
        typeDeService: string;
        modaliteEntree: string;
    }
};

type pmedical = {
    NbDoctorUniv: number;
    NbDoctorHosp: number;
    NbInternal: number;
    NbDoctor: number;
    NbPersonalAbs: number;
};

type pnomedical = {
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

type material = {
    material: {
        nbBedRea: number;
        nbBedInRoom: number;
        nbBedMntr: number;
        nbAdmis: number;
        nbPersonalAbs: number;
        ecmo: boolean;
    },
    devices: [
        {
            quantity: number;
            name: string;
        }
    ]
}







export type RegisterHospitalInfo = {
    hospitalName: string;
    city: string;
    department: string;
    hospitalId: string;
    serviceType: string;
    reaUsc: string;
    activity: Activity;
    email: string;
    firstName: string;
    lastName: string;
    nbMedU: number;
    nbMedHosp: number;
    nbIntern: number;
    nbMedPres: number;
    nbMedAbs: number;
    nbIdeJour: number;
    nbIdeJourUsc: number;
    nbIdeNuit: number;
    nbIdeNuitUsc: number;
    nbAshJour: number;
    nbAshJourUsc: number;
    nbAshNuit: number;
    nbAshNuitUsc: number;
    nbCadrePres: number;
    nbArretIde: number;
    nbArretAsh: number;
    nbIdeRenf: number;
    nbAshRenf: number;
    nbLits: number;
    nbLitsSurv: number;
    lit1Rea: number;
    lit2Rea: number;
    litPlusRea: number;
    lit1Usc: number;
    lit2Usc: number;
    litPlusUsc: number;
    nbAdm: number;
    nbEvita: number;
    nbSavina: number;
    nbGalileo: number;
    nbServo900: number;
    nb840: number;
    nbServo300: number;
    nbElisée: number;
    nbAvea: number;
    nbEvita4: number;
    nbEvita2: number;
    nbEvita2Dura: number;
    nbG5: number;
    nbBird8400: number;
    nbVela: number;
    nbExtend: number;
    nbVision: number;
    nbEngström: number;
    nbEvitaXL: number;
    nb7200: number;
    nbServoI: number;
    nbbTbird: number;
    nb740_760: number;
    nbHorus: number;
    nbV500: number;
    nbAutre: number;
}