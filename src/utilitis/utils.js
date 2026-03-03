
export const tipologiaVino = (fkTipologia) => {

    const tipologiaVino = {
        1: "rosso",
        2: "bianco",
        3: "bollicine",
        4: "rosè"
    };
    console.log("tipo " +fkTipologia)
    return tipologiaVino[fkTipologia];
};