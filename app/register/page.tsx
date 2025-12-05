import { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Create your free account - Giteria",
  description: "Join Giteria to build software better, together. AI-powered Git platform for modern development teams.",
};

export default function RegisterPage() {
  return <RegisterClient />;
}