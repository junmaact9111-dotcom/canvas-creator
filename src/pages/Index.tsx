import { useState } from "react";
import AgentDialog from "@/components/AgentDialog";
import ResultDisplay from "@/components/ResultDisplay";

const Index = () => {
  const [submitted, setSubmitted] = useState(false);
  const [resultData, setResultData] = useState<{
    prompt: string;
    ratio: string;
    referenceImage: string;
    resultImage: string;
  } | null>(null);

  // Inject image into AgentDialog
  const [injectedImage, setInjectedImage] = useState<string | null>(null);
  const [injectedPrompt, setInjectedPrompt] = useState<string | null>(null);

  const handleSubmit = (data: { prompt: string; ratio: string; images: string[] }) => {
    // Simulate a generated result
    setResultData({
      prompt: data.prompt,
      ratio: data.ratio,
      referenceImage: data.images[0] || "https://placehold.co/400x400/e2e8f0/64748b?text=参考图",
      resultImage: "https://placehold.co/800x600/c4b5fd/4c1d95?text=生成结果",
    });
    setSubmitted(true);
  };

  const handleReEdit = () => {
    setSubmitted(false);
    setResultData(null);
  };

  const handleRegenerate = () => {
    // Re-trigger generation with same params (placeholder)
    console.log("Regenerate with:", resultData);
  };

  const handleInjectImage = (src: string) => {
    setInjectedImage(src);
  };

  const handleCopyPrompt = (text: string) => {
    setInjectedPrompt(text);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!submitted ? (
        /* Full dialog centered */
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <h1 className="text-2xl font-semibold text-foreground text-center mb-8">
              AI 制图工具
            </h1>
            <AgentDialog
              compact={false}
              onSubmit={handleSubmit}
              injectedImage={injectedImage}
              injectedPrompt={injectedPrompt}
              onInjectedImageConsumed={() => setInjectedImage(null)}
              onInjectedPromptConsumed={() => setInjectedPrompt(null)}
            />
          </div>
        </div>
      ) : (
        <>
          {/* Result area */}
          <div className="flex-1 flex items-start justify-center p-6 pb-32">
            {resultData && (
              <ResultDisplay
                resultImage={resultData.resultImage}
                referenceImage={resultData.referenceImage}
                promptText={resultData.prompt}
                ratio={resultData.ratio}
                onInjectImage={handleInjectImage}
                onCopyPrompt={handleCopyPrompt}
                onReEdit={handleReEdit}
                onRegenerate={handleRegenerate}
              />
            )}
          </div>

          {/* Compact dialog at bottom */}
          <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4">
            <AgentDialog
              compact={true}
              onSubmit={handleSubmit}
              injectedImage={injectedImage}
              injectedPrompt={injectedPrompt}
              onInjectedImageConsumed={() => setInjectedImage(null)}
              onInjectedPromptConsumed={() => setInjectedPrompt(null)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
