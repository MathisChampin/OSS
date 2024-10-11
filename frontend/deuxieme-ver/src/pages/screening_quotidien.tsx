import { useEffect, useState } from "react";

function ScreeningQuotidien() {
    const [username,    setUsername] = useState<string>("");
    const [hospitalName, setHospitalName] = useState<string>("");

    useEffect(() => {
        setUsername("hello");
        setHospitalName("ede")
        console.log("Screening Quotidien");
    }, []);
    return (
        <div>
           <div>
                <h1>Screening quotidien des malades présents et non admis</h1>
           </div>
           <div>
                <h1>Nombre de lits "réanimation" ouverts</h1>
                <p>Nom: {username}</p>
                <p>Nom de l'hospital: {hospitalName}</p>
           </div>
        </div>
    )
}

export default ScreeningQuotidien;
