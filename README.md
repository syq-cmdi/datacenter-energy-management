# Power-to-Chip Readiness Lab

An open, vendor-neutral stage-gate screen for existing facilities being
considered for high-density AI racks.

The lab does not answer “Is this facility AI-ready?” with a percentage or
badge. It turns a proposed rack load and continuity objective into a reviewable
map of:

- confirmed statements;
- validations still required;
- evidence gaps;
- known constraints; and
- items outside the declared assessment basis.

## The one-minute outcome

The product is not a readiness score. It is a **First Constraint Finder**:
identify the first interface worth challenging, show how that constraint can
propagate toward the rack objective, and leave with the questions and evidence
needed for the next design review.

Browse the [Constraint Atlas](CONSTRAINT_ATLAS.md) for 12 fully synthetic
power, cooling, controls, operations and MEP patterns. The atlas is a teaching
and peer-review asset, not a catalogue of observed incidents or code
requirements.

## Five coupled dimensions

1. **Power path** — capacity, continuous ratings, derating and continuity.
2. **Cooling chain** — primary heat removal, residual air load and the joint
   thermal/fluid operating envelope.
3. **Transition resilience** — independent paths, shared failure domains,
   safe-state behavior and recovery evidence.
4. **Operations** — IT/OT telemetry, alarm ownership and integrated testing.
5. **MEP coordination** — physical integration, interface ownership, cutover
   and rollback.

## What the tool produces

- a categorical stage-gate signal;
- the first constraint or evidence gap to test;
- one status for each dimension;
- additional constraint propagation paths;
- five questions for the next design review; and
- a copyable or printable Design Review Passport.

The current release includes a fully synthetic 120 kW rack-retrofit example.

## Privacy boundary

The assessment runs in the browser. It has no account, email form, database or
analytics collector. Assessment values are not submitted by the application.

Use rounded design statements only. Do not enter facility names, addresses,
customers, asset identifiers, one-line diagrams, credentials, security
configurations or other site-identifying or security-sensitive information.

## Help validate v0.1

The useful contribution is a specific correction, not an endorsement.

Please use synthetic or properly sanitized information and identify:

1. the dimension and question;
2. the missing or misleading gate;
3. why it matters at a real project stage; and
4. a current primary source when available.

See [CONTRIBUTING.md](CONTRIBUTING.md) and the Validation Feedback issue
template before submitting.

## Run locally

```bash
npm install
npm run dev
npm test
```

## Important limitation

Educational screening only. The result is not a design approval, calculation
package, code review, compliance finding, commissioning record, safety
assessment or authorization to energize or operate equipment. Qualified
professionals must review current project documents, applicable requirements
and manufacturer data.

## Author disclosure and optional further reading

Power-to-Chip Readiness Lab is created by Rishi Shi, author of
*Modern Data Center Engineering: Power Infrastructure, Air and Liquid Cooling,
AI Operations, and MEP Coordination*.

The [book on Amazon](https://www.amazon.com/dp/B0HB3F4P6Q) is optional extended
reading. It is not required to use, review or contribute to this tool. No
purchase, review, endorsement or Kindle Unlimited reading is requested in
exchange for access.

## License

MIT. See [LICENSE](LICENSE).
