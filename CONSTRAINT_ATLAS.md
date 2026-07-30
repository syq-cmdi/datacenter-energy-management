# Power-to-Chip Constraint Atlas

Twelve fully synthetic interface patterns for challenging a high-density rack
retrofit before a broad “AI-ready” claim hides the first limiting condition.

The atlas is a peer-review and teaching asset. It is not a record of observed
incidents, a code requirement, a design calculation or an approval. Declared
loads are teaching variables, not recommendations. Project evidence must remain
inside the project team; do not upload drawings, site identifiers, security
details or proprietary data.

## How to use one case

1. Read the trigger without assuming the upstream capacity claim is complete.
2. Challenge the hidden interface with the review question.
3. Trace the propagation path toward the rack objective.
4. Ask a qualified project team to review current project-controlled evidence.
5. Submit only a synthetic correction or a public primary-source challenge.

| Case | Dimension | Stage | Synthetic load | First constraint to challenge |
|---|---|---|---:|---|
| PTCA-001 | Power path | Concept screening | 120 kW | Continuous rating and derating are not confirmed end to end |
| PTCA-002 | Power path | Detailed design | 160 kW | The final rack-distribution interface sets the real limit |
| PTCA-003 | Cooling chain | Basis of design | 120 kW | Residual air load exceeds evidenced room-air capacity |
| PTCA-004 | Cooling chain | Resilience review | 200 kW | Nominally redundant CDUs share one heat-rejection branch |
| PTCA-005 | Cooling chain | Detailed design | 100 kW | Thermal and hydraulic operating windows do not overlap |
| PTCA-006 | Transition resilience | Sequence review | 120 kW | Cooling-control state is unknown after a power transition |
| PTCA-007 | Transition resilience | Resilience review | 240 kW | Independent mechanical trains share one controls dependency |
| PTCA-008 | Operations | Operations readiness | 120 kW | A critical alarm has no single response owner |
| PTCA-009 | Operations | Commissioning | 160 kW | IT and OT event records cannot establish one sequence |
| PTCA-010 | Operations | Commissioning planning | 80 kW | Recovery is claimed without integrated evidence |
| PTCA-011 | MEP coordination | Preconstruction | 120 kW | Equipment fit removes required service access |
| PTCA-012 | MEP coordination | Interface control | 200 kW | Leak response crosses an unowned interface |

## PTCA-001 — Apparent capacity, unverified continuous power path

- **Trigger:** The upstream capacity summary exceeds the proposed 120 kW rack load.
- **Hidden constraint:** A downstream element has no confirmed continuous
  rating or applicable derating basis for the declared operating condition.
- **Propagation:** Unverified downstream limit → local overload or protective
  action → rack power unavailable → workload interruption.
- **Minimum private evidence:** Current project one-line diagram, load schedule,
  equipment ratings, applicable derating statements and responsible-engineer
  conclusion.
- **Review question:** Which element has the lowest confirmed continuous
  capability across the complete source-to-rack path under the same declared
  conditions?

## PTCA-002 — Rack distribution interface sets the real limit

- **Trigger:** UPS and upstream distribution totals appear sufficient for a
  synthetic 160 kW rack.
- **Hidden constraint:** The proposed busway tap, connector, rack PDU or phase
  arrangement has not been shown to support the declared rack boundary.
- **Propagation:** Upstream capacity passes → downstream interface limit stays
  hidden → rack cannot use the declared capacity → retrofit objective fails.
- **Minimum private evidence:** Distribution schedule, interface ratings,
  connection concept, phase-loading statement and engineering disposition.
- **Review question:** What is the lowest verified rating between the final
  distribution point and the rack loads it is expected to serve?

## PTCA-003 — Residual air load has no declared capacity

- **Trigger:** Liquid cooling is assigned most of a synthetic 120 kW rack heat
  load.
- **Hidden constraint:** The scenario declares 12 kW of residual air heat, but
  only 8 kW of usable room-air capacity is evidenced at the review boundary.
- **Propagation:** 4 kW residual-air shortfall → local thermal condition leaves
  the declared basis → derating or interruption risk → rack objective is not
  demonstrated.
- **Minimum private evidence:** Declared liquid-to-air heat split, room-air
  capacity basis, boundary definition and qualified review conclusion.
- **Review question:** Where is every kilowatt outside the primary liquid path
  rejected, and what evidence supports that residual path?

## PTCA-004 — Redundant CDUs share one heat-rejection branch

- **Trigger:** Two CDUs are presented as independent capacity paths for a
  synthetic 200 kW load.
- **Hidden constraint:** Both paths depend on the same facility-water branch or
  another common heat-rejection element.
- **Propagation:** Shared facility dependency is lost → both CDU paths are
  constrained → chip heat removal falls → continuity objective is not met.
- **Minimum private evidence:** Hydraulic boundary, dependency map, equipment
  duty statement and failure-domain review.
- **Review question:** Which facility-water, heat-rejection, power and control
  dependencies remain common to the nominally separate cooling paths?

## PTCA-005 — Thermal and hydraulic windows do not overlap

- **Trigger:** Individual supplier limits appear acceptable when reviewed
  separately for a synthetic 100 kW load.
- **Hidden constraint:** The rack, CDU, facility-water system and room
  conditions do not yet share one demonstrated temperature, flow, pressure and
  environmental envelope.
