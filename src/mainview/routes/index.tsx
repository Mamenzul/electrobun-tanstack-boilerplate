import { createFileRoute } from "@tanstack/react-router";
import { Counter } from "@/components/Counter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Zap, Cpu, Layout, DatabaseZap, Github, ShieldCheck, Rocket, Code2, Sparkles, Terminal, FileText, FlaskConical } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
      <div className="container mx-auto px-6 py-8 max-w-6xl space-y-10">

        {/* Hero Section */}
        <header className="text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center justify-center p-3 bg-primary/15 rounded-full shadow-[0_0_40px_-10px_rgba(var(--primary-rgb),0.3)] border border-primary/25 mb-2 group hover:scale-105 transition-transform duration-500">
            <Zap className="w-12 h-12 text-primary fill-primary/30 group-hover:fill-primary/50 transition-all" />
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tight text-foreground sm:text-6xl">
              Electrobun <span className="text-primary bg-clip-text">Desktop</span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed px-4">
              A high-performance, type-safe foundation for building native desktop applications with the power of
              <span className="text-foreground"> Bun</span>,
              <span className="text-foreground"> React</span>, and
              <span className="text-foreground"> SQLite</span>.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <Badge variant="outline" className="px-3 py-1 text-xs bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-colors">
              <Cpu className="w-3.5 h-3.5 mr-1.5 text-primary" /> Bun v1.x
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-xs bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-colors">
              <Layout className="w-3.5 h-3.5 mr-1.5 text-primary" /> TanStack Stack
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-xs bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-colors">
              <DatabaseZap className="w-3.5 h-3.5 mr-1.5 text-primary" /> Drizzle ORM
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-xs bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-colors">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-primary" /> Tailwind v4
            </Badge>
          </div>
        </header>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            icon={<Rocket className="w-5 h-5 text-orange-500" />}
            title="Lightning Fast"
            description="Bun-powered runtime and Vite HMR provide a near-instant developer experience."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-5 h-5 text-green-500" />}
            title="Type-Safe RPC"
            description="Seamless communication between your Bun backend and React frontend."
          />
          <FeatureCard
            icon={<DatabaseZap className="w-5 h-5 text-blue-500" />}
            title="Local Persistence"
            description="Embedded SQLite database with Drizzle ORM for reliable data management."
          />
        </section>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Area */}
          <div className="lg:col-span-7 space-y-8">
            <Counter />

            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                Developer Experience
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DXCard
                  title="HMR Enabled"
                  description="Real-time UI updates while developing."
                  icon={<Sparkles className="w-3.5 h-3.5" />}
                />
                <DXCard
                  title="TDD Ready"
                  description="Pre-configured Vitest + Testing Library."
                  icon={<FlaskConical className="w-3.5 h-3.5" />}
                />
                <DXCard
                  title="File-based Routing"
                  description="TanStack Router for type-safe navigation."
                  icon={<Layout className="w-3.5 h-3.5" />}
                />
                <DXCard
                  title="Modern UI Kit"
                  description="shadcn/ui components ready to go."
                  icon={<ShieldCheck className="w-3.5 h-3.5" />}
                />
              </div>
            </div>
          </div>

          {/* Sidebar / Status */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="overflow-hidden border-primary/20 shadow-xl bg-card/50 backdrop-blur-sm">
              <div className="h-1.5 w-full bg-primary" />
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  System Stack
                </CardTitle>
                <CardDescription className="text-xs">Current runtime environment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 font-medium">
                  <StackItem label="Runtime" value="Bun" detail="Fast JS execution" />
                  <StackItem label="Bridge" value="Electrobun" detail="Native wrapper" />
                  <StackItem label="Frontend" value="React 19" detail="Component-driven" />
                  <StackItem label="Styling" value="Tailwind v4" detail="Modern CSS" />
                  <StackItem label="DB Engine" value="SQLite" detail="Native performance" />
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 pt-3 flex flex-row gap-3">
                <a
                  href="https://github.com/blackboardsh/electrobun"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "default", size: "sm" }), "flex-1 font-bold shadow-sm text-xs")}
                >
                  <Github className="w-3.5 h-3.5 mr-1.5" />
                  Source
                </a>
                <a
                  href="https://electrobun.dev/docs"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1 font-bold shadow-sm text-xs")}
                >
                  <FileText className="w-3.5 h-3.5 mr-1.5" />
                  Docs
                </a>
              </CardFooter>
            </Card>

            <Card className="border-dashed border-primary/30 bg-primary/5">
              <CardContent className="pt-4 pb-4">
                <p className="text-xs text-muted-foreground leading-relaxed italic text-center">
                  &quot;Everything you need to build desktop apps that feel native, fast, and modern.&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        </main>

        <footer className="pt-8 pb-4 text-center space-y-2">
          <div className="flex justify-center items-center gap-4 text-muted-foreground/40">
            <div className="h-px w-12 bg-muted-foreground/20" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Built with Electrobun</span>
            <div className="h-px w-12 bg-muted-foreground/20" />
          </div>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all hover:shadow-lg group">
      <CardHeader>
        <div className="p-3 w-fit rounded-xl bg-muted/50 mb-2 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

function DXCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
      <div className="p-2 bg-primary/10 rounded-lg text-primary">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-sm leading-none mb-1">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function StackItem({ label, value, detail }: { label: string, value: string, detail: string }) {
  return (
    <div className="flex justify-between items-center group">
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{label}</span>
        <span className="text-sm">{value}</span>
      </div>
      <Badge variant="outline" className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
        {detail}
      </Badge>
    </div>
  );
}

