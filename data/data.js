const esitiFlow = [
  {
    "esito": "Bollino Verde",
    "emoticon": "🟢",
    "colore": "Green"
  },
  {
    "esito": "Bollino Rosso",
    "emoticon": "🔴",
    "colore": "Red"
  },
  {
    "esito": "Bollino Giallo",
    "emoticon": "🟡",
    "colore": "Yellow"
  },
  {
    "esito": "Bollino Blu",
    "emoticon": "🔵",
    "colore": "Blue"
  },
  {
    "esito": "Bollino Arancione",
    "emoticon": "🟠",
    "colore": "Orange"
  },
  {
    "esito": "Bollino Nero",
    "emoticon": "⚫️",
    "colore": "Black"
  }
];


flowChart = [
    {   //0
        "domanda": "La situazione del venduto degli ultimi 9 mesi, rispetto alle tue aspettative, la ritieni positiva e in linea pienamente con il budget?",
        "si": 7,
        "no": 1,
    },
    {   //1
        "domanda": "La situazione non positiva (o non come da aspettativa) è presente da più di 3 Mesi?",
        "si": 2,
        "no": 3,
    },
    {   //2
        "domanda": "Sei intervenuto direttamente per rimediare alla situazione?",
        "si": 3,
        "no": esitiFlow[1],
    },
    {   //3
        "domanda":  "Hai un reparto commerciale strutturato con una prima linea (che non sei tu) che ha la responsabilità sulle vendite?",
        "si": 4,
        "no": 13,
    },
    {   //4
        "domanda": "La tua area commerciale ha già attivato un piano di lavoro chiaro per determinare risultati più ottimali?",
        "si": 5,
        "no": esitiFlow[1],

    },
    {   //5
        "domanda": "Hai un sistema di monitoraggio dei risultati del venduto e dei sottoprodotti che lo compongono per comprendere i punti deboli del processo?",
        "si": 6,
        "no": esitiFlow[2],

    }, { //6
        "domanda": "Le statistiche del venduto, dopo l'attuazione del piano di lavoro, stanno migliorando?",
        "si": esitiFlow[0],
        "no": esitiFlow[2],

    },
    {   //7
        "domanda":  "Hai un reparto commerciale strutturato con una prima linea (che non sei tu) che ha la responsabilità sulle vendite?",
        "si": 8,
        "no": 13,
    },
    {   //8
        "domanda": "Il tuo reparto commerciale è così autonomo da non dover intervenire mai all'interno?",
        "si": 10,
        "no": 9,
    },
    {   //9
        "domanda": "Tutte le persone che compongono il reparto commerciale performano, sono alineate e crescono?",
        "si": esitiFlow[2],
        "no": esitiFlow[1],
    },
    {   //10
        "domanda": "Il tuo responsabile vendite ha una strategia commerciale chiara e che ha condiviso con il team?",
        "si": 11,
        "no": esitiFlow[4],
    },
    {   //11
        "domanda": "L'area commerciale conosce bene la concorrenza e sà come andare a prendere altre quote di mercato?",
        "si": 12,
        "no": esitiFlow[2],
    },
    {   //13
        "domanda": "Il budget 2023 che ti eri dato è stato raggiunto ?",
        "si": esitiFlow[0],
        "no": esitiFlow[1]
    },
    {   //13
        "domanda": "Hai già provato ad inserire un commerciale prima d'ora?",
        "si": 14,
        "no": esitiFlow[3],
    },
     {  //14
        "domanda": "Ritieni di avere sbagliato la scelta della persona?",
        "si": esitiFlow[3],
        "no": esitiFlow[4]
    }
];

