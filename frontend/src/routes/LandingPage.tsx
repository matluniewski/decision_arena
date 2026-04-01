import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createDraft } from "../lib/api";
import { AppShell } from "../components/AppShell";

const EXAMPLE_PROMPTS = [
  "Czy pojechac do Japonii w tym roku, jesli mam ograniczony budzet?",
  "Czy kupic uzywane auto teraz, czy jeszcze poczekac?",
  "Czy przeprowadzic sie blizej rodziny, jesli oznacza to zmiane pracy?"
];

export function LandingPage() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState(EXAMPLE_PROMPTS[0]);

  const draftMutation = useMutation({
    mutationFn: createDraft,
    onSuccess: (draft) => navigate(`/build/${draft.draftId}`)
  });

  return (
    <AppShell
      eyebrow="Comparison-first decision tool"
      title="Turn a vague life choice into options, weights, and a verdict."
      description="Decision Arena is built for decisions that feel messy in a normal chat. It proposes options and criteria, lets you edit the frame, then returns a scored report you can share."
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
            What decision are you trying to make?
          </label>
          <textarea
            id="question"
            className="question-input"
            value={question}
            maxLength={280}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Should I go on this trip, buy this thing, move, stay, or wait?"
          />
          <div className="form-footer">
            <span className="helper-copy">{question.length}/280 characters</span>
            <button className="primary-button" disabled={draftMutation.isPending} type="submit">
              {draftMutation.isPending ? "Building draft..." : "Start analysis"}
            </button>
          </div>
          {draftMutation.error ? <p className="error-banner">{draftMutation.error.message}</p> : null}
        </form>
      </section>

      <section className="example-grid">
        {EXAMPLE_PROMPTS.map((prompt) => (
          <button key={prompt} className="example-card" type="button" onClick={() => setQuestion(prompt)}>
            <span className="panel-label">Example prompt</span>
            <strong>{prompt}</strong>
          </button>
        ))}
      </section>
    </AppShell>
  );
}
