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

    // Global Resume Query Handler
    if (query.includes("resume") || query.includes("cv") || query.includes("download")) {
      reply = `You can directly download Amay Kumar's official resume PDF here: [Download Resume (PDF)](/resume.pdf).
Key Highlights from his resume:
• Name: Amay Kumar (Pune 411057)
• Status: Engineering Student (BCA, Dr. D. Y. Patil Vidyapeeth Pune, CGPA 8.0)
• Certification: AWS Certified Cloud Practitioner (CLF-C02)
• Cloud & DevOps Skills: AWS (EC2, S3, IAM, VPC, RDS, CloudWatch), Docker, Kubernetes, Terraform, Linux, Bash, Python, Git/GitHub, Prometheus, TCP/IP, DNS
• Experience: Sales Executive @ performancespur | Student Volunteer @ NSS`;
      return NextResponse.json({
        reply,
        suggested: [
          "What are Amay's AWS skills?",
          "Tell me about the Terraform infrastructure project.",
          "What is his educational background?",
        ],
      });
    }

    // Recruiter-Focused Response Mode
    if (mode === "recruiter") {
      if (query.includes("background") || query.includes("who") || query.includes("summary") || query.includes("profile")) {
        reply = `Amay Kumar is an Engineering student at Dr. D. Y. Patil Vidyapeeth in Pune, India (BCA, current CGPA: 8.0) and an AWS Certified Cloud Practitioner (CLF-C02).
He has a strong interest and proven capabilities in Cloud Computing, DevOps, automated CI/CD pipelines, container orchestration, and emerging technologies.
He is continuously developing technical skills through hands-on projects including automated Terraform provisioning and Kubernetes microservices on AWS EKS.`;
        suggested = [
          "Tell me about Amay's AWS certification.",
          "What are his core Cloud & DevOps skills?",
          "Download Amay's resume",
        ];
      } else if (query.includes("experience") || query.includes("role") || query.includes("career")) {
        reply = `Amay's Professional Chronicle & Volunteer Experience:
1. Sales Executive @ performancespur (Pune, IN | 04/2026 – 06/2026):
   • Recorded client details and sales activity in CRM systems.
   • Built strong, professional relationships through identification of client needs to expand sales opportunities.
2. Student Volunteer @ NSS (Pune, IN | 10/2025 – 04/2026):
   • Assisted with answering telephone calls, managing databases, and drafting institutional correspondence.
   • Provided technical support and instructional assistance to help students succeed.`;
        suggested = [
          "What technical tools does he specialize in?",
          "What degree is he pursuing?",
          "How can I download his resume?",
        ];
      } else if (query.includes("education") || query.includes("college") || query.includes("school") || query.includes("cgpa")) {
        reply = `Amay's Education:
• Bachelor of Computer Applications (BCA): Dr. D. Y. Patil Vidyapeeth, Pune (Current CGPA: 8.0)
• High School Diploma: Kendriya Vidyalaya AFS Bareilly - Bareilly (Completed 05/2024 | 10th: 88%, 12th: 81%)
• Certification: AWS Certified Cloud Practitioner (CLF-C02)`;
        suggested = [
          "Download Amay's resume",
          "What are his Cloud & DevOps skills?",
          "Contact Amay directly",
        ];
      } else if (query.includes("available") || query.includes("hire") || query.includes("location") || query.includes("salary") || query.includes("contact")) {
        reply = `Amay is based in Pune 411057, Maharashtra, India, and is **Available for Cloud & DevOps Engineering opportunities** (both on-site in Pune and remote).
• Email: amaykumar100506@gmail.com
• Phone: +91 7666571793
• LinkedIn: linkedin.com/in/amaykumar19connect
• GitHub: github.com/Amay100506
• Official Resume: Direct download at /resume.pdf`;
        suggested = [
          "Download Amay's resume",
          "What are his core technical skills?",
          "Tell me about his AWS projects.",
        ];
      } else {
        reply = `[RECRUITER BRIEFING] Amay Kumar is an AWS Certified Cloud Practitioner and BCA student at Dr. D. Y. Patil Vidyapeeth Pune (CGPA 8.0).
He specializes in Cloud Computing (AWS), DevOps (Docker, Kubernetes, CI/CD, Jenkins, GitHub Actions), Infrastructure as Code (Terraform), and Linux systems.
What specific background or qualification would you like to verify?`;
        suggested = [
          "What are his AWS skills?",
          "Tell me about his projects.",
          "Download Amay's resume (PDF)",
        ];
      }
    }

    // Collaboration Mode
    else if (mode === "collaboration") {
      if (query.includes("work") || query.includes("collaborate") || query.includes("project") || query.includes("partner")) {
        reply = `Amay actively collaborates on Cloud Computing, DevOps automation, Kubernetes cluster deployments, and open-source infrastructure tooling.
Preferred collaboration areas:
• Infrastructure as Code with Terraform and AWS provisioning
• Containerization & orchestration with Docker, Kubernetes, and AWS EKS
• Continuous Integration/Continuous Deployment (CI/CD) with GitHub Actions and Jenkins
• Linux systems administration and Bash automation scripting.`;
        suggested = [
          "What is his open-source GitHub profile?",
          "What are his cloud infrastructure projects?",
          "What is the best way to propose a collaboration?",
        ];
      } else {
        reply = `[COLLABORATION HUB] Amay follows disciplined engineering practices: declarative IaC (Terraform), automated testing, reproducible Docker builds, and semantic Git commits.
To initiate a collaboration or technical project, send an email to amaykumar100506@gmail.com or connect on LinkedIn!`;
        suggested = [
          "View Amay's GitHub repositories",
          "What technologies does he specialize in?",
          "Download official resume",
        ];
      }
    }

    // Developer-Focused Mode (Default)
    else {
      if (query.includes("skill") || query.includes("stack") || query.includes("tech")) {
        reply = `[DEVELOPER SPECIFICATION] Amay's Technical Competency Matrix:
• **Cloud (AWS)**: AWS, EC2, S3, IAM, VPC, RDS, CloudWatch (AWS Certified Cloud Practitioner CLF-C02)
• **DevOps & CI/CD**: Docker, Kubernetes, CI/CD, Jenkins, GitHub Actions
• **Infrastructure as Code**: Terraform
• **Operating Systems & Scripting**: Linux, Bash Scripting, Python
• **Version Control**: Git, GitHub
• **Monitoring & Observability**: AWS CloudWatch, Prometheus
• **Networking**: TCP/IP, DNS, HTTP/HTTPS, Load Balancing
• **Security**: IAM, Basic Cloud Security`;
        suggested = [
          "Explain the Terraform CI/CD infrastructure project.",
          "How does Amay deploy on AWS EKS using Kubernetes?",
          "What are his AWS CloudWatch telemetry practices?",
        ];
      } else if (query.includes("project") || query.includes("terraform") || query.includes("kubernetes") || query.includes("eks")) {
        reply = `[FEATURED ENGINEERING PROJECTS]
1. Automated Infrastructure & CI/CD Pipeline:
   • Provisioned AWS VPCs, subnets, EC2, and security groups declaratively using Terraform.
   • Built automated GitHub Actions CI/CD workflows for building and dispatching Docker containers.
2. AWS EKS Kubernetes Microservices:
   • Containerized multi-tier microservices with Docker and deployed across distributed clusters on AWS EKS.
   • Configured Kubernetes Deployments, Services, external LoadBalancers, and Prometheus metric exporters.
3. PRIOSORT:
   • Android on-device notification classification and priority customization service with zero cloud telemetry leak.`;
        suggested = [
          "Download Amay's resume",
          "What are his AWS skills?",
          "Contact Amay directly",
        ];
      } else {
        reply = `[SYSTEM CORE] Amay Kumar | Cloud & DevOps Engineer | AWS Certified Cloud Practitioner (CLF-C02).
Academic: BCA at Dr. D. Y. Patil Vidyapeeth, Pune (CGPA: 8.0).
Specializing in AWS, Docker, Kubernetes, Terraform, Linux, CI/CD, and CloudWatch.
Feel free to ask about his infrastructure projects, AWS certification, or request his resume.`;
        suggested = [
          "Download Amay's resume (PDF)",
          "What are his Cloud & DevOps skills?",
          "Explain his Terraform and Kubernetes projects.",
        ];
      }
    }

    return NextResponse.json({ reply, suggested });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal command processing error" },
      { status: 500 }
    );
  }
}
