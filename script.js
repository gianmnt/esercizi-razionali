let esercizioCorrente = {};

function mostraSezione(id) {
    document.getElementById('calcolatore').style.display = id === 'calcolatore' ? 'block' : 'none';
    document.getElementById('esercizi').style.display = id === 'esercizi' ? 'block' : 'none';
    document.getElementById('output').innerHTML = "Pronto!";
}

function calcolaMCD(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { a %= b; [a, b] = [b, a]; }
    return a;
}

function calcolaMCM(a, b) {
    return (a === 0 || b === 0) ? 0 : Math.abs(a * b) / calcolaMCD(a, b);
}

function eseguiCalcolo(n1, d1, n2, d2, op) {
    let risN, risD, spiegazione = "";
    if (op === "piu" || op === "meno") {
        const mcm = calcolaMCM(d1, d2);
        const n1a = n1 * (mcm/d1); const n2a = n2 * (mcm/d2);
        risN = (op === "piu") ? n1a + n2a : n1a - n2a;
        risD = mcm;
        spiegazione = `Denominatore comune: ${mcm}. Numeratori: ${n1a} ${op==="piu"?"+":"-"} ${n2a} = ${risN}.`;
    } else if (op === "per") {
        risN = n1 * n2; risD = d1 * d2;
        spiegazione = `Moltiplico: ${n1}×${n2}=${risN} e ${d1}×${d2}=${risD}.`;
    } else {
        risN = n1 * d2; risD = d1 * n2;
        spiegazione = `Inverto e moltiplico: ${n1}×${d2}=${risN} e ${d1}×${n2}=${risD}.`;
    }
    const mcd = calcolaMCD(risN, risD);
    return { n: risN / mcd, d: risD / mcd, spiegazione: spiegazione + ` Semplificato: ${risN/mcd}/${risD/mcd}` };
}

function calcola() {
    const n1 = parseInt(document.getElementById('n1').value);
    const d1 = parseInt(document.getElementById('d1').value);
    const n2 = parseInt(document.getElementById('n2').value);
    const d2 = parseInt(document.getElementById('d2').value);
    const op = document.getElementById('operazione').value;
    if(isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2)) return;
    const ris = eseguiCalcolo(n1, d1, n2, d2, op);
    document.getElementById('output').innerHTML = `<b>Risultato: ${ris.d===1?ris.n:ris.n+"/"+ris.d}</b><br><small>${ris.spiegazione}</small>`;
}

function nuovoEsercizio() {
    const ops = ["piu", "meno", "per", "diviso"];
    const opSimboli = {"piu":"+", "meno":"-", "per":"\\cdot", "diviso":":"};
    const opRandom = ops[Math.floor(Math.random() * ops.length)];
    esercizioCorrente = {
        n1: Math.floor(Math.random() * 6) + 1, d1: Math.floor(Math.random() * 6) + 2,
        n2: Math.floor(Math.random() * 6) + 1, d2: Math.floor(Math.random() * 6) + 2,
        op: opRandom
    };
    document.getElementById('testo-esercizio').innerHTML = `Quanto fa: \\( \\frac{${esercizioCorrente.n1}}{${esercizioCorrente.d1}} ${opSimboli[opRandom]} \\frac{${esercizioCorrente.n2}}{${esercizioCorrente.d2}} \\) ?`;
    document.getElementById('output').innerHTML = "Scrivi la risposta semplificata.";
    if (window.MathJax) MathJax.typeset();
}

function controllaEsercizio() {
    const uN = parseInt(document.getElementById('ris-n').value);
    const uD = parseInt(document.getElementById('ris-d').value);
    const c = eseguiCalcolo(esercizioCorrente.n1, esercizioCorrente.d1, esercizioCorrente.n2, esercizioCorrente.d2, esercizioCorrente.op);
    if (uN === c.n && (uD === c.d || (c.d === 1 && (isNaN(uD) || uD === 1)))) {
        document.getElementById('output').innerHTML = "<b style='color:green;'>Corretto!</b>";
    } else {
        document.getElementById('output').innerHTML = `<b style='color:red;'>Errore.</b> Era ${c.n}/${c.d}.<br>${c.spiegazione}`;
    }
}

function resetTutto() {
    document.querySelectorAll('input').forEach(i => i.value = "");
}