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
      heroClassName="hero hero-showcase"
      heroContentClassName="hero-content hero-content-showcase"
      heroAside={
        <div className="hero-preview-shell">
          <div className="hero-preview-panel hero-preview-main">
            <span className="panel-label">{onboarding.heroSectionLabel}</span>
            <h2>{onboarding.heroSectionTitle}</h2>
            <p>{onboarding.heroSectionDescription}</p>
            <div className="hero-highlight-row">
              {onboarding.heroHighlights.map((highlight) => (
                <span key={highlight} className="hero-highlight-chip">
                  {highlight}
                </span>
              ))}
            </div>
          </div>
          <div className="hero-preview-stack">
            {onboarding.heroCards.map((card, index) => (
              <article
                key={card.title}
                className={`hero-preview-panel hero-preview-card hero-preview-card-${index + 1}`}
              >
                <span className="panel-label">{card.eyebrow}</span>
                <strong>{card.title}</strong>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      }
    >
      <section className="landing-section landing-intro-grid">
        <article className="panel prompt-panel">
          <div className="section-copy">
            <span className="panel-label">{onboarding.promptSectionLabel}</span>
            <h2>{onboarding.promptSectionTitle}</h2>
            <p className="hero-copy">{onboarding.promptSectionDescription}</p>
          </div>
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
        </article>

        <aside className="panel landing-side-panel">
          <div className="section-copy">
            <span className="panel-label">{messages.landing.examplePromptLabel}</span>
            <h2>{messages.landing.startAnalysis}</h2>
          </div>
          <div className="landing-checklist">
            {onboarding.promptChecklist.map((item) => (
              <div key={item} className="landing-checklist-item">
                <span className="landing-checkmark" aria-hidden="true">
                  +
                </span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="landing-section">
        <div className="section-copy section-copy-wide">
          <span className="panel-label">{messages.landing.examplePromptLabel}</span>
          <h2>{onboarding.exampleSectionTitle}</h2>
        </div>
        <div className="example-grid example-grid-expanded">
          {examplePrompts.map((prompt) => (
            <button key={prompt} className="example-card" type="button" onClick={() => setQuestion(prompt)}>
              <span className="panel-label">{messages.landing.examplePromptLabel}</span>
              <strong>{prompt}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="landing-section info-section">
        <div className="info-section-header">
          <span className="panel-label">{onboarding.processTitle}</span>
          <p className="hero-copy">{onboarding.processDescription}</p>
        </div>
        <div className="insight-grid process-grid">
          {onboarding.processSteps.map((step) => (
            <article key={step.title} className="insight-card">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section info-section comparison-section">
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

      <section className="panel use-cases-panel landing-section">
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
