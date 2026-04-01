import type { Locale } from "./translations";

type LandingContent = {
  heroSectionLabel: string;
  heroSectionTitle: string;
  heroSectionDescription: string;
  heroHighlights: string[];
  heroCards: Array<{ eyebrow: string; title: string; body: string }>;
  promptSectionLabel: string;
  promptSectionTitle: string;
  promptSectionDescription: string;
  promptChecklist: string[];
  exampleSectionTitle: string;
  processTitle: string;
  processDescription: string;
  processSteps: Array<{ title: string; description: string }>;
  comparisonTitle: string;
  comparisonDescription: string;
  comparisonCards: Array<{ title: string; bullets: string[] }>;
  useCasesTitle: string;
  useCasesDescription: string;
  useCases: string[];
};

export const landingContent: Record<Locale, LandingContent> = {
  pl: {
    heroSectionLabel: "Jak to działa w praktyce",
    heroSectionTitle: "Werdykt bez chaosu rozmowy.",
    heroSectionDescription:
      "Najpierw porządkujemy problem, potem pokazujemy kompromisy. Pierwsze wrażenie ma prowadzić użytkownika przez produkt, a nie zasypywać go wszystkim naraz.",
    heroHighlights: ["3 kroki do raportu", "czytelny scoring opcji", "wynik gotowy do udostępnienia"],
    heroCards: [
      {
        eyebrow: "Szkic decyzji",
        title: "Wyjazd do Japonii",
        body: "System najpierw proponuje opcje, kryteria i braki informacyjne, a dopiero później przechodzi do werdyktu."
      },
      {
        eyebrow: "Tablica wyników",
        title: "69 / 100",
        body: "Punktacja pokazuje, która opcja prowadzi oraz gdzie pojawia się największy koszt kompromisu."
      }
    ],
    promptSectionLabel: "Uruchom analizę",
    promptSectionTitle: "Najpierw jedno pytanie. Resztę rozkładamy na części.",
    promptSectionDescription:
      "Formularz nie walczy o uwagę z całym produktem nad foldem. Najpierw wpisujesz dylemat, potem przechodzisz przez spokojnie rozłożone etapy.",
    promptChecklist: [
      "System zaproponuje opcje zamiast zmuszać Cię do ręcznego modelowania wszystkiego od zera.",
      "Przed analizą możesz poprawić kryteria, wagi i notatki, więc nie oddajesz pełnej kontroli modelowi.",
      "Końcowy wynik ma formę raportu porównawczego, a nie jednej długiej odpowiedzi."
    ],
    exampleSectionTitle: "Start od realnego dylematu, nie od pustego pola.",
    processTitle: "Jak to działa",
    processDescription:
      "Aplikacja prowadzi użytkownika przez konkretny proces zamiast zwracać jedną luźną odpowiedź.",
    processSteps: [
      {
        title: "1. Opisz problem",
        description: "Wpisujesz decyzję własnymi słowami, bez potrzeby prompt engineeringu."
      },
      {
        title: "2. Popraw ramę",
        description:
          "System proponuje opcje, kryteria i braki informacyjne, a Ty zatwierdzasz lub edytujesz je przed analizą."
      },
      {
        title: "3. Porównaj wynik",
        description: "Dostajesz punktowany raport z ryzykami, kompromisami i prowadzącą opcją."
      }
    ],
    comparisonTitle: "Dlaczego to nie jest po prostu chat",
    comparisonDescription:
      "Zwykły chat daje rozmowę. Decision Arena daje strukturę, porównanie i wynik, do którego da się wrócić.",
    comparisonCards: [
      {
        title: "Zwykły chat AI",
        bullets: [
          "jedna długa odpowiedź",
          "brak jawnych wag i kryteriów",
          "trudno porównać kilka opcji obok siebie"
        ]
      },
      {
        title: "Decision Arena",
        bullets: [
          "wymusza strukturę decyzji",
          "pokazuje opcje, kryteria i niewiadome",
          "zwraca raport z punktacją i werdyktem"
        ]
      }
    ],
    useCasesTitle: "Najlepsze zastosowania",
    useCasesDescription:
      "Najwięcej zyskasz tam, gdzie masz kilka sensownych opcji i chcesz zobaczyć kompromisy bardziej świadomie.",
    useCases: [
      "podróże i większe wydatki",
      "przeprowadzka lub zmiana mieszkania",
      "zakup auta lub droższego sprzętu",
      "decyzje zawodowe i edukacyjne",
      "dylematy rodzinne lub życiowe z wieloma ograniczeniami"
    ]
  },
  en: {
    heroSectionLabel: "How it works in practice",
    heroSectionTitle: "A verdict without chat chaos.",
    heroSectionDescription:
      "First the problem gets framed, then the tradeoffs become visible. The first impression should guide the user through the product instead of dumping everything at once.",
    heroHighlights: ["3 steps to a report", "clear option scoring", "share-ready outcome"],
    heroCards: [
      {
        eyebrow: "Decision draft",
        title: "Trip to Japan",
        body: "The system first proposes options, criteria, and missing information before it moves into the verdict."
      },
      {
        eyebrow: "Scoreboard",
        title: "69 / 100",
        body: "Scoring shows which option leads and where the biggest tradeoff cost appears."
      }
    ],
    promptSectionLabel: "Start the analysis",
    promptSectionTitle: "One question first. Then the app breaks it down.",
    promptSectionDescription:
      "The form does not compete with the entire product above the fold. First you describe the dilemma, then you move through calmer, staged sections.",
    promptChecklist: [
      "The system proposes options instead of forcing you to model everything from scratch.",
      "You can edit criteria, weights, and notes before analysis, so the model does not own the full decision.",
      "The final result is a comparison report, not one long answer."
    ],
    exampleSectionTitle: "Start with a real dilemma, not an empty text field.",
    processTitle: "How it works",
    processDescription: "The app leads the user through a concrete process instead of returning one loose answer.",
    processSteps: [
      {
        title: "1. Describe the problem",
        description: "You write the decision in plain language without needing any prompt engineering."
      },
      {
        title: "2. Fix the frame",
        description:
          "The system proposes options, criteria, and missing information, and you approve or edit them before analysis."
      },
      {
        title: "3. Compare the outcome",
        description: "You get a scored report with risks, tradeoffs, and a leading option."
      }
    ],
    comparisonTitle: "Why this is not just a chat",
    comparisonDescription:
      "A normal chat gives you a conversation. Decision Arena gives you structure, comparison, and a result you can revisit.",
    comparisonCards: [
      {
        title: "A normal AI chat",
        bullets: [
          "one long answer",
          "no explicit weights or criteria",
          "hard to compare multiple options side by side"
        ]
      },
      {
        title: "Decision Arena",
        bullets: [
          "forces a structured decision frame",
          "shows options, criteria, and unknowns",
          "returns a scored report with a verdict"
        ]
      }
    ],
    useCasesTitle: "Best use cases",
    useCasesDescription:
      "You get the most value when there are several realistic options and you want to understand tradeoffs more clearly.",
    useCases: [
      "travel and bigger purchases",
      "moving or changing apartments",
      "buying a car or expensive equipment",
      "career or learning choices",
      "family or life dilemmas with several constraints"
    ]
  }
};
