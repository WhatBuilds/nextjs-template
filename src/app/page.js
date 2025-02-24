import Image from "next/image";
import "./globals.css";
import Button from "../components/common/Button";

export default function Home() {
  return (
    <div
      className="w-[100vw] h-[100vh] flex flex-col items-center justify-center bg-purple-100"
      style={{
        backgroundImage: "url('/media/template-background.webp')",
        backgroundSize: "cover", 
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-[80px] font-bold text-white">
        Next Js Template 
      </h1>
      <Button props={{
        label: "Schedule call",
        icon:{
          position: "left"
        }
      }} />
      
      <p className="text-2xl font-bold text-white">Read the Rreadme file and follow the instructions and structure to start.</p>
    </div>
  );
}
