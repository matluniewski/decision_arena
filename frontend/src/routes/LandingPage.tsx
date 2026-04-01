import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createDraft } from "../lib/api";
import { AppShell } from "../components/AppShell";
import { useI18n } from "../i18n/I18nProvider";

export function LandingPage() {
  const navigate = useNavigate();
  const { messages } = useI18n();
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
    </AppShell>
  );
}
