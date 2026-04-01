import type { Locale } from "./translations";

type LandingContent = {
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
