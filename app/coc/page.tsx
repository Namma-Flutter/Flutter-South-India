import type { Metadata } from "next";
import CodeOfConductPage from "@/components/coc/CodeOfConductPage";

export const metadata: Metadata = {
  title: "Code of Conduct | Namma Flutter & Flutter South India 2026",
  description:
    "Our community Code of Conduct and Anti-Harassment policy. We are dedicated to providing a safe, welcoming, and harassment-free experience for everyone.",
  openGraph: {
    title: "Code of Conduct | Namma Flutter Community",
    description:
      "Our community guidelines, safety values, and anonymous reporting procedures for Flutter South India 2026.",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <CodeOfConductPage />;
}
