export const en = {
  meta: {
    title: "Amsterdam Street Waste Pilot",
    skipToContent: "Skip to content",
  },
  nav: {
    problem: "Problem",
    idea: "The idea",
    map: "Map",
    faq: "FAQ",
    apply: "Request your Netjes",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  hero: {
    title: "Amsterdam is a mess. Together we're making Amsterdam Netjes.",
    lead: "The city has lost its grip on the waste problem. That makes sense — the issue has many sides, and none of them are easy to fix. With Netjes, we're trying to reduce litter in the streets.",
    primaryCta: "Request your Netjes",
    secondaryCta: "See the map",
    footnote: "A neighbourhood initiative for a cleaner Amsterdam.",
    sceneLabel:
      "Illustration of an Amsterdam street with canal houses, a bicycle and an Amsterdammertje. Garbage bags are covered by a weighted net, and a seagull watches from a rooftop.",
  },
  problem: {
    eyebrow: "The problem",
    title: "Every summer, the same thing happens.",
    lead: "In some parts of the city we still put our rubbish out on the street. Birds are drawn to it and leave a trail of litter across our streets. Our streets deserve better than this.",
    chainLabel: "How one bag turns into scattered waste",
    chain: [
      { title: "Rubbish is put out on the street." },
      { title: "Birds go after the rubbish." },
      { title: "Bags are torn open." },
      { title: "Waste spreads across the street." },
    ],
    sceneLabel:
      "Illustration of the same Amsterdam street without protection: garbage bags are torn open and litter is scattered across the pavement while seagulls pick at it.",
    compare: {
      label: "Slide to compare the street with litter and the clean street",
      hint: "Drag to see the clean street",
      cleanSceneLabel:
        "Illustration of the same Amsterdam street, clean: no bags or litter, flower planters by the bollards, bunting across the street and neighbours smiling and waving.",
    },
  },
  impact: {
    eyebrow: "Why it matters",
    title: "One opened bag can turn into a whole street's problem.",
    lead: "Keeping litter off the street is easier than you think. But you do need a Netje.",
    cardsHeading: "With Netjes we're hoping for:",
    cards: [
      {
        id: "streets",
        title: "Cleaner streets",
        text: "Waste stays in the bag.",
      },
      {
        id: "scatter",
        title: "Less scattered waste",
        text: "Less litter in gutters, canals and bike racks.",
      },
      {
        id: "cleanup",
        title: "Less cleaning up",
        text: "Less work for neighbours and street cleaners the morning after.",
      },
      {
        id: "birds",
        title: "Fewer birds feeding on waste",
        text: "Household waste stops being an easy meal for gulls.",
      },
      {
        id: "living",
        title: "A nicer place to live",
        text: "No more stepping around torn bags on your way out the door.",
      },
      {
        id: "visitors",
        title: "Better for everyone",
        text: "Better for residents and nature. Better for Amsterdam.",
      },
    ],
    compare: {
      label: "Comparison of what happens to a garbage bag with and without protection",
      without: {
        title: "Without Netjes",
        steps: ["Rubbish goes outside", "Birds", "Scattered waste", "Rubbish collected", "Cleanup"],
      },
      with: {
        title: "With Netjes",
        steps: ["Rubbish goes outside", "Under a Netje", "Rubbish collected on a clean street."],
      },
    },
  },
  solution: {
    eyebrow: "The idea",
    title: "A simple Netje between the birds and your rubbish.",
    paragraphs: [
      "Residents place their garbage bags at the usual collection spot and cover them with a protective net. Weighted edges keep the net in place, so birds can't reach the bags.",
      "The net can be tied to things already in the street — an Amsterdammertje, a tree or a lamppost. Collection works the same as before.",
    ],
    japan:
      "Inspired by the waste nets used on streets across Japan, where they've been a familiar sight for years.",
    japanArticleCta: "See how they do it in Japan",
    points: ["Cheaper than new wheelie bins or containers", "Rubbish can still easily be collected", "Share Netjes with your neighbours"],
    labels: {
      net: "Protective net",
      weights: "Weighted edge",
      bollard: "Amsterdammertje",
      bags: "Household bags",
    },
    sceneLabel:
      "Illustration showing garbage bags at the base of an Amsterdammertje, covered by a net with a weighted edge. Labels point to the net, the weighted edge, the bollard and the bags.",
  },
  how: {
    eyebrow: "How it works",
    title: "Keep your street tidy in four steps.",
    steps: [
      {
        title: "Request your Netjes",
        text: "We make your Netjes and bring them round in person.",
      },
      {
        title: "Put out your bags",
        text: "Place your garbage bags at the normal collection point.",
      },
      {
        title: "Cover them",
        text: "Pull the protective net over the bags.",
      },
      {
        title: "Keep the street clean",
        text: "Birds can't easily get to the bags, so waste stays put until collection.",
      },
    ],
  },
  map: {
    eyebrow: "The map",
    title: "See which streets have Netjes.",
    lead: "Step by step we're working to make the whole city Netjes again. See the progress here.",
    disclaimer: "Underground containers: open data from the Municipality of Amsterdam.",
    filtersLabel: "Show on map",
    showAll: "Show all",
    categories: {
      pilot: {
        label: "Pilot streets",
        description: "These streets have Netjes",
      },
      requested: {
        label: "Future Netjes",
        description: "Streets where Netjes are planned next — after sign-up and scheduling.",
      },
      streetCollection: {
        label: "Street collection",
        description: "Areas where bags are collected from the street.",
      },
      underground: {
        label: "Underground containers",
        description: "Every underground residual waste container in Amsterdam.",
      },
      otherCollection: {
        label: "Other collection",
        description: "Other drop-off points, such as recycling points.",
      },
      problemArea: {
        label: "Nuisance areas",
        description: "Areas where scattered waste is often reported.",
      },
    },
    mapLabel: "Interactive map of Amsterdam showing pilot streets and waste collection methods",
    applyPrompt: "Don't see your street?",
    applyLink: "Apply for the pilot",
  },
  apply: {
    eyebrow: "Get this on your street",
    title: "Want Netjes on your street too?",
    lead: [
      "Tell us where you are and how many Netjes you need. We make them to order and deliver them to you in person.",
    ],
    bullets: [
      "Your Netjes are still free for now",
      "Netjes are made to order",
      "Personal delivery",
    ],
    fields: {
      name: "Name",
      email: "Email",
      street: "Street",
      houseNumber: "House number",
      postcode: "Postcode",
      households: "Number of Netjes",
      message: "Message",
      optional: "optional",
      consent: "I agree that my details may be used to contact me about this pilot.",
    },
    placeholders: {
      name: "Your name",
      email: "you@example.com",
      street: "e.g. Tweede Jan Steenstraat",
      houseNumber: "e.g. 12",
      postcode: "1234 AB",
      message: "Anything we should know about your street?",
      select: "Choose an option",
    },
    households: [
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
    ],
    errors: {
      required: "Please fill this in.",
      email: "Please enter a valid email address.",
      postcode: "Please enter a Dutch postcode, like 1234 AB.",
      consent: "Please agree so we can contact you.",
      submit: "Something went wrong. Please try again.",
    },
    submit: "Apply for the pilot",
    submitting: "Sending…",
    success: {
      title: "Thanks — you're on the list.",
      text: "We'll be in touch when we're ready to test the pilot in your area.",
      again: "Sign up another street",
    },
  },
  stats: {
    eyebrow: "Pilot progress",
    title: "We're making Amsterdam Netjes again, one street at a time.",
    lead: "This is an experiment for a cleaner Amsterdam. The more streets take part, the better we can measure whether Netjes works.",
    items: {
      streets: "Streets participating",
      residents: "Netjes placed",
      areas: "Pilot areas",
    },
    demoNote: "Example figures — the pilot hasn't started yet.",
  },
  quote: {
    title: "Keep your street Netjes.",
    paragraphs: [
      "We know we can't solve Amsterdam's waste problem overnight. Birds, deposit collectors, and enormous pressure on the waste processing sector make it bigger than any one household or one block alone.",
      "What we can do is our part: protect bags that sit outside overnight, prevent mess, keep streets clean, and help mornings start clean again. That makes the problem more manageable and gives Amsterdammers a chance to take responsibility for their street.",
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions you might have.",
    items: [
      {
        q: "Why are birds opening garbage bags?",
        a: "Household waste often contains food. Gulls in particular are good at finding it, and a plastic bag left on the street — especially overnight — is easy to tear open.",
      },
      {
        q: "Why not just put the bags outside in the morning?",
        a: "That's the intended way, and it helps. In practice, bags often go out earlier. This pilot tests a simple extra step for when bags are already on the street.",
      },
      {
        q: "Is this an official Amsterdam solution?",
        a: "No. This is an independent pilot by residents. It is not endorsed by or affiliated with the Municipality of Amsterdam.",
      },
      {
        q: "How does the pilot work?",
        a: "We'll start with a small number of streets and residents. We'll try the nets, see what works and what doesn't, and share what we learn.",
      },
      {
        q: "Can my street participate?",
        a: "Yes, you can apply. Fill in the form and we'll get in touch when we're ready to test in your area.",
      },
    ],
    applyLink: "Go to the application form",
  },
  footer: {
    description: "An independent pilot to keep household waste off Amsterdam's streets. Started by residents, one street at a time.",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
    notAffiliated: "Not affiliated with the Municipality of Amsterdam.",
  },
};

export type Dictionary = typeof en;
