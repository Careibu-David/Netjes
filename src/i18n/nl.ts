import type { Dictionary } from "./en";

export const nl: Dictionary = {
  meta: {
    title: "Amsterdamse Straatafval Pilot",
    skipToContent: "Naar de inhoud",
  },
  nav: {
    problem: "Probleem",
    idea: "Het idee",
    map: "Kaart",
    faq: "Vragen",
    apply: "Vraag je Netjes aan",
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
    language: "Taal",
  },
  hero: {
    title: "Amsterdam is een rotzooi. Samen maken we Amsterdam Netjes.",
    lead: "De gemeente is de grip op het afvalprobleem kwijt. Logisch, het probleem heeft meerdere aspecten die allemaal moeiljk op te lossen zijn. Met Netjes proberen wij het zwerfafval in de straten te verminderen.",
    primaryCta: "Vraag je Netjes aan",
    secondaryCta: "Bekijk de kaart",
    footnote: "Een buurtinitiatief voor een schoner Amsterdam.",
    sceneLabel:
      "Illustratie van een Amsterdamse straat met grachtenpanden, een fiets en een Amsterdammertje. Vuilniszakken liggen onder een verzwaard net en een meeuw kijkt toe vanaf een dak.",
  },
  problem: {
    eyebrow: "Het probleem",
    title: "Elke zomer gebeurt hetzelfde.",
    lead: "We zetten ons vuilnis in sommige delen van de stad nog steeds op straat. Vogels komen hierop af en laten een spoor van zwerfvuil achter. Onze straten verdienen beter dan dit.",
    chainLabel: "Hoe één zak verandert in verspreid afval",
    chain: [
      { title: "Vuilnis wordt op straat gezet." },
      { title: "Vogels komen op het vuilnis af." },
      { title: "Zakken worden opengescheurd." },
      { title: "Afval wordt over de straat verspreid." },
    ],
    sceneLabel:
      "Illustratie van dezelfde Amsterdamse straat zonder bescherming: vuilniszakken zijn opengescheurd en afval ligt over de stoep terwijl meeuwen erin pikken.",
    compare: {
      label: "Schuif om de vervuilde en de schone straat te vergelijken",
      hint: "Sleep om de straat Netjes te maken",
      cleanSceneLabel:
        "Illustratie van dezelfde Amsterdamse straat, schoon: geen zakken of zwerfafval, bloembakken bij de paaltjes, vlaggetjes over de straat en buren die lachen en zwaaien.",
    },
  },
  impact: {
    eyebrow: "Waarom het ertoe doet",
    title: "Eén opengescheurde zak kan het probleem van de hele straat worden.",
    lead: "Voorkomen dat zwerfafval op straat komt is makkelijker dan je denkt. Maar je hebt wel een Netje nodig.",
    cardsHeading: "Met Netjes hopen we op:",
    cards: [
      {
        id: "streets",
        title: "Schonere straten",
        text: "Vuilnis blijft in de zak zitten.",
      },
      {
        id: "scatter",
        title: "Minder zwerfafval",
        text: "Minder rommel in je portiek, op je straat en in het water.",
      },
      {
        id: "cleanup",
        title: "Minder opruimen",
        text: "Minder werk voor buren en straatvegers de ochtend erna.",
      },
      {
        id: "birds",
        title: "Minder overlast van vogels",
        text: "Voor vogels wordt het minder interessant om te blijven als er minder afval op straat ligt.",
      },
      {
        id: "living",
        title: "Prettiger wonen",
        text: "Niet meer verrast worden in de ochtend door een straat die vol ligt met afval.",
      },
      {
        id: "visitors",
        title: "Beter voor iedereen",
        text: "Beter voor de bewoners en natuur. Beter voor Amsterdam.",
      },
    ],
    compare: {
      label: "Vergelijking van wat er met een vuilniszak gebeurt met en zonder bescherming",
      without: {
        title: "Zonder Netjes",
        steps: ["Vuilnis naar buiten", "Vogels", "Verspreid afval", "Vuilnis opgehaald", "Opruimen"],
      },
      with: {
        title: "Met Netjes",
        steps: ["Vuilnis naar buiten", "Onder een Netje", "Vuilnis opgehaald in een schone straat."],
      },
    },
  },
  solution: {
    eyebrow: "Het idee",
    title: "Een eenvoudig Netje tussen de vogels en je vuilnis.",
    paragraphs: [
      "Bewoners zetten hun vuilniszakken op de gewone ophaalplek en leggen er een beschermend net overheen. Verzwaarde randen houden het net op zijn plek, zodat vogels niet bij de zakken kunnen.",
      "Het net kan vast aan wat al in de straat staat — een Amsterdammertje, een boom of een lantaarnpaal. Het ophalen werkt precies zoals altijd.",
    ],
    japan:
      "Geïnspireerd op de afvalnetten die in Japan al jaren een vertrouwd beeld zijn op straat.",
    japanArticleCta: "Bekijk hoe ze het doen in Japan",
    points: ["Goedkoper dan nieuwe vuilnisbakken of containers", "Vuilnis kan nog steeds gemakkelijk worden opgehaald", "Netjes delen samen met je buren"],
    labels: {
      net: "Beschermend net",
      weights: "Verzwaarde rand",
      bollard: "Amsterdammertje",
      bags: "Huisvuilzakken",
    },
    sceneLabel:
      "Illustratie van vuilniszakken bij een Amsterdammertje, bedekt met een net met verzwaarde rand. Labels wijzen naar het net, de verzwaarde rand, het paaltje en de zakken.",
  },
  how: {
    eyebrow: "Hoe het werkt",
    title: "Houd je straat Netjes in vier stappen.",
    steps: [
      {
        title: "Vraag je Netjes aan",
        text: "Wij maken je Netjes en komen ze persoonlijk langsbrengen.",
      },
      {
        title: "Zet je zakken buiten",
        text: "Zet je vuilniszakken op de gewone ophaalplek.",
      },
      {
        title: "Leg je vuilnis onder een Netje",
        text: "Vuilnis is hierdoor niet bereikbaar voor vogels.",
      },
      {
        title: "Het vuilnis wordt opgehaald.",
        text: "Het vuilnis wordt gemakkelijk meegenomen door de gemeente.",
      },
    ],
  },
  map: {
    eyebrow: "De kaart",
    title: "Bekijk welke straten Netjes zijn.",
    lead: "Stap voor stap proberen we de hele stad weer Netjes te krijgen. Bekijk hier de vooruitgang.",
    disclaimer: "Ondergrondse containers: open data van de Gemeente Amsterdam.",
    filtersLabel: "Toon op kaart",
    showAll: "Alles tonen",
    categories: {
      pilot: {
        label: "Pilotstraten",
        description: "Deze straten zijn Netjes",
      },
      requested: {
        label: "Toekomstige Netjes",
        description: "Straten waar binnenkort Netjes komen.",
      },
      streetCollection: {
        label: "Aan de straat",
        description: "Gebieden waar zakken aan de straat worden opgehaald.",
      },
      underground: {
        label: "Ondergrondse containers",
        description: "Alle ondergrondse containers voor restafval in Amsterdam.",
      },
      otherCollection: {
        label: "Andere inzameling",
        description: "Andere inleverpunten, zoals recyclepunten.",
      },
      problemArea: {
        label: "Overlastgebieden",
        description: "Gebieden waar vaak zwerfafval wordt gemeld.",
      },
    },
    mapLabel: "Interactieve kaart van Amsterdam met pilotstraten en manieren van afvalinzameling",
    applyPrompt: "Staat jouw straat er niet tussen?",
    applyLink: "Meld je aan voor de pilot",
  },
  apply: {
    eyebrow: "Ook in jouw straat",
    title: "Wil je ook Netjes in je straat?",
    lead: [
      "Vertel ons waar en hoeveel Netjes je wil hebben. Wij maken ze per aanvraag en komen ze persoonlijk bij je afleveren.",
    ],
    bullets: [
      "Je Netjes zijn nu nog gratis",
      "Netjes worden per aanvraag gemaakt",
      "Persoonlijke aflevering",
    ],
    fields: {
      name: "Naam",
      email: "E-mail",
      street: "Straat",
      houseNumber: "Huisnummer",
      postcode: "Postcode",
      households: "Aantal Netjes",
      message: "Bericht",
      optional: "optioneel",
      consent: "Ik ga ermee akkoord dat mijn gegevens worden gebruikt om contact met mij op te nemen over deze pilot.",
    },
    placeholders: {
      name: "Je naam",
      email: "jij@voorbeeld.nl",
      street: "bijv. Tweede Jan Steenstraat",
      houseNumber: "bijv. 12",
      postcode: "1234 AB",
      message: "Is er iets dat we over jouw straat moeten weten?",
      select: "Kies een optie",
    },
    households: [
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
    ],
    errors: {
      required: "Vul dit veld in.",
      email: "Vul een geldig e-mailadres in.",
      postcode: "Vul een Nederlandse postcode in, zoals 1234 AB.",
      consent: "Geef toestemming zodat we contact kunnen opnemen.",
      submit: "Er ging iets mis. Probeer het opnieuw.",
    },
    submit: "Meld je aan voor de pilot",
    submitting: "Versturen…",
    success: {
      title: "Bedankt — je staat op de lijst.",
      text: "We nemen contact op zodra we de pilot in jouw buurt kunnen testen.",
      again: "Nog een straat aanmelden",
    },
  },
  stats: {
    eyebrow: "Voortgang",
    title: "We maken Amsterdam weer Netjes, straat voor straat.",
    lead: "Dit is een experiment voor een schoner Amsterdam. Hoe meer straten mee doen, hoe beter we kunnen meten of Netjes werken.",
    items: {
      streets: "Deelnemende straten",
      residents: "Geplaatste Netjes",
      areas: "Aangevraagde Netjes",
    },
    demoNote: "Voorbeeldcijfers — de pilot is nog niet gestart.",
  },
  quote: {
    title: "Houd je straat Netjes.",
    paragraphs: [
      "We weten dat we het afvalprobleem in Amsterdam niet in één keer kunnen oplossen. Vogels, statiegeldverzamelaars en enorme druk op de afvalverwerkingsector maken het groter dan één huishouden of één straat alleen.",
      "Wél kunnen we ervoor zorgen dat we ons deel doen: vuilnis dat 's nachts buiten staat beschermen, rommel voorkomen, zorgen dat straten schoon blijven en de ochtend weer netjes laten beginnen. Zo maken we het probleem behapbaarder en bieden we Amsterdammers de kans om verantwoordelijkheid te pakken voor hun straat.",
    ],
  },
  faq: {
    eyebrow: "Vragen",
    title: "Vragen die je misschien hebt.",
    items: [
      {
        q: "Waarom scheuren vogels vuilniszakken open?",
        a: "Huisvuil bevat vaak etensresten. Vooral meeuwen zijn er goed in om die te vinden, en een plastic zak op straat — zeker 's nachts — is makkelijk open te scheuren.",
      },
      {
        q: "Waarom zetten we de zakken niet gewoon 's ochtends buiten?",
        a: "Zo is het bedoeld, en dat helpt. In de praktijk gaan zakken vaak eerder naar buiten. Deze pilot test een eenvoudige extra stap voor als de zakken al op straat staan.",
      },
      {
        q: "Is dit een officiële oplossing van Amsterdam?",
        a: "Nee. Dit is een onafhankelijke pilot van bewoners. Het wordt niet ondersteund door en is niet verbonden aan de Gemeente Amsterdam.",
      },
      {
        q: "Hoe werkt de pilot?",
        a: "We beginnen met een klein aantal straten en bewoners. We proberen de netten uit, kijken wat werkt en wat niet, en delen wat we leren.",
      },
      {
        q: "Kan mijn straat meedoen?",
        a: "Ja, je kunt je aanmelden. Vul het formulier in en we nemen contact op zodra we in jouw buurt kunnen testen.",
      },
    ],
    applyLink: "Naar het aanmeldformulier",
  },
  footer: {
    description: "Een onafhankelijke pilot om huisvuil van de Amsterdamse straten te houden. Gestart door bewoners, straat voor straat.",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Voorwaarden",
    notAffiliated: "Niet verbonden aan de Gemeente Amsterdam.",
  },
};