- **Propagation:** Operating windows do not overlap → one subsystem leaves its
  declared range → cooling performance becomes uncertain → readiness cannot be
  confirmed.
- **Minimum private evidence:** Current manufacturer limits, project operating
  envelope comparison, design-condition statement and engineering disposition.
- **Review question:** What common operating region satisfies every coupled
  subsystem during normal and declared transition states?

## PTCA-006 — Cooling-control state is unknown after transition

- **Trigger:** Steady-state cooling calculations pass and the synthetic 120 kW
  load has a power-transition continuity objective.
- **Hidden constraint:** The post-transition state of pumps, valves, CDU
  controls, sensors and communications is not jointly defined or evidenced.
- **Propagation:** Power transition → control or communication state is
  uncertain → cooling response is delayed or unavailable → thermal continuity
  is not demonstrated.
- **Minimum private evidence:** Approved sequence of operations, dependency map,
  safe-state definition and qualified test or commissioning evidence.
- **Review question:** After the declared event, what state does each
  cooling-control element enter, and what evidence confirms coordinated
  recovery?

## PTCA-007 — Mechanical trains share one controls dependency

- **Trigger:** The diagram shows two nominally independent cooling trains for a
  synthetic 240 kW load.
- **Hidden constraint:** Both depend on one controller, network segment,
  gateway, time source or control-power supply.
- **Propagation:** Shared controls dependency is lost → both trains lose
  coordination or visibility → recovery becomes uncertain → independence is
  overstated.
- **Minimum private evidence:** Controls architecture, power-dependency map,
  failure-domain statement and qualified resilience review.
- **Review question:** Which controls, communications, time and control-power
  elements are common to both nominally independent paths?

## PTCA-008 — Critical alarm has no single response owner

- **Trigger:** A critical cooling or power alarm is visible in more than one
  monitoring system for a synthetic 120 kW rack.
- **Hidden constraint:** No role owns acknowledgement, escalation, decision
  authority and closure across IT and facility teams.
- **Propagation:** Alarm detected → ownership is ambiguous → response is delayed
  or duplicated → condition persists → service risk increases.
- **Minimum private evidence:** Alarm matrix, escalation record, operating
  procedure and training or exercise evidence.
- **Review question:** Who owns the alarm from detection through closure, and
  where are acknowledgement, escalation and decision rights recorded?

## PTCA-009 — IT and OT event records cannot be reconciled

- **Trigger:** A synthetic transition produces events in rack, electrical,
  mechanical and building-control systems.
- **Hidden constraint:** Records lack a common time basis or enough resolution
  to establish sequence and causality.
- **Propagation:** Timestamps cannot be aligned → the failure sequence stays
  ambiguous → corrective action targets the wrong dependency → recurrence risk
  remains.
- **Minimum private evidence:** Time-synchronization basis, event-log capability
  statement, test record and sanitized sequence reconstruction.
- **Review question:** Can the responsible team reconstruct one cross-domain
  event sequence without assuming which system acted first?

## PTCA-010 — Recovery objective lacks integrated evidence

- **Trigger:** Documents state that a synthetic 80 kW rack service should
  recover after a declared single-path event.
- **Hidden constraint:** Available records cover components, not coordinated
  recovery of power, cooling, controls, communications, alarms and operators.
- **Propagation:** Component checks pass → integrated interactions stay
  unobserved → recovery claim is unsupported → operational readiness remains
  open.
- **Minimum private evidence:** Approved integrated-test boundary, acceptance
  criteria, qualified risk controls, witnessed record, exception log and
  recovery disposition.
- **Review question:** What controlled evidence demonstrates the complete
  recovery sequence at the declared boundary rather than isolated component
  operation?

## PTCA-011 — Equipment fit removes required service access

- **Trigger:** Rack and support equipment fit inside the nominal floor
  footprint for a synthetic 120 kW case.
- **Hidden constraint:** Piping, cable containment, supports, panels,
  structure or adjacent equipment blocks an access or replacement route.
- **Propagation:** Geometric fit appears acceptable → service path is blocked →
  maintainability or safe intervention is impaired → availability objective
  weakens.
- **Minimum private evidence:** Coordinated project model or drawing,
  manufacturer access requirements, service-route review and discipline
  disposition.
- **Review question:** Can every maintainable or replaceable component be
  reached and removed within the coordinated final arrangement?

## PTCA-012 — Leak response crosses an unowned interface

- **Trigger:** A synthetic 200 kW liquid-cooling retrofit includes detection,
  containment, drainage, controls and operating response features.
- **Hidden constraint:** Responsibility is not accepted across one or more
  piping, detection, drainage, fire protection, controls, IT and operations
  boundaries.
- **Propagation:** Liquid event is detected or suspected → interface owner is
  unclear → containment or escalation is delayed → adjacent systems are
  affected → recovery responsibility is disputed.
- **Minimum private evidence:** Interface matrix, responsibility assignment,
  response philosophy, coordinated drawings and qualified review disposition.
- **Review question:** Who owns detection, notification, containment, drainage,
  equipment-state decisions and recovery at every liquid-response interface?

## Challenge one gate

A useful correction identifies one missing or misleading gate, explains why it
matters at a real project stage, and supplies a current primary source when
available. See [CONTRIBUTING.md](CONTRIBUTING.md).

Every case currently has the status **synthetic pattern; primary-source anchor
required**. Do not present a case as a universal requirement or an observed
failure.
