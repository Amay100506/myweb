import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Code2, 
  AlertTriangle,
  Lightbulb,
  ExternalLink
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon } from "@/components/common/Icons";

interface ProjectCaseStudyDetails {
  architectureFlow: string[];
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
  };
  challengesAndSolutions: Array<{
    challenge: string;
    solution: string;
  }>;
  roadmap: string[];
}

const CASE_STUDY_DATA: Record<string, ProjectCaseStudyDetails> = {
  priosort: {
    architectureFlow: [
      "1. System Notification Event is triggered by an installed application.",
      "2. Android NotificationListenerService intercepts the active StatusBarNotification stream passively.",
      "3. Local Rule Engine applies sender authority heuristics and keyword vector scoring.",
      "4. SQLite database performs microsecond query to check whitelist / override policies.",
      "5. Intercepted notification is either dispatched immediately or batched into a scheduled digest.",
    ],
    codeSnippet: {
      language: "java",
      filename: "NotificationInterceptorService.java",
      code: `@Override
public void onNotificationPosted(StatusBarNotification sbn) {
    String packageName = sbn.getPackageName();
    Notification notification = sbn.getNotification();
    Bundle extras = notification.extras;
    
    // Extract payload metadata
    String title = extras.getString(Notification.EXTRA_TITLE, "");
    CharSequence text = extras.getCharSequence(Notification.EXTRA_TEXT, "");
    
    // Evaluate urgency score locally with zero cloud telemetry
    int priorityScore = ruleEngine.evaluateUrgency(packageName, title, text);
    
    if (priorityScore < PriorityThreshold.SILENT_BATCH) {
        digestManager.queueNotification(sbn, priorityScore);
        cancelNotification(sbn.getKey());
    } else {
        ruleEngine.applyCustomBadge(notification, priorityScore);
    }
}`,
    },
    challengesAndSolutions: [
      {
        challenge: "Minimizing battery drain while continuously listening to notification events.",
        solution: "Employed purely event-driven Android service hooks with on-demand heuristic evaluation instead of background polling.",
      },
      {
        challenge: "Preserving user privacy without external API classification.",
        solution: "Built a self-contained local rule engine backed by embedded SQLite, guaranteeing 0 bytes of cloud data leak.",
      },
    ],
    roadmap: [
      "Dynamic context recognition using Android Activity Recognition API.",
      "Per-app notification frequency anomaly alerts.",
      "Custom notification vibration patterns mapped to urgency tiers.",
    ],
  },
  rakshak: {
    architectureFlow: [
      "1. Vehicle-mounted camera captures road surface visual frames at 30 FPS.",
      "2. OpenCV pipeline applies spatial bilateral filtering and perspective unwarping.",
      "3. YOLOv8 convolutional detector identifies potholes, fissures, and obstacles with confidence scores.",
      "4. Anomaly severity estimator calculates risk index and surface area.",
      "5. FastAPI backend tags anomalies with GPS coordinates and stores telemetry in municipal GIS map.",
    ],
    codeSnippet: {
      language: "python",
      filename: "road_hazard_pipeline.py",
      code: `import cv2
from ultralytics import YOLO

class RoadHazardDetector:
    def __init__(self, model_checkpoint: str):
        # Load edge-optimized lightweight YOLO checkpoint
        self.model = YOLO(model_checkpoint)
        
    def process_frame(self, frame, gps_coords):
        # Apply spatial contrast preprocessing
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        filtered = cv2.bilateralFilter(gray, 9, 75, 75)
        
        # Inference
        results = self.model(frame, conf=0.65)
        hazards = []
        
        for det in results[0].boxes:
            box = det.xyxy[0].tolist()
            conf = float(det.conf[0])
            cls_name = self.model.names[int(det.cls[0])]
            
            hazards.append({
                "type": cls_name,
                "confidence": conf,
                "bbox": box,
                "location": gps_coords,
            })
        return hazards`,
    },
    challengesAndSolutions: [
      {
        challenge: "Varying environmental illumination, shadows, and wet pavement reflections.",
        solution: "Applied adaptive histogram equalization (CLAHE) and multi-scale feature fusion to maintain high recall under poor lighting.",
      },
      {
        challenge: "Edge latency constraints on low-power vehicle hardware.",
        solution: "Quantized neural network weights to FP16 and optimized OpenCV matrix conversions for near 25+ FPS execution.",
      },
    ],
    roadmap: [
      "Integration with vehicle CAN-bus to correlate suspension vibration data with visual road cracks.",
      "Decentralized edge federated learning for continuous model adaptation.",
      "Automated municipal work-order dispatch triggers.",
    ],
  },
  notifyiq: {
    architectureFlow: [
      "1. Terraform declares modular AWS VPC, public/private subnets, and security groups in HCL.",
      "2. Developer pushes commits to GitHub; automated GitHub Actions workflow triggers.",
      "3. Runner executes test suites, builds minimal multi-stage Docker container images, and pushes to registry.",
      "4. SSH deployment runner pulls image onto target AWS EC2 instance and restarts service with zero downtime.",
      "5. AWS CloudWatch alarm monitors container health and CPU utilization metrics.",
    ],
    codeSnippet: {
      language: "hcl",
      filename: "main.tf",
      code: `resource "aws_vpc" "production_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "amay-production-vpc"
    Environment = "production"
    ManagedBy   = "terraform"
  }
}

resource "aws_security_group" "web_sg" {
  name        = "web-server-sg"
  description = "Allow inbound HTTPS and SSH access"
  vpc_id      = aws_vpc.production_vpc.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`,
    },
    challengesAndSolutions: [
      {
        challenge: "Managing remote state concurrency and configuration drift across deployments.",
        solution: "Configured Terraform S3 backend with DynamoDB state locking to ensure atomic team execution.",
      },
      {
        challenge: "Minimizing Docker build latency in GitHub Actions runners.",
        solution: "Implemented multi-stage Docker builds and Docker layer caching with BuildKit.",
      },
    ],
    roadmap: [
      "Automated blue-green canary deployment rollouts.",
      "Terragrunt integration for multi-environment DRY infrastructure code.",
    ],
  },
  "cloud-sentinel": {
    architectureFlow: [
      "1. Multi-tier application microservices are packaged into isolated Docker containers.",
      "2. Kubernetes manifests declare Pods, Deployments, ReplicaSets, and ClusterIP networking.",
      "3. Managed AWS EKS cluster provisions worker node groups across multiple Availability Zones.",
      "4. AWS Network Load Balancer (NLB) distributes incoming ingress traffic across pods.",
      "5. Prometheus scraper scrapes container metrics and dispatches alerts to CloudWatch dashboards.",
    ],
    codeSnippet: {
      language: "yaml",
      filename: "deployment.yaml",
      code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: microservice-app
  namespace: production
  labels:
    app: microservice-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: microservice-app
  template:
    metadata:
      labels:
        app: microservice-app
    spec:
      containers:
      - name: web-service
        image: amaykumar/microservice:latest
        ports:
        - containerPort: 8080
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "100m"
            memory: "128Mi"
        livenessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 10`,
    },
    challengesAndSolutions: [
      {
        challenge: "Ensuring zero-downtime microservice updates and dynamic traffic failover.",
        solution: "Configured Kubernetes RollingUpdate strategy with maxUnavailable: 0 and readiness probes.",
      },
      {
        challenge: "Cluster resource isolation and least privilege security.",
        solution: "Implemented AWS IAM Roles for Service Accounts (IRSA) to grant granular permissions per Pod.",
      },
    ],
    roadmap: [
      "Helm chart packaging for simplified environment parameterization.",
      "Horizontal Pod Autoscaler (HPA) based on Prometheus custom metrics.",
    ],
  },
};

export function generateStaticParams() {
  return PORTFOLIO_DATA.projects.map((p) => ({
    id: p.id,
  }));
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PORTFOLIO_DATA.projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const caseStudy = CASE_STUDY_DATA[id] || {
    architectureFlow: project.technicalArchitecture,
    codeSnippet: {
      language: "text",
      filename: "architecture_spec.txt",
      code: project.technicalArchitecture.join("\n"),
    },
    challengesAndSolutions: [],
    roadmap: ["Continued feature refinement and optimization."],
  };

  return (
    <div className="min-h-screen bg-[#040408] text-slate-100 font-sans selection:bg-purple-600/30 selection:text-white">
      {/* Top Breadcrumb & Return Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-purple-500/20 py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-xs font-mono text-purple-300 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO NEXUS SHOWCASES</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>SPEC: {project.id.toUpperCase()}</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">{project.developmentStatus}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-16 px-4 sm:px-6 space-y-16">
        {/* Project Hero Header */}
        <div className="space-y-4 border-b border-purple-500/20 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-xs font-mono text-cyan-300">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>ENGINEERING CASE STUDY // {project.category}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-mono tracking-tight text-white">
            {project.title}
          </h1>

          <p className="text-lg text-purple-300 font-mono">
            {project.tagline}
          </p>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-3xl pt-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="pt-4 flex gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-semibold transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Repository on GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* Problem & Solution Dual Grid */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-red-500/20 space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Problem Statement & Pain Point</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {project.problemStatement}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Architectural Solution</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {project.highlightMetric || "Engineered for high-reliability, minimal runtime overhead, and deterministic execution."}
            </p>
          </div>
        </section>

        {/* Architecture Data Flow Breakdown */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <span>Architecture & Execution Pipeline</span>
          </h2>

          <div className="space-y-3">
            {caseStudy.architectureFlow.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/40 border border-purple-500/20 text-xs sm:text-sm text-slate-300 font-sans"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Code Snippet Demonstration */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span>Core Implementation Logic</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">
              {caseStudy.codeSnippet.filename}
            </span>
          </div>

          <div className="rounded-xl border border-purple-500/30 bg-slate-950 overflow-hidden shadow-2xl font-mono text-xs">
            <div className="px-4 py-2 bg-slate-900 border-b border-purple-500/20 flex items-center justify-between text-slate-400">
              <span className="text-[11px] text-purple-300">{caseStudy.codeSnippet.filename}</span>
              <span className="text-[10px] uppercase text-cyan-400">{caseStudy.codeSnippet.language}</span>
            </div>
            <pre className="p-4 overflow-x-auto text-slate-200 leading-relaxed">
              <code>{caseStudy.codeSnippet.code}</code>
            </pre>
          </div>
        </section>

        {/* Engineering Challenges & Solutions */}
        {caseStudy.challengesAndSolutions.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-purple-400" />
              <span>Engineering Challenges Overcome</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {caseStudy.challengesAndSolutions.map((cs, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono font-bold text-red-300">
                    Challenge: {cs.challenge}
                  </div>
                  <div className="text-xs text-slate-300 font-sans leading-relaxed">
                    <span className="font-mono text-cyan-400">Solution:</span> {cs.solution}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Future Roadmap */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>Future Roadmap & Next Iterations</span>
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans">
            {caseStudy.roadmap.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-purple-400 font-mono">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
