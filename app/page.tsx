"use client";

import { useMemo, useState } from "react";

type DimensionKey =
  | "power"
  | "cooling"
  | "resilience"
  | "operations"
  | "mep";

type FindingStatus =
  | "confirmed"
  | "validation"
  | "evidence"
  | "conflict"
  | "not_assessed";

type AssessmentContext = {
  stage: string;
  plannedKw: string;
  continuity: string;
  marginBasis: string;
};

type Option = {
  label: string;
  note: string;
  status: FindingStatus;
};

type Question = {
  id: string;
  label: string;
  prompt: string;
  options: Option[];
};

type Dimension = {
  key: DimensionKey;
  number: string;
  name: string;
  short: string;
  description: string;
  reviewQuestion: string;
  questions: Question[];
};

const fourLevel = (
  labels: [string, string, string, string],
  notes: [string, string, string, string],
  statuses: [FindingStatus, FindingStatus, FindingStatus, FindingStatus] = [
    "confirmed",
    "validation",
    "evidence",
    "conflict",
  ],
): Option[] =>
  labels.map((label, index) => ({
    label,
    note: notes[index],
    status: statuses[index],
  }));

const dimensions: Dimension[] = [
  {
    key: "power",
    number: "01",
    name: "Power path",
    short: "PWR",
    description: "Capacity, redundancy and the path from utility to rack.",
    reviewQuestion:
      "What is the measured usable kW margin at the utility, UPS, PDU and rack boundaries under the same design condition?",
    questions: [
      {
        id: "capacityAgainstBasis",
        label: "Capacity against the declared basis",
        prompt:
          "Does usable end-to-end capacity cover the planned IT and in-boundary support load?",
        options: fourLevel(
          [
            "Meets load + declared margin",
            "Meets load; no margin basis",
            "Evidence not available",
            "Below the planned load",
          ],
          [
            "Confirmed within basis",
            "Margin needs validation",
            "Critical evidence gap",
            "Known capacity conflict",
          ],
        ),
      },
      {
        id: "ratingEvidence",
        label: "Ratings and derating evidence",
        prompt:
          "How completely have continuous ratings and applicable derating been checked?",
        options: fourLevel(
          [
            "Full path documented after derating",
            "Only part of the path checked",
            "Evidence not available",
            "A known element exceeds its rating",
          ],
          [
            "Confirmed within basis",
            "Validation remains open",
            "Evidence gap",
            "Known rating conflict",
          ],
        ),
      },
      {
        id: "powerContinuity",
        label: "Power path continuity",
        prompt:
          "How does the topology compare with the declared continuity objective?",
        options: fourLevel(
          [
            "Two paths meet the objective",
            "Redundant components share a path",
            "Capacity only; continuity not assessed",
            "Known topology conflict",
          ],
          [
            "Objective supported",
            "Common-mode validation required",
            "Outside the declared basis",
            "Objective not supported",
          ],
          ["confirmed", "validation", "not_assessed", "conflict"],
        ),
      },
    ],
  },
  {
    key: "cooling",
    number: "02",
    name: "Cooling chain",
    short: "CLG",
    description: "Heat capture, liquid loop readiness and rejection margin.",
    reviewQuestion:
      "What minimum flow, pressure and temperature must be maintained from chip loop to heat rejection during every transition state?",
    questions: [
      {
        id: "liquidCapacity",
        label: "Primary cooling capacity",
        prompt:
          "Does usable cooling capacity cover the declared heat split and project margin?",
        options: fourLevel(
          [
            "Meets load + declared margin",
            "Meets load; no margin basis",
            "Evidence not available",
            "Below the declared load",
          ],
          [
            "Confirmed within basis",
            "Margin needs validation",
            "Critical evidence gap",
            "Known capacity conflict",
          ],
        ),
      },
      {
        id: "residualAirCapacity",
        label: "Residual air capacity",
        prompt:
          "After liquid heat capture, can room air systems carry the remaining heat?",
        options: fourLevel(
          [
            "Meets residual load + margin",
            "Meets load; no margin basis",
            "Evidence not available",
            "Below the residual load",
          ],
          [
            "Confirmed within basis",
            "Margin needs validation",
            "Critical evidence gap",
            "Known residual-air conflict",
          ],
        ),
      },
      {
        id: "thermalInterface",
        label: "End-to-end thermal interface",
        prompt:
          "Are temperature, flow, pressure, fluid and condensation limits reconciled jointly?",
        options: fourLevel(
          [
            "Joint operating envelope documented",
            "Subsystems checked separately",
            "Not assessed",
            "Known interface conflict",
          ],
          [
            "Cross-system basis confirmed",
            "Joint validation required",
            "Evidence gap",
            "Capacity claim invalidated",
          ],
        ),
      },
    ],
  },
  {
    key: "resilience",
    number: "03",
    name: "Transition resilience",
    short: "RES",
    description: "Electrical ride-through, thermal inertia and proof testing.",
    reviewQuestion:
      "Can the full facility chain keep the rack inside electrical and thermal limits from utility loss through stabilized recovery?",
    questions: [
      {
        id: "resiliencePowerPath",
        label: "Power path against objective",
        prompt:
          "Does the power topology support the continuity objective declared for this review?",
        options: fourLevel(
          [
            "Topology supports the objective",
            "Capacity only; continuity not assessed",
            "Evidence not available",
            "Known continuity conflict",
          ],
          [
            "Objective supported",
            "Outside the declared basis",
            "Critical evidence gap",
            "Objective not supported",
          ],
          ["confirmed", "not_assessed", "evidence", "conflict"],
        ),
      },
      {
        id: "resilienceCoolingPath",
        label: "Cooling path against objective",
        prompt:
          "Do pumps, CDU, heat rejection and controls avoid a shared failure domain?",
        options: fourLevel(
          [
            "Topology supports the objective",
            "Capacity only; continuity not assessed",
            "Evidence not available",
            "Known shared-path conflict",
          ],
          [
            "Objective supported",
            "Outside the declared basis",
            "Critical evidence gap",
            "Objective not supported",
          ],
          ["confirmed", "not_assessed", "evidence", "conflict"],
        ),
      },
      {
        id: "recoveryEvidence",
        label: "Recovery and failure evidence",
        prompt:
          "What evidence covers utility, UPS, pumps, CDU, controls and safe-state behavior together?",
        options: fourLevel(
          [
            "Representative recovery test passed",
            "Sequence documented but untested",
            "Evidence not available",
            "Known recovery sequence conflict",
          ],
          [
            "Observed behavior",
            "Validation remains open",
            "Evidence gap",
            "Objective cannot be met",
          ],
        ),
      },
    ],
  },
  {
    key: "operations",
    number: "04",
    name: "Operations",
    short: "OPS",
    description: "Telemetry, alarm ownership and practiced response.",
    reviewQuestion:
      "Which alarm is authoritative, who owns the first action and what shared evidence confirms the system has recovered?",
    questions: [
      {
        id: "telemetry",
        label: "IT / OT telemetry",
        prompt: "Can rack and facility events be correlated on one time base?",
        options: fourLevel(
          [
            "Integrated and trend-checked",
            "Integrated but not trend-checked",
            "Evidence not available",
            "No operational visibility planned",
          ],
          [
            "Operational evidence confirmed",
            "Validation remains open",
            "Evidence gap",
            "Stage advancement blocked later",
          ],
          ["confirmed", "validation", "evidence", "validation"],
        ),
      },
      {
        id: "alarmOwnership",
        label: "Alarm ownership",
        prompt: "Are first response and escalation boundaries documented?",
        options: fourLevel(
          [
            "Owners, thresholds and escalation tested",
            "Draft ownership exists",
            "Evidence not available",
            "No ownership or escalation path",
          ],
          [
            "Response basis confirmed",
            "Validation remains open",
            "Evidence gap",
            "Stage advancement blocked later",
          ],
          ["confirmed", "validation", "evidence", "validation"],
        ),
      },
      {
        id: "integratedTesting",
        label: "Integrated commissioning",
        prompt:
          "What evidence joins component tests into representative load and failure scenarios?",
        options: fourLevel(
          [
            "Representative tests passed",
            "Integrated plan approved, not complete",
            "Component tests only",
            "No integrated test evidence",
          ],
          [
            "Integrated behavior observed",
            "Validation remains open",
            "Cross-system evidence gap",
            "Stage advancement blocked later",
          ],
          ["confirmed", "validation", "validation", "evidence"],
        ),
      },
    ],
  },
  {
    key: "mep",
    number: "05",
    name: "MEP coordination",
    short: "MEP",
    description: "Interfaces, commissioning ownership and change control.",
    reviewQuestion:
      "Which party owns every electrical, liquid, controls, structural and commissioning boundary—and which version is contractually frozen?",
    questions: [
      {
        id: "physicalIntegration",
        label: "Physical integration",
        prompt:
          "Are equipment fit, structural support, service access and routes coordinated?",
        options: fourLevel(
          [
            "Coordinated and field verified",
            "Concept coordination complete",
            "Not assessed",
            "Known physical conflict",
          ],
          [
            "Integration basis confirmed",
            "Validation remains open",
            "Evidence gap",
            "Capacity assumptions may be invalid",
          ],
        ),
      },
      {
        id: "interfaceRegister",
        label: "Cross-discipline interface register",
        prompt:
          "Are owners, operating limits and acceptance criteria agreed at every boundary?",
        options: fourLevel(
          [
            "Interfaces and owners agreed",
            "Register exists; items remain open",
            "No interface register",
            "Known ownership conflict",
          ],
          [
            "Boundary basis confirmed",
            "Validation remains open",
            "Evidence gap",
            "Acceptance cannot be closed",
          ],
        ),
      },
      {
        id: "cutoverPlan",
        label: "Cutover and rollback plan",
        prompt:
          "Is there a constructible sequence with hold points, owners and a rollback path?",
        options: fourLevel(
          [
            "Detailed plan + rollback documented",
            "High-level sequence exists",
            "Not developed",
            "No feasible cutover path known",
          ],
          [
            "Execution basis confirmed",
            "Validation remains open",
            "Evidence gap",
            "Known constructability conflict",
          ],
        ),
      },
    ],
  },
];

