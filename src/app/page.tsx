import Link from "next/link";
import { Shield, Lock, FileCheck, Layers } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { TextReveal } from "@/components/ui/text-reveal";
import { GlowingButton } from "@/components/ui/glowing-button";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <AuroraBackground className="min-h-screen flex items-center justify-center">
      <div className="z-10 text-center max-w-4xl px-6 w-full mx-auto flex flex-col items-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-lg bg-card/40 backdrop-blur-md border border-primary/20 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <Shield className="w-10 h-10 text-primary" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          LEX<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">VAULT</span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-muted-foreground font-medium mb-4 tracking-tight">
          PRIVATE PROOF OF EVIDENCE
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto h-16">
          <TextReveal text='"Verify authenticity without revealing confidential evidence."' />
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/dashboard">
            <GlowingButton size="lg" className="w-full sm:w-auto text-lg px-8 py-6 h-auto">
              ENTER DEMO
            </GlowingButton>
          </Link>
          <Link href="/architecture">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 h-auto border-primary/30 hover:bg-primary/10 transition-colors backdrop-blur-md bg-background/30">
              VIEW SYSTEM ARCHITECTURE
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-primary/20 max-w-3xl mx-auto">
          {[
            { icon: Lock, label: "SECURE" },
            { icon: Shield, label: "ZERO-KNOWLEDGE" },
            { icon: FileCheck, label: "TAMPER-EVIDENT" },
            { icon: Layers, label: "AUDITABLE" },
          ].map((feature, i) => (
            <div 
              key={i} 
              className="group flex flex-col items-center text-center space-y-3 p-4 rounded-lg hover:bg-primary/5 transition-all duration-100 border border-transparent hover:border-primary/20 cursor-default"
            >
              <feature.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-100 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <span className="text-sm font-medium tracking-wider text-muted-foreground group-hover:text-foreground transition-colors duration-100">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AuroraBackground>
  );
}
