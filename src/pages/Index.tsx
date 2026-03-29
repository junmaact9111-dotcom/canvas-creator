import AgentDialog from "@/components/AgentDialog";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-foreground text-center mb-8">
          AI 制图工具
        </h1>
        <AgentDialog />
      </div>
    </div>
  );
};

export default Index;
