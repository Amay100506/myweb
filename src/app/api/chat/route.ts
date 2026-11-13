import { NextResponse } from "next/server";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export async function POST(req: Request) {
  try {
    const { message, mode = "developer" } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const query = message.toLowerCase().trim();

    let reply = "";
    let suggested: string[] = [];

    // Recruiter-Focused Response Mode
    if (mode === "recruiter") {
      if (query.includes("background") || query.includes("who") || query.includes("summary") || query.includes("profile")) {
        reply = `Amay Kumar is a high-impact Software Engineer and BCA student at Dr. D. Y. Patil Vidyapeeth in Pune, India.
He has proven capability across production notification services, edge AI computer vision, and corporate market research during his internship at Brand Essence (Jan–Mar 2026).
He brings disciplined software engineering fundamentals, full-stack agility, and deep analytical rigor to modern engineering teams.`;
        suggested = [
          "What was his impact at Brand Essence?",
          "Tell me about the PRIOSORT project.",
          "Is Amay available for immediate hiring?",
        ];
      } else if (query.includes("experience") || query.includes("brand essence") || query.includes("intern")) {
        reply = `During his Market Research Analyst Internship at Brand Essence (Pune, Jan–Mar 2026):
• Conducted comprehensive technology market research and competitor benchmarking.
• Developed executive analytics dashboards and structured SQL data models.
• Prepared client-facing reporting deliverables communicating market opportunities with quantitative precision.
• Demonstrated strong analytical communication, deadline adherence, and stakeholder alignment.`;
        suggested = [
          "What technical tools does he use for analytics?",
          "What degree is he pursuing?",
          "How can I schedule an interview?",
        ];
      } else if (query.includes("available") || query.includes("hire") || query.includes("location") || query.includes("salary") || query.includes("contact")) {
        reply = `Amay is based in Pune, India, and is **Available for Software Engineering, Cloud & AI opportunities** (both on-site in Pune and remote).
• Email: ${PORTFOLIO_DATA.personal.social.email}
• LinkedIn: ${PORTFOLIO_DATA.personal.social.linkedin}
• GitHub: ${PORTFOLIO_DATA.personal.social.github}`;
        suggested = [
          "Download Amay's resume",
          "What are his core technical skills?",
          "Explain the RAKSHAK project.",
        ];
      } else {
        reply = `[RECRUITER BRIEFING] Amay Kumar combines academic excellence at Dr. D. Y. Patil Vidyapeeth Pune with practical engineering across Android systems (PRIOSORT), edge AI vision (RAKSHAK), and corporate analytics at Brand Essence.
What specific background or qualification would you like to verify?`;
        suggested = [
          "What are his top 3 engineering strengths?",
          "Tell me about his internship experience.",
          "How can I contact Amay for an interview?",
        ];
      }
    }

    // Collaboration Mode
    else if (mode === "collaboration") {
      if (query.includes("work") || query.includes("collaborate") || query.includes("project") || query.includes("partner")) {
        reply = `Amay actively collaborates on high-impact software engineering initiatives, open-source libraries, edge AI pipelines, and cloud telemetry tools.
Preferred collaboration areas:
• Edge AI and Computer Vision (YOLO, OpenCV, PyTorch)
• Android platform system utilities and notification orchestration
• Scalable Python APIs (FastAPI) and modern Next.js web applications
• Cloud infrastructure automation (Docker, Linux shell, AWS).`;
        suggested = [
          "What is his open-source GitHub profile?",
          "How does Amay handle code reviews and git workflows?",
          "What is the best way to propose a collaboration?",
        ];
      } else {
        reply = `[COLLABORATION HUB] Amay follows disciplined engineering practices: semantic Git commits, modular architecture, comprehensive documentation, and strict testing.
To initiate a collaboration or technical partnership, dispatch an email to ${PORTFOLIO_DATA.personal.social.email} or open a pull request on GitHub!`;
        suggested = [
          "View Amay's GitHub repositories",
          "What technologies does he specialize in?",
          "Contact Amay directly",
        ];
      }
    }

    // Developer-Focused Mode (Default)
    else {
      if (query.includes("skill") || query.includes("stack") || query.includes("tech")) {
        reply = `[DEVELOPER SPECIFICATION] Amay's architecture stack:
• **Languages**: Python (async/FastAPI), Java (Android SDK), C/C++ (memory management/STL), JavaScript/TypeScript.
• **Frontend**: Next.js 16 (App Router, RSC), React 19, Tailwind CSS v4, Motion, Three.js / R3F.
• **Backend & Edge**: FastAPI, Node.js, OpenCV, YOLOv8 inference, SQLite on-device, MySQL, Redis.
• **DevOps & Cloud**: Docker multi-stage builds, Linux POSIX shell scripting, AWS (S3, EC2, IAM), Git/GitHub Actions.`;
        suggested = [
          "Explain the architecture of PRIOSORT.",
          "How does RAKSHAK process edge video frames?",
          "What is NOTIFYIQ's event architecture?",
        ];
      } else if (query.includes("priosort") || query.includes("android") || query.includes("notification")) {
        const p = PORTFOLIO_DATA.projects.find((pr) => pr.id === "priosort")!;
        reply = `[PRIOSORT SYSTEM ARCHITECTURE]
• **Service Hook**: Integrates Android \`NotificationListenerService\` to passively intercept StatusBarNotification streams with minimal battery overhead.
• **Heuristic Ranking Engine**: Evaluates priority based on sender authority vectors, message keywords, and real-time user activity state.
• **Persistence**: Embedded SQLite database caching custom override rules with sub-millisecond query latency.
• **Security & Privacy**: 100% on-device execution with zero cloud telemetry leakage.`;
        suggested = [
          "Compare PRIOSORT with NOTIFYIQ.",
          "Tell me about RAKSHAK.",
          "View GitHub repository.",
        ];
      } else if (query.includes("rakshak") || query.includes("road") || query.includes("hazard") || query.includes("vision") || query.includes("yolo")) {
        const p = PORTFOLIO_DATA.projects.find((pr) => pr.id === "rakshak")!;
        reply = `[RAKSHAK EDGE AI PIPELINE]
• **Convolutional Backbone**: Lightweight YOLOv8 / MobileNet neural network optimized for low-latency frame inference on edge compute boards.
• **Preprocessing**: OpenCV spatial filtering, edge contrast enhancement, and perspective distortion correction.
• **Geofencing**: Tags anomalies (potholes, surface fissures, road obstacles) with live GPS telemetry.
• **Ingestion Service**: FastAPI asynchronous telemetry hub delivering detected hazard clusters to an interactive GIS map.`;
        suggested = [
          "How is RAKSHAK deployed on edge hardware?",
          "What is NOTIFYIQ?",
          "Tell me about Amay's education at DY Patil.",
        ];
      } else if (query.includes("notifyiq")) {
        const p = PORTFOLIO_DATA.projects.find((pr) => pr.id === "notifyiq")!;
        reply = `[NOTIFYIQ ARCHITECTURE]
• **Ingestion**: Asynchronous FastAPI webhook broker absorbing alerts from GitHub, Slack, and server monitors.
• **Scoring Engine**: NLP urgency ranking using keyword classification and sender authority metrics to combat notification fatigue.
• **Dispatch**: Priority-driven queue separating instant critical alerts from scheduled digests.`;
        suggested = [
          "Tell me about PRIOSORT.",
          "What is CLOUD SENTINEL?",
          "What are Amay's cloud and DevOps skills?",
        ];
      } else if (query.includes("education") || query.includes("college") || query.includes("bca") || query.includes("university")) {
        reply = `Amay is currently pursuing his **${PORTFOLIO_DATA.personal.education.degree}** at **${PORTFOLIO_DATA.personal.education.institution}** in Pune, India.
His academic coursework covers data structures & algorithms in C++, relational database design in MySQL, software engineering lifecycles, and applied machine learning.`;
        suggested = [
          "What was his Brand Essence internship?",
          "Show me his GitHub repositories.",
          "How to contact Amay?",
        ];
      } else {
        reply = `Greetings! I am AMAY AI (Digital Twin v2.5).
I am calibrated to represent Amay Kumar's software engineering background, architectural designs, and technical capabilities.
Select an operation mode (Developer, Recruiter, Collaboration) or ask any technical question!`;
        suggested = [
          "What are his core technical skills?",
          "Explain the PRIOSORT Android application.",
          "Explain the RAKSHAK edge AI project.",
          "What was his role at Brand Essence?",
        ];
      }
    }

    return NextResponse.json({
      reply,
      suggestedQuestions: suggested,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Internal assistant error" }, { status: 500 });
  }
}