const syntheticScenario: Record<string, FindingStatus> = {
  capacityAgainstBasis: "confirmed",
  ratingEvidence: "confirmed",
  powerContinuity: "confirmed",
  liquidCapacity: "confirmed",
  residualAirCapacity: "conflict",
  thermalInterface: "validation",
  resiliencePowerPath: "confirmed",
  resilienceCoolingPath: "conflict",
  recoveryEvidence: "validation",
  telemetry: "validation",
  alarmOwnership: "validation",
  integratedTesting: "validation",
  physicalIntegration: "confirmed",
  interfaceRegister: "validation",
  cutoverPlan: "validation",
};

const defaultContext: AssessmentContext = {
  stage: "Concept screening",
  plannedKw: "120",
  continuity: "Capacity only; planned interruption accepted",
  marginBasis: "No design margin declared",
};

const statusMeta: Record<
  FindingStatus,
  { label: string; short: string; className: string; severity: number }
> = {
  confirmed: {
    label: "No contradiction found at this screening level",
    short: "Confirmed",
    className: "good",
    severity: 0,
  },
  not_assessed: {
    label: "Outside the declared assessment basis",
    short: "Not assessed",
    className: "neutral",
    severity: 1,
  },
  validation: {
    label: "Validation required",
    short: "Validate",
    className: "watch",
    severity: 2,
  },
  evidence: {
    label: "Evidence gap at this stage",
    short: "Evidence gap",
    className: "evidence",
    severity: 3,
  },
  conflict: {
    label: "Known constraint",
    short: "Constraint",
    className: "risk",
    severity: 4,
  },
};

