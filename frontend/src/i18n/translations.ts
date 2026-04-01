export type Locale = "pl" | "en";

type TranslationSet = {
  appShell: {
    brand: string;
    badge: string;
    languageLabel: string;
    polish: string;
    english: string;
  };
  landing: {
    eyebrow: string;
    title: string;
    description: string;
    questionLabel: string;
    placeholder: string;
    characters: (current: number, max: number) => string;
    buildingDraft: string;
    startAnalysis: string;
    examplePromptLabel: string;
    examples: string[];
  };
  build: {
    stepEyebrow: string;
    title: string;
    description: string;
    loadingTitle: string;
    loadingDescription: string;
    loadingDraft: string;
    unavailableTitle: string;
    unavailableDescription: string;
    draftNotFound: string;
    decision: string;
    missingInfoTitle: string;
    extraContext: string;
    extraContextPlaceholder: string;
    runningAnalysis: string;
    generateVerdict: string;
    options: string;
    optionLabel: (index: number) => string;
    optionalNote: string;
    criteria: string;
    weight: string;
  };
  resultPage: {
    eyebrow: string;
    title: string;
    description: string;
    shareableResult: string;
    shareDescription: string;
    copyLink: string;
    loadingResult: string;
    resultLoadError: string;
  };
  resultView: {
    verdict: string;
    confidence: (level: string) => string;
    leadingOption: (label: string, score: number) => string;
    scoreboard: string;
    comparison: string;
    pros: string;
    cons: string;
    risks: string;
    unknowns: string;
    strong: string;
    balanced: string;
    fragile: string;
    weightShort: (weight: number) => string;
  };
};

