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
    {
        "domanda": "La situazione del venduto degli ultimi 9 mesi, rispetto alle tue aspettative, la ritieni positiva e in linea pienamente con il budget?",
        "si": 6,
        "no": 1
    },
    {
        "domanda": "La situazione non positiva (o non come da aspettativa) è presente da piu' di 3 Mesi?",
        "si": 2,
        "no": 6,
    },
    {
        "domanda": "Sei intervenuto direttamente per rimediare alla situazione?",
        "si": 6,
        "no": esitiFlow[1],
    },
    {
        "domanda": "La tua area commerciale ha già attivato un piano di lavoro chiaro per determinare risultati più ottimali?",
        "si": 4,
        "no": esitiFlow[1]

    },
    {
        "domanda": "Hai un sistema di monitoraggio dei risultati del venduto e dei sottoprodotti che lo compongono per comprendere i punti deboli del processo?",
        "si": 5,
        "no": esitiFlow[2]

    }, {
        "domanda": "Le statistiche del venduto, dopo l'attuazione del piano di lavoro, stanno migliorando?",
        "si": esitiFlow[0],
        "no": esitiFlow[2]

    },
    {
        "domanda":  "Hai un reparto commerciale strutturato con una prima linea (che non sei tu) che ha la responsabilità sulle vendite?",
        "si": 7,
        "no": 12
    },
    {
        "domanda": "Il tuo reparto commerciale è così autonomo da non dover intervenire mai all'interno?",
        "si": 9,
        "no": 8
    },
    {
        "domanda": "Tutte le persone che compongono il reparto commerciale performano, sono alineate e crescono?",
        "si": esitiFlow[2],
        "no": esitiFlow[1]
    },
    {
        "domanda": "Il tuo responsabile vendite ha una strategia commerciale chiara e che ha condiviso con il team?",
        "si": 10,
        "no": esitiFlow[4]
    },
    {
        "domanda": "L'area commerciale conosce bene la concorrenza e sà come andare a prendere altre quote di mercato?",
        "si": 11,
        "no": esitiFlow[2]
    },
    {
        "domanda": "Il budget 2023 che ti eri dato è stato raggiunto ?",
        "si": esitiFlow[0],
        "no": esitiFlow[1]
    },
    {
        "domanda": "Hai già provato ad inserire un commerciale prima d'ora?",
        "si": 13,
        "no": esitiFlow[3]
    },
     {
        "domanda": "Ritieni di avere sbagliato la scelta della persona?",
        "si": esitiFlow[3],
        "no": esitiFlow[4]
    }
];

