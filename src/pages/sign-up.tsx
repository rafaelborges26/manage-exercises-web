import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export default function SignUp() {
  return (
    <div className="flex min-h-screen flex-col antialiased px-6">
      <Header />
      <h5>signUp</h5>
    </div>
  );
}