export const translations: Record<Locale, TranslationSet> = {
  pl: {
    appShell: {
      brand: "Decision Arena",
      badge: "Ustrukturyzowane decyzje życiowe",
      languageLabel: "Język",
      polish: "PL",
      english: "EN"
    },
    landing: {
      eyebrow: "Narzędzie do porównywania decyzji",
      title: "Zamień niejasny życiowy dylemat w opcje, wagi i jasny werdykt.",
      description:
        "Decision Arena pomaga tam, gdzie zwykły chat bywa zbyt chaotyczny. Proponuje opcje i kryteria, pozwala poprawić ramę decyzji, a na końcu zwraca punktowany raport, który możesz udostępnić.",
      questionLabel: "Jaką decyzję próbujesz teraz podjąć?",
      placeholder: "Czy jechać w tę podróż, kupić tę rzecz, przeprowadzić się, zostać, czy jeszcze poczekać?",
      characters: (current, max) => `${current}/${max} znaków`,
      buildingDraft: "Budowanie szkicu...",
      startAnalysis: "Rozpocznij analizę",
      examplePromptLabel: "Przykładowy prompt",
      examples: [
        "Czy pojechać do Japonii w tym roku, jeśli mam ograniczony budżet?",
        "Czy kupić używane auto teraz, czy jeszcze poczekać?",
        "Czy przeprowadzić się bliżej rodziny, jeśli oznacza to zmianę pracy?"
      ]
    },
    build: {
      stepEyebrow: "Krok 2",
      title: "Zatwierdź ramę decyzji, zanim pojawi się werdykt.",
      description:
        "System zaproponował opcje i kryteria. Popraw wszystko, co brzmi nietrafnie, usuń słabe założenia i dodaj trochę kontekstu przed analizą.",
      loadingTitle: "Przygotowujemy ramę decyzji...",
      loadingDescription: "Pobieramy zaproponowane opcje i kryteria.",
      loadingDraft: "Ładowanie szkicu...",
      unavailableTitle: "Szkic jest niedostępny",
      unavailableDescription: "Nie udało się załadować tego szkicu.",
      draftNotFound: "Nie znaleziono szkicu.",
      decision: "Decyzja",
      missingInfoTitle: "Brakujące informacje wykryte przez system",
      extraContext: "Dodatkowy kontekst",
      extraContextPlaceholder:
        "Budżet, termin, obawa przed żalem, ograniczenia rodzinne, wszystko co ma znaczenie.",
      runningAnalysis: "Trwa analiza...",
      generateVerdict: "Wygeneruj werdykt",
      options: "Opcje",
      optionLabel: (index) => `Opcja ${index}`,
      optionalNote: "Opcjonalna notatka",
      criteria: "Kryteria",
      weight: "Waga"
    },
    resultPage: {
      eyebrow: "Krok 3",
      title: "Raport jest gotowy.",
      description:
        "Decision Arena zwraca raport porównawczy, który można udostępnić, zamiast luźnej rozmowy. Używaj go do porównywania kompromisów, a nie do oddawania osądu aplikacji.",
      shareableResult: "Wynik do udostępnienia",
      shareDescription: "Każdy, kto ma ten link, może otworzyć raport w trybie tylko do odczytu.",
      copyLink: "Kopiuj link",
      loadingResult: "Ładowanie wyniku...",
      resultLoadError: "Nie udało się załadować wyniku."
    },
    resultView: {
      verdict: "Werdykt",
      confidence: (level) => `Pewność: ${level}`,
      leadingOption: (label, score) => `Prowadzi opcja: ${label} z wynikiem ${score}/100`,
      scoreboard: "Tablica wyników",
      comparison: "Porównanie opcji",
      pros: "Plusy",
      cons: "Minusy",
      risks: "Ryzyka",
      unknowns: "Niewiadome",
      strong: "Mocna",
      balanced: "Zrównoważona",
      fragile: "Krucha",
      weightShort: (weight) => `w${weight}`
    }
  },
  en: {
    appShell: {
      brand: "Decision Arena",
      badge: "Structured life decisions",
      languageLabel: "Language",
      polish: "PL",
      english: "EN"
    },
    landing: {
      eyebrow: "Comparison-first decision tool",
      title: "Turn a vague life choice into options, weights, and a verdict.",
      description:
        "Decision Arena is built for decisions that feel messy in a normal chat. It proposes options and criteria, lets you edit the frame, then returns a scored report you can share.",
      questionLabel: "What decision are you trying to make?",
      placeholder: "Should I go on this trip, buy this thing, move, stay, or wait?",
      characters: (current, max) => `${current}/${max} characters`,
      buildingDraft: "Building draft...",
      startAnalysis: "Start analysis",
      examplePromptLabel: "Example prompt",
      examples: [
        "Should I go to Japan this year if my budget is limited?",
        "Should I buy a used car now or wait a bit longer?",
        "Should I move closer to my family if it means changing jobs?"
      ]
    },
    build: {
      stepEyebrow: "Step 2",
      title: "Approve the frame before the verdict is generated.",
      description:
        "The system proposed options and criteria. Edit anything that feels wrong, remove weak assumptions, and add a bit of context before analysis.",
      loadingTitle: "Preparing your decision frame...",
      loadingDescription: "Fetching the proposed options and criteria.",
      loadingDraft: "Loading draft...",
      unavailableTitle: "Draft unavailable",
      unavailableDescription: "This draft could not be loaded.",
      draftNotFound: "Draft not found.",
      decision: "Decision",
      missingInfoTitle: "Missing information flagged by the system",
      extraContext: "Extra context",
      extraContextPlaceholder:
        "Budget, timeline, fear of regret, family constraints, anything important.",
      runningAnalysis: "Running analysis...",
      generateVerdict: "Generate verdict",
      options: "Options",
      optionLabel: (index) => `Option ${index}`,
      optionalNote: "Optional note",
      criteria: "Criteria",
      weight: "Weight"
    },
    resultPage: {
      eyebrow: "Step 3",
      title: "Your report is ready.",
      description:
        "Decision Arena returns a shareable comparison report instead of a loose conversation. Use it to compare tradeoffs, not to outsource judgment.",
      shareableResult: "Shareable result",
      shareDescription: "Anyone with this link can open the report in read-only mode.",
      copyLink: "Copy link",
      loadingResult: "Loading result...",
      resultLoadError: "Result could not be loaded."
    },
    resultView: {
      verdict: "Verdict",
      confidence: (level) => `${level} confidence`,
      leadingOption: (label, score) => `Leading option: ${label} with ${score}/100`,
      scoreboard: "Scoreboard",
      comparison: "Option comparison",
      pros: "Pros",
      cons: "Cons",
      risks: "Risks",
      unknowns: "Unknowns",
      strong: "Strong",
      balanced: "Balanced",
      fragile: "Fragile",
      weightShort: (weight) => `w${weight}`
    }
  }
};