function constraintSignals(answers: Record<string, FindingStatus>) {
  const signals: string[] = [];

  if (answers.capacityAgainstBasis === "conflict") {
    signals.push(
      "Power path → rack enablement: the planned load cannot be enabled within the declared capacity basis.",
    );
  }
  if (answers.ratingEvidence === "conflict") {
    signals.push(
      "Continuous rating → capacity claim: a known rating or derating conflict invalidates the available-power claim.",
    );
  }
  if (
    answers.liquidCapacity === "conflict" ||
    answers.residualAirCapacity === "conflict"
  ) {
    signals.push(
      "Heat split → cooling capacity → rack acceptance: the target load cannot be thermally accepted within the declared basis.",
    );
  }
  if (answers.thermalInterface === "conflict") {
    signals.push(
      "Thermal interface → capacity claim → MEP coordination: the cooling claim remains invalid until the interface conflict is reconciled.",
    );
  }
  if (
    answers.resiliencePowerPath === "conflict" ||
    answers.resilienceCoolingPath === "conflict"
  ) {
    signals.push(
      "Shared dependency → path loss → continuity objective: the stated topology does not support the declared objective.",
    );
  }
  if (answers.physicalIntegration === "conflict") {
    signals.push(
      "Physical integration → power and cooling assumptions: fit, support or routing conflicts may invalidate otherwise acceptable capacity assumptions.",
    );
  }
  if (
    answers.telemetry !== "confirmed" ||
    answers.alarmOwnership !== "confirmed" ||
    answers.integratedTesting !== "confirmed"
  ) {
    signals.push(
      "Operational controls → integrated testing → stage gate: telemetry, ownership or representative testing remains open.",
    );
  }

  return signals.length
    ? signals.slice(0, 5)
    : [
        "No dominant constraint was identified by this screening. Preserve the evidence and verify assumptions through integrated design review.",
      ];
}

