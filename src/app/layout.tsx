import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#040408",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Amay Kumar | Cloud & DevOps Engineer | AWS Certified Cloud Practitioner",
  description:
    "Official portfolio of Amay Kumar. AWS Certified Cloud Practitioner, Cloud & DevOps Engineer specializing in AWS, Docker, Kubernetes, Terraform, and CI/CD. BCA @ Dr. D. Y. Patil Vidyapeeth, Pune.",
  keywords: [
    "Amay Kumar",
    "Cloud Engineer",
    "DevOps Engineer",
    "AWS Certified Cloud Practitioner",
    "CLF-C02",
    "Terraform",
    "Docker",
    "Kubernetes",
    "AWS EKS",
    "AWS EC2",
    "AWS S3",
    "Linux",
    "Bash",
    "Python",
    "Pune",
  ],
  authors: [{ name: "Amay Kumar", url: "https://github.com/Amay100506" }],
  creator: "Amay Kumar",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amaykumar.dev",
    title: "Amay Kumar | Cloud & DevOps Engineer | AWS Certified Cloud Practitioner",
    description:
      "AWS Certified Cloud Practitioner and DevOps Engineer specializing in automated cloud infrastructure, container orchestration, and CI/CD pipelines.",
    siteName: "Amay Kumar Portfolio Nexus",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amay Kumar | Software Engineer & AI Systems Developer",
    description:
      "Building at the intersection of Software Engineering, Cloud Computing and Artificial Intelligence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { I18nProvider } from "@/context/I18nContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PORTFOLIO_DATA.personal.name,
    jobTitle: "Software Engineer & AI Systems Developer",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: PORTFOLIO_DATA.personal.education.institution,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "India",
    },
    url: "https://amaykumar.dev",
    sameAs: [
      PORTFOLIO_DATA.personal.social.github,
      PORTFOLIO_DATA.personal.social.linkedin,
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#040408] text-slate-100 flex flex-col font-sans selection:bg-purple-600/30 selection:text-white`}
      >
        <I18nProvider>
          <AccessibilityProvider>
            {children}
          </AccessibilityProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
