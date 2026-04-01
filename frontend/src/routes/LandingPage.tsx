import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createDraft } from "../lib/api";
import { AppShell } from "../components/AppShell";
import { useI18n } from "../i18n/I18nProvider";
import { landingContent } from "../i18n/landingContent";
import { cx } from "../lib/cx";
import * as primitives from "../styles/primitives.css";
import * as styles from "./LandingPage.css";

export function LandingPage() {
  const navigate = useNavigate();
  const { locale, messages } = useI18n();
  const onboarding = landingContent[locale];
  const examplePrompts = messages.landing.examples;
  const [question, setQuestion] = useState(examplePrompts[0]);
  const [showAnchorBar, setShowAnchorBar] = useState(false);
  const [activeSection, setActiveSection] = useState("start");

  useEffect(() => {
    const sectionIds = onboarding.sectionNav.map((item) => item.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const startSection = document.getElementById("start");

    if (!sections.length || !startSection) {
      return undefined;
    }

    const updateNavigationState = () => {
      const anchorRevealOffset = 48;
      const sectionProbeLine = 180;
      const startRect = startSection.getBoundingClientRect();
      const shouldShowAnchorBar = startRect.bottom <= anchorRevealOffset;

      setShowAnchorBar(shouldShowAnchorBar);

      if (!shouldShowAnchorBar) {
        setActiveSection("start");
        return;
      }

      let currentSectionId = sectionIds[sectionIds.length - 1];

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= sectionProbeLine && rect.bottom > sectionProbeLine) {
          currentSectionId = section.id;
          break;
        }
      }

      setActiveSection(currentSectionId);
    };

    updateNavigationState();

    window.addEventListener("scroll", updateNavigationState, { passive: true });
    window.addEventListener("resize", updateNavigationState);

    return () => {
      window.removeEventListener("scroll", updateNavigationState);
      window.removeEventListener("resize", updateNavigationState);
    };
  }, [onboarding.sectionNav]);

  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!revealTargets.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealTargets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  const scrollToPrompt = () => {
    document.getElementById("start")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToExamples = () => {
    document.getElementById("examples")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const comparisonFooters =
    locale === "pl"
      ? [
          { label: "Efekt", value: "Długa odpowiedź" },
          { label: "Efekt", value: "Punktowany werdykt" }
        ]
      : [
          { label: "Output", value: "Long answer" },
          { label: "Result", value: "Scored verdict" }
        ];

  const draftMutation = useMutation({
    mutationFn: createDraft,
    onSuccess: (draft) => navigate(`/build/${draft.draftId}`)
  });

  return (
    <AppShell
      eyebrow={messages.landing.eyebrow}
      title={messages.landing.title}
      description={messages.landing.description}
      heroClassName={styles.heroShowcase}
      heroContentClassName={styles.heroContentShowcase}
      heroAside={
        <div className={styles.heroPreviewShell}>
          <div className={styles.heroPreviewMain}>
            <span className={primitives.sectionLabel}>{onboarding.heroSectionLabel}</span>
            <h2 className={styles.heroPreviewTitle}>{onboarding.heroSectionTitle}</h2>
            <p className={styles.previewBody}>{onboarding.heroSectionDescription}</p>
            <div className={styles.heroHighlightRow}>
              {onboarding.heroHighlights.map((highlight) => (
                <span key={highlight} className={styles.heroHighlightChip}>
                  {highlight}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.heroPreviewStack}>
            {onboarding.heroCards.map((card, index) => (
              <article
                key={card.title}
                className={cx(styles.heroPreviewCard, styles.heroPreviewCardOffset[(index + 1) as 1 | 2])}
              >
                <span className={primitives.sectionLabel}>{card.eyebrow}</span>
                <strong className={styles.heroPreviewCardTitle}>{card.title}</strong>
                <p className={styles.previewBody}>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      }
    >
      <div className={cx(styles.anchorBar, showAnchorBar && styles.anchorBarVisible)}>
        <div className={styles.anchorShell}>
          <nav className={styles.anchorNav} aria-label="Landing sections">
            {onboarding.sectionNav.map((item) => (
              <a
                key={item.id}
                className={cx(styles.anchorLink, activeSection === item.id && styles.anchorLinkActive)}
                href={`#${item.id}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button className={cx(primitives.secondaryButton, styles.anchorButton)} type="button" onClick={scrollToPrompt}>
            {onboarding.stickyCtaAction}
          </button>
        </div>
      </div>

      <section id="start" className={cx(styles.section, styles.introSection, styles.introGrid)}>
        <article className={cx(primitives.panel, styles.primaryPanel, styles.reveal, styles.revealDirection.up)} data-visible="true">
          <div className={cx(styles.sectionCopy, styles.promptIntro, styles.reveal, styles.revealDirection.up, styles.revealDelay[1])} data-visible="true">
            <span className={primitives.sectionLabel}>{onboarding.promptSectionLabel}</span>
            <h2 className={styles.heroPreviewTitle}>{onboarding.promptSectionTitle}</h2>
            <p className={primitives.bodyCopy}>{onboarding.promptSectionDescription}</p>
          </div>
          <form
            className={styles.promptForm}
            onSubmit={(event) => {
              event.preventDefault();
              draftMutation.mutate(question);
            }}
          >
            <label className={primitives.inputLabel} htmlFor="question">
              {messages.landing.questionLabel}
            </label>
            <textarea
              id="question"
              className={primitives.textareaInput}
              value={question}
              maxLength={280}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder={messages.landing.placeholder}
            />
            <div className={styles.formFooter}>
              <span className={primitives.helperCopy}>{messages.landing.characters(question.length, 280)}</span>
              <button className={primitives.primaryButton} disabled={draftMutation.isPending} type="submit">
                {draftMutation.isPending ? messages.landing.buildingDraft : messages.landing.startAnalysis}
              </button>
            </div>
            {draftMutation.error ? <p className={primitives.errorBanner}>{draftMutation.error.message}</p> : null}
          </form>
        </article>

        <aside className={cx(styles.sidePanel, styles.reveal, styles.revealDirection.right)} data-visible="true">
          <div className={cx(styles.sectionCopy, styles.reveal, styles.revealDirection.up, styles.revealDelay[1])} data-visible="true">
            <span className={primitives.sectionLabel}>{onboarding.promptAsideLabel}</span>
            <h2 className={styles.heroPreviewTitle}>{onboarding.promptAsideTitle}</h2>
            <p className={primitives.bodyCopy}>{onboarding.promptAsideDescription}</p>
          </div>
          <div className={styles.checklist}>
            {onboarding.promptChecklist.map((item) => (
              <div key={item} className={styles.checklistItem}>
                <span className={styles.checklistMark} aria-hidden="true">
                  +
                </span>
                <p className={styles.previewBody}>{item}</p>
              </div>
            ))}
          </div>
          <button className={primitives.secondaryButton} type="button" onClick={scrollToExamples}>
            {onboarding.promptAsideAction}
          </button>
        </aside>
      </section>

      <section id="examples" className={cx(styles.section, styles.spaciousSection)}>
        <div className={cx(styles.sectionCopy, styles.sectionCopyWide, styles.exampleHeader, styles.reveal, styles.revealDirection.up)} data-reveal>
          <span className={primitives.sectionLabel}>{messages.landing.examplePromptLabel}</span>
          <h2 className={styles.heroPreviewTitle}>{onboarding.exampleSectionTitle}</h2>
        </div>
        <div className={styles.exampleGrid}>
          {examplePrompts.map((prompt, index) => (
            <button
              key={prompt}
              className={cx(
                styles.exampleCard,
                styles.exampleCardOffset[(index + 1) as 1 | 2 | 3],
                styles.reveal,
                styles.revealDirection.up,
                styles.revealDelay[(index + 1) as 1 | 2 | 3]
              )}
              type="button"
              onClick={() => setQuestion(prompt)}
              data-reveal
            >
              <span className={primitives.sectionLabel}>{messages.landing.examplePromptLabel}</span>
              <span className={styles.exampleCardIndex}>{`0${index + 1}`}</span>
              <strong className={styles.exampleCardTitle}>{prompt}</strong>
            </button>
          ))}
        </div>
      </section>

      <section id="process" className={cx(styles.section, styles.spaciousSection, styles.infoSection)}>
        <div className={cx(styles.storyHeader, styles.reveal, styles.revealDirection.up)} data-reveal>
          <div className={styles.infoSectionHeader}>
            <span className={primitives.sectionLabel}>{onboarding.processTitle}</span>
            <h2 className={styles.storyTitle}>{onboarding.processTitle}</h2>
            <p className={primitives.bodyCopy}>{onboarding.processDescription}</p>
          </div>
          <div className={styles.storyOrbit} aria-hidden="true">
            <span className={styles.storyOrbitRing}></span>
            <span className={styles.storyOrbitCore}></span>
          </div>
        </div>
        <div className={styles.processGrid}>
          {onboarding.processSteps.map((step, index) => (
            <article
              key={step.title}
              className={cx(
                styles.processCard,
                styles.processCardOffset[(index + 1) as 1 | 2 | 3],
                styles.reveal,
                styles.revealDirection.left,
                styles.revealDelay[(index + 1) as 1 | 2 | 3]
              )}
              data-reveal
            >
              <span className={styles.processStepIndex}>{`0${index + 1}`}</span>
              <h3 className={styles.processCardTitle}>{step.title}</h3>
              <p className={styles.processCardBody}>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="comparison" className={cx(styles.section, styles.spaciousSection, styles.infoSection)}>
        <div className={cx(styles.infoSectionHeader, styles.comparisonHeader, styles.reveal, styles.revealDirection.up)} data-reveal>
          <span className={primitives.sectionLabel}>{onboarding.comparisonTitle}</span>
          <h2 className={styles.storyTitle}>{onboarding.comparisonTitle}</h2>
          <p className={primitives.bodyCopy}>{onboarding.comparisonDescription}</p>
        </div>
        <div className={styles.comparisonGrid}>
          {onboarding.comparisonCards.map((card, index) => (
            <article
              key={card.title}
              className={cx(
                styles.comparisonCard,
                index === 0 ? styles.comparisonTone.chat : styles.comparisonTone.arena,
                styles.reveal,
                index === 0 ? styles.revealDirection.left : styles.revealDirection.right,
                styles.revealDelay[(index + 1) as 1 | 2]
              )}
              data-reveal
            >
              <div className={styles.comparisonCardHeader}>
                <span className={styles.comparisonEyebrow}>{index === 0 ? "CHAT" : "ARENA"}</span>
                <h3 className={styles.comparisonCardTitle}>{card.title}</h3>
              </div>
              <div className={styles.comparisonDivider} />
              <ul className={styles.comparisonList}>
                {card.bullets.map((bullet) => (
                  <li key={bullet} className={styles.comparisonListItem}>
                    <span className={styles.comparisonListItemMark} aria-hidden="true">
                      {index === 0 ? "x" : "+"}
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.comparisonCardFooter}>
                <span className={styles.comparisonFooterLabel}>{comparisonFooters[index]?.label}</span>
                <span className={styles.comparisonFooterValue}>{comparisonFooters[index]?.value}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="use-cases" className={cx(styles.useCasesPanel, styles.section, styles.spaciousSection, styles.reveal, styles.revealDirection.up)} data-reveal>
        <div className={styles.infoSectionHeader}>
          <span className={primitives.sectionLabel}>{onboarding.useCasesTitle}</span>
          <h2 className={styles.storyTitle}>{onboarding.useCasesTitle}</h2>
          <p className={primitives.bodyCopy}>{onboarding.useCasesDescription}</p>
        </div>
        <div className={styles.useCasesGrid}>
          {onboarding.useCases.map((useCase, index) => (
            <article
              key={useCase}
              className={cx(
                styles.useCaseCard,
                index === 0 || index === 3 ? styles.useCaseSpan.wide : index === 1 || index === 2 || index === 4 ? styles.useCaseSpan.medium : styles.useCaseSpan.default,
                styles.reveal,
                styles.revealDirection.up,
                styles.revealDelay[((index % 4) + 1) as 1 | 2 | 3 | 4]
              )}
              data-reveal
            >
              <span className={styles.useCaseIndex}>{`0${index + 1}`}</span>
              <p className={styles.useCaseText}>{useCase}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cx(styles.ctaBand, styles.section, styles.reveal, styles.revealDirection.up)} data-reveal>
        <div className={styles.ctaCopy}>
          <span className={primitives.sectionLabel}>{onboarding.bottomCtaLabel}</span>
          <h2 className={styles.ctaTitle}>{onboarding.bottomCtaTitle}</h2>
          <p className={styles.ctaBody}>{onboarding.bottomCtaDescription}</p>
        </div>
        <div className={styles.ctaActions}>
          <button className={primitives.primaryButton} type="button" onClick={scrollToPrompt}>
            {messages.landing.startAnalysis}
          </button>
          <nav className={styles.ctaLinks} aria-label="Quick links">
            {onboarding.sectionNav.slice(1).map((item) => (
              <a key={item.id} href={`#${item.id}`} className={styles.ctaLink}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>
    </AppShell>
  );
}
