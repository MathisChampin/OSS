import { useEffect } from "react";

function ScreeningQuotidien() {
    useEffect(() => {
        console.log("Screening Quotidien");
    }, []);
    return (
        <div>
           <div>
                <h1>Screening Quotidien</h1>
           </div>
           <div>
                <h1>Nombre de lits "réanimation" ouverts</h1>
           </div>
        </div>
    )
}

export default ScreeningQuotidien;
