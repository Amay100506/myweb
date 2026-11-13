import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amay Kumar | Portfolio Nexus",
    short_name: "Amay Portfolio",
    description: "Next-generation personal portfolio & developer command center for Amay Kumar.",
    start_url: "/",
    display: "standalone",
    background_color: "#040408",
    theme_color: "#040408",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icons/monogram.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
    ],
  };
}
