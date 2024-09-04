import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen h-auto antialiased px-6 flex">
      <section className="flex flex-col justify-center">
        <span className="text-[2rem] font-bold">
        <strong className="text-green-500">Lorem ipsum</strong> dolor sit amet. 
        </span>
        
        <span className="text-[2rem] font-bold">
        <strong className="text-green-500">Lorem ipsum</strong> dolor sit amet. 
        </span>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto rem itaque tenetur ut eos vel aut beatae soluta, accusamus aliquam placeat doloremque est labore iure! Ex possimus temporibus optio doloribus?</p>
      </section>
      <div>
        img
      </div>
    </div>
  );
}
