/**
 * FAQ dataset — sourced verbatim from POWERS_FAQs_Page_Full_Draft.docx.
 *
 * Single source of truth for both the FAQs page renderer and the
 * global Cmd-K search corpus. Adding or removing an entry here
 * updates both surfaces simultaneously.
 *
 * Each entry:
 *   slug — stable deep-link target (#consulting-difference, #cost, …)
 *   q    — the canonical question
 *   a    — the full answer (paragraph breaks via blank lines)
 */
export const faqs = [
  {
    slug: 'consulting-difference',
    q: 'How is POWERS different from a typical management consulting firm?',
    a: `Most management consulting firms diagnose, recommend, and leave. The slide deck is polished. The implementation isn't. What gets built during the engagement degrades back to the baseline within a quarter or two of the consultants going home.

We work differently. Our senior practitioners deploy directly into your operation, on every shift, alongside your supervisors and operators, until the disciplines we build are embedded in how your team runs the operation every day.

We don't leave you with binders. We leave you with a workforce that runs the system without us. And we get paid for results, not billable hours. Our commercial structure puts our compensation on the line against the savings we commit to during Discovery. If we don't deliver, we don't earn.`,
  },
  {
    slug: 'how-we-work',
    q: 'How does POWERS work?',
    a: `Every POWERS engagement starts with a conversation. From there, if the fit is right, we move into the intensive Discovery Process that begins every engagement.

During Discovery, we quantify the operational gaps, design the custom build that closes them, and commit to a specific savings outcome with a cost proposal built against it.

Implementation deploys senior practitioners onto your floor, on every shift, building the five disciplines that drive sustainable performance. Operational discipline. Frontline leadership. Equipment reliability. Workforce capability. Daily accountability.

The work is hands-on, embedded, and built into the rhythm of your operation, not layered on top of it. By the time we leave, the system runs without us. Your team owns it. The gains stay built.`,
  },
  {
    slug: 'cost',
    q: 'What does it cost? And how do you charge?',
    a: `Engagement cost varies with scope. What doesn't vary is how we structure it.

During the Discovery Process, we quantify the savings opportunity in your operation. We then build the cost proposal against that savings commitment, not against an hourly billing rate. This is what we mean when we say we put skin in the game. We commit to a specific operational and financial outcome. If we don't deliver, we don't earn.

Most engagements pay back the full cost within the engagement window itself, with the gains continuing to compound after we leave.`,
  },
  {
    slug: 'timeline',
    q: 'How long does an engagement take?',
    a: `The Discovery Process typically runs two to six weeks, depending on the scope of the operation and the number of sites involved.

Implementation engagements typically run several months to a year, scaled to the complexity of the build and the size of the operation.

We don't run forever. The whole point of how we work is to build the system, embed it on the floor, and hand it off. If an engagement is running long, that's a signal something isn't working, and we address it directly with you.`,
  },
  {
    slug: 'engagement-start',
    q: 'Where do POWERS engagements start?',
    a: `They start at the executive and senior operations leadership level. The first phone conversation. The follow-up calls. The eventual in-person meeting with the decision-makers who will sponsor the engagement.

The Discovery Process itself begins with the leadership alignment that has to be in place before any work hits the shop floor.

From there, we move down through the operation. Plant leadership. Frontline supervisors. Operators and technicians. The build extends through every layer of the operation, but the engagement always starts with the leaders who will own the outcome.`,
  },
  {
    slug: 'industries',
    q: 'What industries does POWERS work in?',
    a: `Food and beverage manufacturing. Meat and poultry processing. Consumer packaged goods. Pharmaceuticals and medical devices. Aerospace and defense. Automotive. Industrial manufacturing. Metals and mining. Oil and gas. Chemicals. Warehouse and distribution. Animal nutrition and feed. Agribusiness. Plus dedicated work with private equity portfolio operations across multiple sectors.

What changes industry to industry is the operational vocabulary, the regulatory architecture, and the buyer's language. What doesn't change is the execution discipline underneath.

The five disciplines we build apply wherever consistent, sustainable operational performance is the goal.`,
  },
  {
    slug: 'size',
    q: 'What size operations does POWERS work with?',
    a: `Multi-site manufacturers and processors. PE-backed platforms. Corporate operations groups running integrations, growth initiatives, or footprint expansions. Operating leaders responsible for production environments where execution gets measured every shift.

Our engagements are designed for operations at meaningful scale. If your operation runs across more than one site, the conversation about scope starts on the contact page.`,
  },
  {
    slug: 'guarantee',
    q: 'Do you guarantee results?',
    a: `We commit to specific savings outcomes during the Discovery Process. The cost proposal is built against that savings commitment. If we don't deliver the results we commit to, we don't earn the full fee.

That's as close to a guarantee as a serious operational engagement can responsibly make. What we won't do is promise outcomes we haven't validated through Discovery.

That's where the operational diagnosis happens. That's where the savings commitment gets quantified. The Discovery Process is the structural mechanism that lets us put commercial skin in the game with confidence.`,
  },
  {
    slug: 'internal-ci-opex',
    q: 'How is POWERS different from our internal continuous improvement or operational excellence team?',
    a: `Internal CI and OpEx teams are usually excellent at identifying improvements and constrained on implementation. The reason is structural, not capability. Internal teams typically operate one or two layers up from the shop floor, work across multiple initiatives, and don't have the floor-level coaching and supervisory development capability that an embedded engagement requires.

We don't replace your internal teams. We work with them. We bring senior practitioners onto every shift, build the disciplines directly into your supervisors and operators, and embed the system into how the operation runs.

Your internal CI and OpEx team comes out of the engagement stronger, with more capacity, and with the disciplines we built embedded in the operation they support.`,
  },
  {
    slug: 'after-engagement',
    q: 'What happens after the engagement ends?',
    a: `The system stays built. That's the whole point of how we work. The five disciplines we install during the engagement are embedded in your supervisors, your standard work, your daily operating routines, and the management operating system we build with your team. The capability sustains itself because we built it to.

Many of our clients continue the relationship after the initial engagement, often deploying DPS, our Digital Production System, to maintain real-time visibility across the operation and accelerate the daily cadence we installed.

Some clients re-engage us for additional disciplines, additional sites, or new operational pressures. The relationship is durable because the work was.`,
  },
  {
    slug: 'name',
    q: 'Why "POWERS"?',
    a: `Randall Powers founded the firm in 2004 after decades of operations work in manufacturing. The name is his. The work we do still carries his discipline.`,
  },
];
