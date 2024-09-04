import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col antialiased px-6">
      <Header />
      <h5>signIn</h5>
    </div>
  );
}
