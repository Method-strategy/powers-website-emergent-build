/* Leadership bio data — source of truth for the 6 individual leader
   pages. Each entry feeds <LeaderBio> which renders the canonical
   "Operating Brief" shell (BriefHeader + photo/bio hero + featured
   insights + canonical CTA + BriefFooter). Insights are optional;
   omitting the array hides the section entirely. */

export const LEADERS = {
  'randall-powers': {
    name: "Randall Powers",
    title: "Managing Partner",
    photo: "/uploads/leaders/randall-powers.webp",
    paragraphs: [
      "Randall Powers founded POWERS to build a different kind of operational consulting firm: one that works inside manufacturing operations rather than around them. He concentrates on operational and financial due diligence, strategic development, and the engagements that establish the operating architecture clients rely on after POWERS exits.",
      "His background is twenty years of operational leadership in manufacturing. Before founding POWERS, Randall served as President and Chief Operating Officer of Wise Metals Group, and as Chief of Operations for an operational improvement firm for more than a decade. He started at United Parcel Service in operating roles that put him on the floor early.",
      "Randall holds an MA in Communications and Management and BAs in Economics and Philosophy from the University of Georgia.",
    ],
    insights: [],
  },
  'sean-hart': {
    name: "Sean Hart",
    title: "Chief Executive Officer and Managing Partner",
    photo: "/uploads/leaders/sean-hart.webp",
    paragraphs: [
      "Sean Hart is an industrial engineer who came up through manufacturing supervision and process engineering before stepping into the chief executive role at POWERS. His operational track record is in plant efficiency improvement, lean process implementation, and the supervisory development that turns frontline leadership from a job description into a daily practice.",
      "Before POWERS, Sean held production manager and process engineer roles in the operations departments of ceramic and precision metal fabrication manufacturers. He has managed frontline supervisors leading teams of more than a hundred people on the floor, the kind of operating responsibility that shapes how he thinks about every Discovery POWERS runs today.",
      "Sean holds a BS in Psychology from Kennesaw State University and a BS in Industrial Engineering from Southern Polytechnic State University.",
    ],
    insights: [
      {
        href: "https://www.thepowerscompany.com/resources/where-execution-breaks-first-under-pressure/",
        date: "April 6, 2026",
        title: "Where Execution Breaks First When a Scaled Operation Is Put Under Pressure",
      },
      {
        href: "https://www.thepowerscompany.com/resources/scaling-success-manufacturing-operating-system/",
        date: "March 3, 2026",
        title: "Scaling Success: Maintaining Gains Across Lines, Shifts, Plants, and Holdings",
      },
      {
        href: "https://www.thepowerscompany.com/resources/why-strong-performance-is-hard-to-sustain/",
        date: "February 3, 2026",
        title: "Why Strong Performance is Hard to Sustain",
      },
    ],
  },
  'saul-bautista': {
    name: "Saul Bautista",
    title: "Chief Operating Officer",
    photo: "/uploads/leaders/saul-bautista.webp",
    paragraphs: [
      "Saul Bautista is one of the founders of POWERS and brings nearly thirty years of operational leadership in pharmaceutical manufacturing and management consulting. He has run the full span of pharmaceutical planning, operations, and production, and he is the executive who keeps POWERS engagements moving on the ground.",
      "Saul has managed operations of up to 160 people across management, technical, and hourly teams, and built and developed the operating discipline that allows those teams to perform under regulatory pressure. He carries an outstanding record in major FDA, DEA, and internal audits, the kind of result that does not happen by accident in pharmaceutical environments.",
      "He holds an MBA from Florida International University and a BS in Industrial Engineering from Tecnologico de Monterrey.",
    ],
    insights: [
      {
        href: "https://www.thepowerscompany.com/resources/high-performers/",
        date: "March 9, 2023",
        title: "Want to Build High Performers in Your Organization? Follow the Two-Step V-Process to Help Challenge and Support Your People Into the High Performer Zone",
      },
    ],
  },
  'ken-wiesinger': {
    name: "Ken Wiesinger",
    title: "Chief Delivery Officer",
    photo: "/uploads/leaders/ken-wiesinger.webp",
    paragraphs: [
      "Ken Wiesinger guides POWERS' delivery work across executive teams and frontline operations. He brings more than thirty-five years of industry and consulting experience to the firm's most complex engagements, the ones that require executive-to-frontline alignment, change management at high stakes, and the operating discipline that allows new capability to take root and stay.",
      "His operational reach spans oil and gas, chemicals, aerospace, manufacturing, IT services, and banking. The pattern across those industries is consistent: operations under pressure, execution gaps that have become structural, and leadership teams that need a rebuilt operating architecture from boardroom to floor. That is the work Ken does.",
      "Ken holds technical and business degrees from Allegheny College, Texas A&M University, and the Wharton School. His original training was as a PhD chemist, and he applies the analytical discipline of that training to operational problems.",
    ],
    insights: [],
  },
  'justin-pethick': {
    name: "Justin Pethick",
    title: "Senior Vice President of Strategy and Business Development",
    photo: "/uploads/leaders/justin-pethick.webp",
    paragraphs: [
      "Justin Pethick leads strategy and business development at POWERS. He is the executive who works with prospective clients to understand where the engagement fits inside their operating reality, what Discovery would surface, and how the work would scale across sites or holdings. He has built more than a decade in operations management, business process improvement, and corporate strategy on the path to that role.",
      "Before POWERS, Justin held strategy, consulting, and sales roles at private equity and large financial firms, and worked for a process improvement firm serving Fortune 500 manufacturers including Walmart, Target, and Nike. Earlier in his career, he played professional hockey and continues to play with the Texas Titans, a minor league team that directs proceeds to charities supporting veterans.",
      "Justin holds an MBA from Cornell University and a Master of Science and Technology from Brown University, focused on corporate strategy.",
    ],
    insights: [
      {
        href: "https://www.thepowerscompany.com/resources/americas-industrial-reset-manufacturing-readiness/",
        date: "May 5, 2026",
        title: "America's Industrial Reset: Is Your Operation Ready for It?",
      },
      {
        href: "https://www.thepowerscompany.com/resources/unlocking-ma-value-operating-model-integration-manufacturing/",
        date: "April 13, 2026",
        title: "Unlocking M&A Value: You Didn't Buy Capacity. You Took On Another Operating Model",
      },
      {
        href: "https://www.thepowerscompany.com/resources/unlocking-ma-value-can-your-operating-model-scale-across-the-portfolio/",
        date: "March 17, 2026",
        title: "Unlocking M&A Value: Can Your Operating Model Scale Across the Portfolio?",
      },
    ],
  },
  'kevin-sabany': {
    name: "Kevin Sabany",
    title: "Analyst",
    photo: "/uploads/leaders/kevin-sabany.webp",
    paragraphs: [
      "Kevin Sabany is an analyst at POWERS, working across engagements from the shop floor to the executive suite. His project work has spanned manufacturing, food and beverage, automotive, supply chain and logistics, energy, and private equity portfolio operations, and his contribution centers on the analytical and operational rigor that supports durable engagement results.",
      "Kevin is a bilingual business management professional with a track record in turning around underperforming operations, leading teams across multiple sites, and embedding the practices that allow performance gains to continue after the engagement ends. His work includes productivity improvement, maintenance and reliability optimization, Management Operating System design and implementation, and S&OP transformation.",
      "He holds a BS in Business Management from the University of Tennessee at Chattanooga.",
    ],
    insights: [
      {
        href: "https://www.thepowerscompany.com/resources/robotics-future-manufacturing/",
        date: "September 2, 2025",
        title: "Robotics in the Future of American Manufacturing: A Consulting Analyst's Perspective",
      },
      {
        href: "https://www.thepowerscompany.com/resources/high-performers/",
        date: "March 9, 2023",
        title: "Want to Build High Performers in Your Organization? Follow the Two-Step V-Process to Help Challenge and Support Your People Into the High Performer Zone",
      },
    ],
  },
};

export function getLeader(slug) {
  return LEADERS[slug] || null;
}