export default function Home() {
  const [answers, setAnswers] = useState<Record<string, FindingStatus>>({});
  const [context, setContext] = useState<AssessmentContext>(defaultContext);
  const [activeStep, setActiveStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  const totalQuestions = dimensions.reduce(
    (sum, dimension) => sum + dimension.questions.length,
    0,
  );
  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / totalQuestions) * 100);

  const dimensionSummaries = useMemo(() => {
    return dimensions.map((dimension) => {
      const statuses = dimension.questions
        .map((question) => answers[question.id])
        .filter((status): status is FindingStatus => Boolean(status));
      const worst =
        statuses.sort(
          (a, b) => statusMeta[b].severity - statusMeta[a].severity,
        )[0] ?? "evidence";
      const counts = {
        confirmed: statuses.filter((status) => status === "confirmed").length,
        validation: statuses.filter((status) => status === "validation").length,
        evidence: statuses.filter((status) => status === "evidence").length,
        conflict: statuses.filter((status) => status === "conflict").length,
        not_assessed: statuses.filter((status) => status === "not_assessed")
          .length,
      };
      return { ...dimension, status: worst, meta: statusMeta[worst], counts };
    });
  }, [answers]);

  const allStatuses = Object.values(answers);
  const overallStatus: FindingStatus = allStatuses.includes("conflict")
    ? "conflict"
    : allStatuses.includes("evidence")
      ? "evidence"
      : allStatuses.includes("validation") ||
          allStatuses.includes("not_assessed")
        ? "validation"
        : "confirmed";
  const overallMeta = statusMeta[overallStatus];
  const signals = constraintSignals(answers);
  const firstSignal = signals[0];
  const additionalSignals = signals.slice(1);

  const passport = useMemo(() => {
    const summaryLines = dimensionSummaries
      .map(
        (dimension) =>
          `${dimension.name}: ${dimension.meta.label} — ${dimension.counts.confirmed} confirmed, ${dimension.counts.validation} validations, ${dimension.counts.evidence} evidence gaps, ${dimension.counts.conflict} constraints`,
      )
      .join("\n");
    const additionalSignalLines = additionalSignals.length
      ? additionalSignals.map((signal) => `- ${signal}`).join("\n")
      : "- No additional propagation path was identified by this screening.";
    const questionLines = [...dimensionSummaries]
      .sort((a, b) => b.meta.severity - a.meta.severity)
      .map((dimension) => `- ${dimension.reviewQuestion}`)
      .join("\n");

    return `POWER-TO-CHIP DESIGN REVIEW PASSPORT
Assessment: High-density AI rack retrofit screening
Assessment stage: ${context.stage}
Planned rack IT load: ${context.plannedKw || "Not entered"} kW
Continuity objective: ${context.continuity}
Design margin basis: ${context.marginBasis}
Overall stage-gate signal: ${overallMeta.label}

DIMENSION SIGNALS
${summaryLines}

FIRST CONSTRAINT TO TEST
- ${firstSignal}

ADDITIONAL PROPAGATION PATHS
${additionalSignalLines}

NEXT DESIGN-REVIEW QUESTIONS
${questionLines}

Method note: Transparent categorical screening based on 15 qualitative inputs. No numerical readiness score is calculated. This is an educational triage tool, not a design calculation, certification, safety approval or substitute for qualified engineering review. Assessment values remain in the browser and are not submitted.`;
  }, [
    additionalSignals,
    context,
    dimensionSummaries,
    firstSignal,
    overallMeta.label,
  ]);

  const currentDimension = dimensions[activeStep];
  const currentComplete = currentDimension.questions.every(
    (question) => answers[question.id] !== undefined,
  );

  function selectAnswer(id: string, status: FindingStatus) {
    setAnswers((current) => ({ ...current, [id]: status }));
    setShowResults(false);
  }

  function loadSyntheticScenario() {
    setAnswers(syntheticScenario);
    setContext({
      stage: "Coordinated design",
      plannedKw: "120",
      continuity: "Service maintained after any single active-path failure",
      marginBasis: "Project requirement",
    });
    setActiveStep(dimensions.length - 1);
    setShowResults(true);
    setCopied(false);
  }

  function resetAssessment() {
    setAnswers({});
    setContext(defaultContext);
    setActiveStep(0);
    setShowResults(false);
    setCopied(false);
  }

  function continueAssessment() {
    if (activeStep < dimensions.length - 1) {
      setActiveStep((step) => step + 1);
      return;
    }
    setShowResults(true);
    window.setTimeout(
      () => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  }

  async function copyPassport() {
    await navigator.clipboard.writeText(passport);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Power-to-Chip home">
          <span className="brand-mark" aria-hidden="true">
            P/C
          </span>
          <span>Power-to-Chip</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#method">Method</a>
          <a href="#assessment">Assessment</a>
          <a href="#evidence">Evidence</a>
        </nav>
        <a className="header-cta" href="#assessment">
          Start the review
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">OPEN ENGINEERING SCREENING TOOL · v0.1</p>
          <h1>
            Can your facility carry the next <em>AI rack?</em>
          </h1>
          <p className="hero-lede">
            Translate a rack target into the five facility conversations that
            reveal confirmed assumptions, evidence gaps and known constraints.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#assessment">
              Run the 5-minute assessment
            </a>
            <button className="button secondary" onClick={loadSyntheticScenario}>
              View a synthetic 120 kW case
            </button>
          </div>
          <div className="trust-line" aria-label="Privacy and access promises">
            <span>No login</span>
            <span>No facility names</span>
            <span>Values stay in your browser</span>
          </div>
        </div>

        <div className="constraint-map" aria-label="Power to chip constraint map">
          <div className="map-head">
            <span>FACILITY CONSTRAINT MAP</span>
            <span className="live-dot">LOCAL ONLY</span>
          </div>
          <div className="map-path">
            {dimensions.map((dimension, index) => (
              <div className="map-row" key={dimension.key}>
                <div className="map-index">{dimension.number}</div>
                <div className="map-line">
                  <span>{dimension.short}</span>
                  <i style={{ width: `${82 - index * 8}%` }} />
                </div>
                <strong>{dimension.name}</strong>
              </div>
            ))}
          </div>
          <div className="map-target">
            <span>DECISION OUTPUT</span>
            <strong>Design Review Passport</strong>
            <small>Shared questions, not a black-box verdict</small>
          </div>
        </div>
      </section>

      <section className="method-section" id="method">
        <div className="section-label">
          <span>THE METHOD</span>
          <span>01 — 05</span>
        </div>
        <div className="section-heading">
          <h2>One rack. Five coupled systems.</h2>
          <p>
            A rack specification is not a facility design input until power,
            cooling, resilience, operations and MEP teams agree on the same
            boundaries.
          </p>
        </div>
        <div className="dimension-grid">
          {dimensions.map((dimension) => (
            <article key={dimension.key}>
              <span>{dimension.number}</span>
              <h3>{dimension.name}</h3>
              <p>{dimension.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="assessment-section" id="assessment">
        <div className="assessment-intro">
          <p className="eyebrow dark">PRIVATE, QUALITATIVE SCREENING</p>
          <h2>Build a shared starting point.</h2>
          <p>
            Use rounded design statements, not project identifiers. Every
            answer becomes confirmed, validation required, an evidence gap, a
            known constraint or outside the declared basis. No numerical
            readiness score is calculated.
          </p>
          <button className="text-button" onClick={loadSyntheticScenario}>
            Prefer to explore first? Load the synthetic case →
          </button>
        </div>

        <div className="assessment-panel">
          <div className="context-block">
            <div className="context-heading">
              <span>ASSESSMENT BOUNDARY</span>
              <small>Rounded, non-identifying values only</small>
            </div>
            <div className="context-grid">
              <label>
                <span>Assessment stage</span>
                <select
                  value={context.stage}
                  onChange={(event) =>
                    setContext((current) => ({
                      ...current,
                      stage: event.target.value,
                    }))
                  }
                >
                  <option>Concept screening</option>
                  <option>Coordinated design</option>
                  <option>Pre-commissioning</option>
                  <option>Operational change</option>
                </select>
              </label>
              <label>
                <span>Planned rack IT load</span>
                <div className="unit-input">
                  <input
                    aria-label="Planned rack IT load in kilowatts"
                    inputMode="numeric"
                    max="250"
                    min="1"
                    onChange={(event) =>
                      setContext((current) => ({
                        ...current,
                        plannedKw: event.target.value,
                      }))
                    }
                    type="number"
                    value={context.plannedKw}
                  />
                  <i>kW</i>
                </div>
              </label>
              <label>
                <span>Continuity objective</span>
                <select
                  value={context.continuity}
                  onChange={(event) =>
                    setContext((current) => ({
                      ...current,
                      continuity: event.target.value,
                    }))
                  }
                >
                  <option>Capacity only; planned interruption accepted</option>
                  <option>Service maintained during planned maintenance</option>
                  <option>
                    Service maintained after any single active-path failure
                  </option>
                </select>
              </label>
              <label>
                <span>Design margin basis</span>
                <select
                  value={context.marginBasis}
                  onChange={(event) =>
                    setContext((current) => ({
                      ...current,
                      marginBasis: event.target.value,
                    }))
                  }
                >
                  <option>No design margin declared</option>
                  <option>Project requirement</option>
                  <option>Organization standard</option>
                  <option>Other documented basis</option>
                </select>
              </label>
            </div>
          </div>

          <div className="progress-header">
            <div>
              <span>
                Dimension {activeStep + 1} of {dimensions.length}
              </span>
              <strong>{currentDimension.name}</strong>
            </div>
            <div className="progress-number">{progress}%</div>
          </div>
          <div className="progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>

          <div className="step-tabs" aria-label="Assessment dimensions">
            {dimensions.map((dimension, index) => (
              <button
                aria-current={index === activeStep ? "step" : undefined}
                className={index === activeStep ? "active" : ""}
                key={dimension.key}
                onClick={() => setActiveStep(index)}
              >
                {dimension.number}
              </button>
            ))}
          </div>

          <div className="question-list">
            {currentDimension.questions.map((question, questionIndex) => (
              <fieldset key={question.id}>
                <legend>
                  <span>0{questionIndex + 1}</span>
                  <div>
                    <strong>{question.label}</strong>
                    <small>{question.prompt}</small>
                  </div>
                </legend>
                <div className="options">
                  {question.options.map((option) => {
                    const selected = answers[question.id] === option.status;
                    return (
                      <button
                        aria-pressed={selected}
                        className={selected ? "selected" : ""}
                        key={option.label}
                        onClick={() =>
                          selectAnswer(question.id, option.status)
                        }
                        type="button"
                      >
                        <span>{option.label}</span>
                        <small>{option.note}</small>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="panel-actions">
            <button
              className="back-button"
              disabled={activeStep === 0}
              onClick={() => setActiveStep((step) => Math.max(0, step - 1))}
            >
              Back
            </button>
            <button
              className="continue-button"
              disabled={!currentComplete}
              onClick={continueAssessment}
            >
              {activeStep === dimensions.length - 1
                ? "Generate passport"
                : "Continue"}
            </button>
          </div>
        </div>
      </section>

      {showResults && answered === totalQuestions && (
        <section className="results-section" id="results">
          <div className="results-header">
            <div>
              <p className="eyebrow">DESIGN REVIEW PASSPORT</p>
              <h2>Your next meeting has an agenda.</h2>
            </div>
            <div className={`overall-score ${overallMeta.className}`}>
              <span aria-hidden="true">
                {overallStatus === "conflict"
                  ? "!"
                  : overallStatus === "evidence"
                    ? "?"
                    : "✓"}
              </span>
              <div>
                <small>STAGE-GATE SIGNAL</small>
                <strong>{overallMeta.label}</strong>
              </div>
            </div>
          </div>

          <div className="score-grid">
            {dimensionSummaries.map((dimension) => (
              <article key={dimension.key}>
                <div>
                  <span>{dimension.short}</span>
                  <strong className={dimension.meta.className}>
                    {dimension.meta.short}
                  </strong>
                </div>
                <div className={`score-bar ${dimension.meta.className}`}>
                  <i />
                </div>
                <p>
                  {dimension.counts.confirmed} confirmed ·{" "}
                  {dimension.counts.validation +
                    dimension.counts.evidence +
                    dimension.counts.conflict}{" "}
                  open
                </p>
              </article>
            ))}
          </div>

          <div className="result-columns">
            <article className="signal-card">
              <p className="card-kicker">FIRST CONSTRAINT TO TEST</p>
              <ol>
                <li>{firstSignal}</li>
              </ol>
              {additionalSignals.length > 0 && (
                <>
                  <p className="card-kicker">ADDITIONAL PROPAGATION PATHS</p>
                  <ol>
                    {additionalSignals.map((signal) => (
                      <li key={signal}>{signal}</li>
                    ))}
                  </ol>
                </>
              )}
            </article>
            <article className="question-card">
              <p className="card-kicker">FIVE QUESTIONS FOR DESIGN REVIEW</p>
              <ol>
                {[...dimensionSummaries]
                  .sort((a, b) => b.meta.severity - a.meta.severity)
                  .map((dimension) => (
                    <li key={dimension.key}>
                      <span>{dimension.short}</span>
                      {dimension.reviewQuestion}
                    </li>
                  ))}
              </ol>
            </article>
          </div>

          <div className="passport-actions">
            <button className="button light" onClick={copyPassport}>
              {copied ? "Passport copied" : "Copy review passport"}
            </button>
            <button className="button outline-light" onClick={() => window.print()}>
              Print / save as PDF
            </button>
            <button className="button ghost-light" onClick={resetAssessment}>
              Start again
            </button>
          </div>
        </section>
      )}

      <section className="handoff-section">
        <div>
          <p className="eyebrow dark">FROM SCREENING TO ENGINEERING</p>
          <h2>The tool identifies where to look. Depth lives elsewhere.</h2>
        </div>
        <div>
          <p>
            This open tool is intentionally narrow. For a systematic treatment
            of data-center power infrastructure, air and liquid cooling, AI
            operations and MEP coordination, the creator has written a separate
            technical reference.
          </p>
          <a
            className="book-link"
            href="https://www.amazon.com/dp/B0HB3F4P6Q"
            rel="noreferrer"
            target="_blank"
          >
            <span>
              Optional reference
              <strong>Modern Data Center Engineering</strong>
            </span>
            <i aria-hidden="true">↗</i>
          </a>
          <small>
            No part of this assessment requires a purchase, Kindle Unlimited
            reading or a review.
          </small>
        </div>
      </section>

      <section className="evidence-section" id="evidence">
        <div className="section-label">
          <span>EVIDENCE BASE</span>
          <span>PUBLIC SOURCES</span>
        </div>
        <div className="evidence-grid">
          <div>
            <h2>Built for questions that change with every rack generation.</h2>
            <p>
              This first release is a conversation scaffold. Thresholds are
              qualitative by design and must be replaced by project-specific
              calculations, vendor limits, codes and qualified engineering
              judgment.
            </p>
          </div>
          <ul>
            <li>
              <a
                href="https://www.iea.org/reports/energy-and-ai/executive-summary"
                rel="noreferrer"
                target="_blank"
              >
                IEA · Energy and AI
              </a>
              <span>Grid and capacity context</span>
            </li>
            <li>
              <a
                href="https://www.opencompute.org/community/open-data-centers-for-ai"
                rel="noreferrer"
                target="_blank"
              >
                OCP · Open Data Centers for AI
              </a>
              <span>Open facility interfaces</span>
            </li>
            <li>
              <a
                href="https://docs.nvidia.com/dgx/dgxgb200-user-guide/hardware.html"
                rel="noreferrer"
                target="_blank"
              >
                NVIDIA · DGX GB hardware guide
              </a>
              <span>High-density rack reference</span>
            </li>
            <li>
              <a
                href="https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025.AnnualSurvey.OutagesAI.3Pager.pdf?version=0"
                rel="noreferrer"
                target="_blank"
              >
                Uptime Institute · Outages & AI
              </a>
              <span>Operational resilience context</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="disclaimer">
        <strong>Important boundary</strong>
        <p>
          Educational screening only. Not a design calculation, certification,
          code review, commissioning approval or safety decision. Do not enter
          site names, addresses, capacities, drawings or other sensitive
          facility information. Assessment values are processed in your browser
          and are not submitted by this tool.
        </p>
      </section>

      <footer>
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            P/C
          </span>
          <span>Power-to-Chip Readiness Lab</span>
        </div>
        <p>Open diagnostic. Better engineering questions.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
