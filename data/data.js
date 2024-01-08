esitiFlow = [
    {
        "esito": "In Pericolo devi Bypassare",
        "descirizione": "Devi formarti te",
        "isFinale": true
    }
];

flowChart = [
    {
        "domanda": "Oggi va bene? Ordinato?",
        "si": 10,
        "no": 1
    },
    {
        "domanda": "Da piu' di 3 Mesi?",
        "si": 4,
        "no": 3
    },
    {
        "domanda": "Hai Rappresentanti con te?",
        "si": 5,
        "no": 6
    },
    {
        "domanda": "Sei Intervenuto?",
        "si": 2,
        "no": esitiFlow[0]
    },
];

