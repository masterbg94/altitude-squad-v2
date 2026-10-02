// EDIT THIS FILE: all text, contacts and SEO data live here.
export const site = {
  name: "Visinski radovi Dzonkula",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  city: "Beograd, Srbija",
  email: "hello@dzonkula.com",
  phone: "+381 63 810 27 81",
  tagline: "Alpinistički timovi za rad tamo gde lift ne može da stigne.",
  description:
    "Visinski radovi u Beogradu — pranje fasada, sanacija krova, bojenje konstrukcija i montaža na visini. Alpinistički pristup bez skele, sertifikovani tim. Besplatna ponuda!",
  services: [
    [
      "Pregledi i snimanje objekata",
      "Detaljne vizuelne provere, foto snimanja i izveštaji o stanju objekata tamo gde dron ili korpa ne mogu da priđu.",
      [
        "Pregled fasada, krovova i dimnjaka",
        "Snimanje mostova i konstrukcija",
        "Foto i video izveštaji",
        "Provera korozije i habanja",
      ],
    ],
    [
      "Nedestruktivno ispitivanje",
      "Ispitivanje na samoj konstrukciji, bez prethodne izrade pristupa.",
      [
        "Ultrazvučno merenje debljine",
        "Magnetna i penetrantna ispitivanja",
        "Vizuelni i vrtložni pregledi",
        "Pronađeni nedostaci u pisanom izveštaju",
      ],
    ],
    [
      "Čišćenje",
      "Čišćenje od vrha ka dnu površina koje su previsoke, prestrme ili preosetljive za mašine.",
      [
        "Pranje prozora i staklenih fasada",
        "Kamen, obloga i beton",
        "Industrijsko čišćenje i čišćenje posle gradnje",
        "Uklanjanje ptičjih gnezda i nečistoća",
      ],
    ],
    [
      "Popravke i održavanje",
      "Popravke na licu mesta, tako da objekat i dalje radi.",
      [
        "Popravka pukotina, spojeva i silikoniranje",
        "Sanacija hidroizolacije i termoizolacije",
        "Radovi na ankerima i nosačima",
        "Održavanje stena i kosina",
      ],
    ],
    [
      "Bojenje i zaštitni premazi",
      "Priprema površine i zaštitni premazi na čeliku i zidanju.",
      [
        "Peskarenje i priprema površine",
        "Zaštitni i dekorativni premazi",
        "Kontrola premaza",
        "Silosi, rezervoari, tornjevi i mostovi",
      ],
    ],
    [
      "Montaža na visini",
      "Postavljanje opreme i konstrukcija na visini.",
      [
        "Montaža reklama, banera i rasvete",
        "Kamere, antene i senzori",
        "Zaštitne mreže protiv ptica i sajle za zaštitu od pada",
        "Sigurnosni sistemi",
      ],
    ],
    [
      "Bezbednost i spašavanje",
      "Planiranje i dežurstvo za sve koji rade na visini ili u zatvorenim prostorima.",
      [
        "Timovi za spasavanje",
        "Planiranje pristupa",
        "Procena rizika i planovi rada",
        "Savetovanje o bezbednosti",
      ],
    ],
    [
      "Obuke",
      "Praktična obuka iz rada na užetu i spašavanja za vaše zaposlene.",
      ["Uvod u rad na užetu", "Vežbe spašavanja", "Osnove pregleda opreme"],
    ],
  ] as [string, string, string[]][],
  industries: [
    "Poslovne zgrade",
    "Mostovi i tuneli",
    "Industrijski objekti",
    "Dimnjaci i silosi",
    "Vetroelektrane i telekomunikacioni tornjevi",
    "Brane i kosine",
    "Crkve i spomenici kulture",
    "Stambene zgrade",
  ],
  faq: [
    [
      "Šta su visinski radovi?",
      "Visinski radovi su način rada na visini koji koristi dva odvojeno ankerisana užeta — radno i sigurnosno — uz alpinističke tehnike. Često zamenjuju skelu ili podizne platforme.",
    ],
    [
      "Da li su visinski radovi jeftiniji od skele?",
      "Često jeste. Ne postoji skela za izradu, zakup ili demontažu, a priprema traje sati umesto dana. Kod vrlo velikih ili dugotrajnih poslova skela i dalje može biti bolja — i to ćemo vam reći.",
    ],
    [
      "Da li radite zimi ili na vetru?",
      "Radimo u hladnom vremenu. Stajemo kada vetar, kiša ili led posao učine nesigurnim. Rezervni datum dogovaramo sa vama pre početka.",
    ],
    [
      "Da li imate osiguranje?",
      "Da. Zatražite od nas sertifikat i plan rada pre svakog posla.",
    ],
    [
      "Koliko brzo možete početi?",
      "Manji poslovi često počinju u roku od nedelju dana. Pošaljite adresu i fotografije pa ćemo uz ponudu dati i datum.",
    ],
  ] as [string, string][],
  reasons: [
    [
      "Mali tim, direktan kontakt",
      "Sa vama razgovaraju ljudi koji posao i izvode. Bez podizvođača.",
    ],
    [
      "Bezbednost na prvom mestu",
      "Dvostruki sistem užadi, dnevna provera opreme i plan spasavanja na svakom poslu.",
    ],
    [
      "Brže od skele",
      "Počinjemo za sati, ne za dane, i ne ostavljamo ništa za sobom.",
    ],
  ] as [string, string][],
  team: [
    ["Nikola", "Vođa tima", "Planiranje, pregledi i kontakt sa klijentima"],
    ["Ana", "Tehničar visinskih radova", "Popravka fasada i premazi"],
    ["Luka", "Tehničar visinskih radova", "Čišćenje i montaža"],
    [
      "Ivana",
      "Bezbednost i spašavanje",
      "Provera opreme i planiranje spašavanja",
    ],
  ] as [string, string, string][],
  steps: [
    [
      "Recite nam o objektu",
      "Pošaljite fotografije ili adresu i šta treba uraditi.",
    ],
    [
      "Obilazak lokacije i ponuda",
      "Proveravamo pristup i tačke ankerisanja, pa šaljemo fiksnu cenu.",
    ],
    [
      "Radovi na visini",
      "Postavljamo opremu, radimo i skidamo je. Objekat i dalje koristite.",
    ],
    ["Izveštaj", "Dobijate fotografije završenih radova i sve nalaze."],
  ] as [string, string][],
};
