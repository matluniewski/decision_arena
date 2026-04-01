import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createDraft } from "../lib/api";
import { AppShell } from "../components/AppShell";
import { useI18n } from "../i18n/I18nProvider";
import { landingContent } from "../i18n/landingContent";

export function LandingPage() {
  const navigate = useNavigate();
  const { locale, messages } = useI18n();
  const onboarding = landingContent[locale];
  const examplePrompts = messages.landing.examples;
  const [question, setQuestion] = useState(examplePrompts[0]);

  const draftMutation = useMutation({
    mutationFn: createDraft,
    onSuccess: (draft) => navigate(`/build/${draft.draftId}`)
  });

  return (
    <AppShell
      eyebrow={messages.landing.eyebrow}
      title={messages.landing.title}
      description={messages.landing.description}
    >
      <section className="panel prompt-panel">
        <form
          className="prompt-form"
          onSubmit={(event) => {
            event.preventDefault();
            draftMutation.mutate(question);
          }}
        >
          <label className="input-label" htmlFor="question">
            {messages.landing.questionLabel}
          </label>
          <textarea
            id="question"
            className="question-input"
            value={question}
            maxLength={280}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder={messages.landing.placeholder}
          />
          <div className="form-footer">
            <span className="helper-copy">{messages.landing.characters(question.length, 280)}</span>
            <button className="primary-button" disabled={draftMutation.isPending} type="submit">
              {draftMutation.isPending ? messages.landing.buildingDraft : messages.landing.startAnalysis}
            </button>
          </div>
          {draftMutation.error ? <p className="error-banner">{draftMutation.error.message}</p> : null}
        </form>
      </section>

      <section className="example-grid">
        {examplePrompts.map((prompt) => (
          <button key={prompt} className="example-card" type="button" onClick={() => setQuestion(prompt)}>
            <span className="panel-label">{messages.landing.examplePromptLabel}</span>
            <strong>{prompt}</strong>
          </button>
        ))}
      </section>

      <section className="info-section">
        <div className="info-section-header">
          <span className="panel-label">{onboarding.processTitle}</span>
          <p className="hero-copy">{onboarding.processDescription}</p>
        </div>
        <div className="insight-grid">
          {onboarding.processSteps.map((step) => (
            <article key={step.title} className="insight-card">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="info-section">
        <div className="info-section-header">
          <span className="panel-label">{onboarding.comparisonTitle}</span>
          <p className="hero-copy">{onboarding.comparisonDescription}</p>
        </div>
        <div className="insight-grid comparison-grid">
          {onboarding.comparisonCards.map((card) => (
            <article key={card.title} className="insight-card comparison-card">
              <h3>{card.title}</h3>
              <ul>
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="panel use-cases-panel">
        <div className="info-section-header">
          <span className="panel-label">{onboarding.useCasesTitle}</span>
          <p className="hero-copy">{onboarding.useCasesDescription}</p>
        </div>
        <div className="use-cases-list">
          {onboarding.useCases.map((useCase) => (
            <span key={useCase} className="use-case-chip">
              {useCase}
            </span>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
