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
He has proven capability across production Android notification services (PRIOSORT), edge AI computer vision (RAKSHAK), and scalable Python microservices.
He brings disciplined software engineering fundamentals, full-stack agility, and deep architectural rigor to modern engineering teams.`;
        suggested = [
          "Tell me about the PRIOSORT project.",
          "Explain the RAKSHAK edge AI project.",
          "Is Amay available for immediate hiring?",
        ];
      } else if (query.includes("experience") || query.includes("role") || query.includes("career")) {
        reply = `Amay's Software Engineering & Systems trajectory:
• Architected PRIOSORT: on-device Android notification prioritization system with zero cloud data leak.
• Engineered RAKSHAK: convolutional edge vision pipeline using YOLOv8 & OpenCV for urban road hazard telemetry.
• Constructed asynchronous Python REST APIs and webhook ingestion brokers utilizing FastAPI, Docker, and Redis.
• Authored type-safe full-stack web applications using Next.js 16 App Router, TypeScript, and modern state architectures.`;
        suggested = [
          "What technical tools does he specialize in?",
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
        reply = `[RECRUITER BRIEFING] Amay Kumar combines academic excellence at Dr. D. Y. Patil Vidyapeeth Pune with practical engineering across Android systems (PRIOSORT), edge AI vision (RAKSHAK), and cloud architectures.
What specific background or qualification would you like to verify?`;
        suggested = [
          "What are his top 3 engineering strengths?",
          "What are his flagship projects?",
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
          "What are his core technical skills?",
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
          "What degree is he pursuing?",
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
