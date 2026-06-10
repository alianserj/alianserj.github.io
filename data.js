// ============================================================================
// data.js — SINGLE SOURCE OF TRUTH
// ============================================================================
//
// ★ HOW TO ADD / REMOVE CONTENT:
//
//   • New project?   → Push an object into `siteData.projects`
//   • New experience? → Push an object into `siteData.experience`
//   • New skill?      → Append a string to the relevant array in `siteData.skills`
//   • New award?      → Push an object into `siteData.awards`
//   • New social link? → Push an object into `siteData.hero.socialLinks`
//
//   That's it. Never touch index.html or script.js for content changes.
//
// ============================================================================

window.siteData = {

  // --------------------------------------------------------------------------
  // META — site-wide info used in nav, footer, and SEO
  // --------------------------------------------------------------------------
  meta: {
    name: "Ali Anser Jaffri",
    email: "26100201@lums.edu.pk",
    phone: "(+1) 647 334 4110 / (+92) 305 222 7588",
    github: "https://github.com/alianserj",
    linkedin: "https://www.linkedin.com/in/ali-anser-jaffri-2a6451147/",
    cvPath: "assets/Jaffri_Ali_CV.pdf"
  },

  // --------------------------------------------------------------------------
  // HERO — the first thing visitors see
  // --------------------------------------------------------------------------
  hero: {
    greeting: "Hi, I'm",
    name: "Ali Anser Jaffri",
    tagline: "Computer Science · Control Theory · Machine Learning",
    summary:
      "I study the intersection of Control Theory and Dynamical Machine Learning — analyzing stability, learning latent dynamics, and predicting critical transitions in complex, nonlinear systems.",
    profileImage: "assets/profile.jpg",

    // Add / remove social links freely. icon must be: "github" | "linkedin" | "email" | "scholar"
    socialLinks: [
      { platform: "GitHub",   url: "https://github.com/alianserj",                                    icon: "github"   },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/ali-anser-jaffri-2a6451147/",          icon: "linkedin" },
      { platform: "Email",    url: "mailto:26100201@lums.edu.pk",                                      icon: "email"    }
    ]
  },

  // --------------------------------------------------------------------------
  // EDUCATION — array of degrees (add more if you pursue a Masters, etc.)
  // --------------------------------------------------------------------------
  education: [
    {
      institution: "Lahore University of Management Sciences (LUMS)",
      location: "Lahore, Pakistan",
      degree: "BS in Computer Science",
      gpa: "3.92/4.00",
      dates: "2022 – 2026",
      coursework: [
        { name: "Learning for Dynamics and Control",            graduate: true  },
        { name: "Multi-Agent Systems",                          graduate: true  },
        { name: "Dynamic Programming and Reinforcement Learning", graduate: true },
        { name: "Machine Learning",                             graduate: true  },
        { name: "Deep Learning",                                graduate: true  },
        { name: "Distributed Systems",                          graduate: true  },
        { name: "Signals and Systems",                          graduate: false },
        { name: "Mobile Robotics",                              graduate: true  },
        { name: "Feedback Control Systems",                     graduate: false },
        { name: "Real Analysis",                                graduate: false },
        { name: "Cooperative Game Theory",                      graduate: false }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // RESEARCH INTERESTS — shown in the About section
  // --------------------------------------------------------------------------
  researchInterests:
    "Data-Driven Control, Operator-Theoretic Methods (Koopman Analysis), and Multi-Agent Systems. I am interested in the intersection of <strong>Control Theory and Dynamical Machine Learning</strong> to analyze stability, learn latent dynamics, and predict critical transitions in complex, nonlinear systems.",

  // --------------------------------------------------------------------------
  // EXPERIENCE — rendered as a timeline
  //   type: "research" | "teaching" | "professional"
  //   courses: (optional) array for TA entries
  // --------------------------------------------------------------------------
  experience: [
    {
      title: "Senior Thesis: Koopman Operator Theoretic Approaches to Tipping Points",
      organization: "LUMS",
      advisor: "Dr. Abubakr Muhammad",
      location: "Lahore, Pakistan",
      dates: "April 2025 – Present",
      type: "research",
      bullets: [
        "Analyzing the mathematical foundations of critical transitions in the <strong>AMOC</strong>, specifically focusing on evidence suggesting a potential <strong>21st-century bifurcation</strong>.",
        "Adapting this framework using <strong>Koopman Operator Theory</strong> for <strong>GLOFs</strong> in Pakistan, aiming to outperform traditional local variance-based statistics in predicting disaster onset."
      ]
    },
    {
      title: "Undergraduate Research Student",
      organization: "LUMS",
      advisor: "Dr. Hassan Jaleel",
      location: "Lahore, Pakistan",
      dates: "Jan 2025 – Dec 2025",
      type: "research",
      bullets: [
        "<strong>Topic:</strong> Bifurcations in Behavior-Based Decision Making Models for Social Dilemmas.",
        "Worked on a mathematical model within <strong>Evolutionary Game Theory</strong> to capture population dynamics in social settings, specifically incorporating <strong>preference falsification</strong> into the Prisoner's Dilemma. Focused on using <strong>bifurcation theory</strong> to map the critical parameter thresholds that trigger sudden collapses in cooperative behavior."
      ]
    },
    {
      title: "Undergraduate Teaching Assistant",
      organization: "Lahore University of Management Sciences (LUMS)",
      location: "Lahore, Pakistan",
      dates: "2024 – Present",
      type: "teaching",
      bullets: [],
      courses: [
        { code: "ECON-435",       name: "Advanced Game Theory",       semester: "Spring 2026", instructor: "Dr Amin Hussain" },
        { code: "CS-5317/EE-517", name: "Deep Learning",              semester: "Spring 2025", instructor: "Dr Murtaza Taj"  },
        { code: "AI-600",         name: "Machine Learning",           semester: "Spring 2025", instructor: "Dr Momin Uppal"  },
        { code: "ACTA-6304",      name: "Advanced Machine Learning",  semester: "Fall 2024",   instructor: "Dr Momin Uppal"  }
      ]
    },
    {
      title: "Teacher (A-Levels and IGCSE)",
      organization: "AIMS",
      location: "Karachi, Pakistan",
      dates: "Aug 2021 – May 2023",
      type: "teaching",
      bullets: [
        "Taught Further Mathematics (9231) and Mathematics (0580)"
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // PROJECTS — rendered as filterable card grid
  //
  //   categories: array of strings → each becomes a filter pill (auto-generated)
  //   tags:       tech stack shown as small pills on the card
  //   links:      object with any keys — "github", "paper", "demo", "slides", etc.
  //              Each key gets a clickable icon. Add as many as you want.
  //
  //   ★ To add a project, just push a new object into this array.
  // --------------------------------------------------------------------------
  projects: [
    {
      title: "Koopman–Deep Learning for Glycolytic System Modeling",
      course: "Learning for Dynamics and Control (Dr Abubakr Muhammad)",
      date: "Spring 2025",
      summary:
        "Developed a hybrid Koopman–DL framework combining deep dictionary learning with Koopman operator linearization to model nonlinear biochemical reaction networks in glycolysis. Constructed data-driven lifting maps to learn Koopman-invariant subspaces, enhancing prediction and stability analysis of high-dimensional metabolic flux dynamics.",
      tags: ["Python", "PyTorch", "Koopman Theory", "Dynamical Systems"],
      categories: ["Control Theory", "Deep Learning"],
      links: { github: "https://github.com/alianserj/Deep-Learning-for-Koopman-Operator" }
    },
    {
      title: "Multi-Agent Game-Theoretic Planning (MultiNash-PF)",
      course: "Mobile Robotics (Dr. Abubakr Muhammad)",
      date: "Fall 2025",
      summary:
        "Implemented MultiNash-PF, reformulating constrained potential games into a virtual model for Bayesian inference, utilizing UKF-based implicit particle filtering to efficiently recover multimodal Generalized Nash Equilibria.",
      tags: ["Python", "Game Theory", "Bayesian Inference", "UKF"],
      categories: ["Multi-Agent Systems", "Control Theory"],
      links: {}
    },
    {
      title: "Adversarial Multi-Agent Policy-Response Planning",
      course: "Dynamic Programming and Reinforcement Learning (Dr. Hassan Jaleel)",
      date: "Fall 2025",
      summary:
        "Designed a MARL stealth-planning PSRO framework inspired by DO, PRD, and GenBR/IS-MCTS style opponent modeling, using lightweight deep-network alternatives for low-cost, opponent-aware robotic navigation.",
      tags: ["Python", "MARL", "PSRO", "Reinforcement Learning"],
      categories: ["Multi-Agent Systems", "Deep Learning"],
      links: {}
    },
    {
      title: "Socio-Technical System Design for Climate-Resilient Urban Operations",
      course: "Climate Change Governance (Dr. Abubakr Muhammad)",
      date: "Fall 2025",
      summary:
        "Developing a data-driven socio-technical operations model for Karachi's flood–waste nexus using the HTE framework to link governance reform with system-level design. Adapted the MESSAGEix framework for Technological Regime Shift, quantifying a Resilience Dividend.",
      tags: ["HTE Network", "MESSAGEix", "Systems Design"],
      categories: ["Systems"],
      links: {}
    },
    {
      title: "Investigating Attention-Based Knowledge Distillation for Transformers",
      course: "Deep Learning (Dr Murtaza Taj)",
      date: "Spring 2024",
      summary:
        "Modeled non-stationary distillation dynamics to map BERT latent spaces onto a compressed student — 79% parameter reduction + 81% accuracy via attention-aware regularization.",
      tags: ["Python", "PyTorch", "NLP", "Transformers"],
      categories: ["Deep Learning"],
      links: { github: "https://github.com/alianserj/BERT-Knowledge-Distillation" }
    },
    {
      title: "Multi-Agent Learning for Flying Base Stations",
      course: "Multi-Agent Systems (Dr. Hassan Jaleel)",
      date: "Fall 2024",
      summary:
        "Formulated UAV coordination as a Potential Game utilizing Marginal Contribution Utility to optimize distributed coverage, implementing Log-Linear Learning dynamics for theoretical guarantees.",
      tags: ["Python", "Game Theory", "Optimization"],
      categories: ["Multi-Agent Systems"],
      links: { github: "https://github.com/alianserj/Multi-Agent-Learning-for-Flying-Base-Stations" }
    },
    {
      title: "Distributed Consensus in Networked Systems",
      course: "Distributed Systems (Dr Zafar Ayyub Qazi)",
      date: "Fall 2024",
      summary:
        "Implemented and tailored the Raft distributed consensus protocol for autonomous clients with simulated time-varying networks as a key-value database.",
      tags: ["Golang", "Distributed Systems", "Raft"],
      categories: ["Systems"],
      links: {}
    }
  ],

  // --------------------------------------------------------------------------
  // SKILLS — each key is a category card, each value is an array of strings
  //   ★ To add a skill, append a string. To add a category, add a new key.
  // --------------------------------------------------------------------------
  skills: {
    "Languages":  ["Python", "C", "C++", "MATLAB", "SQL", "Haskell", "Golang"],
    "Frameworks": ["PyTorch", "TensorFlow", "NumPy", "SciPy", "Pandas", "Scikit-learn"],
    "Tools":      ["Git", "Docker", "Linux", "LaTeX", "Azure"],
    "Concepts":   ["Control Theory", "Game Theory", "Linear Algebra", "Probability", "Real Analysis"]
  },

  // --------------------------------------------------------------------------
  // AWARDS — each object = one award card
  //   ★ To add an award, push a new { title, detail, years } object.
  // --------------------------------------------------------------------------
  awards: [
    {
      title: "Dean's Honor List",
      detail: "LUMS School of Science and Engineering",
      years: "2022 – 2025"
    },
    {
      title: "Merit Scholarship — 100%",
      detail: "Awarded by Cedar College Karachi for academic excellence",
      years: "2020 – 2022"
    },
    {
      title: "National Science Talent Contest (NSTC) Scholar",
      detail: "Selected among the top 50 mathematics students nationwide to prepare for the International Mathematical Olympiad (IMO)",
      years: "2022"
    }
  ]
};
