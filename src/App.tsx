import { useState } from "react";
import { EmailStep } from "@/components/EmailStep";
import { JobsStep } from "@/components/JobsStep";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Candidate } from "@/types";

type Step = "email" | "jobs";

export function App() {
  const [step, setStep] = useState<Step>("email");
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  const handleEmailSubmit = (c: Candidate) => {
    setCandidate(c);
    setStep("jobs");
  };

  const handleBack = () => {
    setStep("email");
    setCandidate(null);
  };

  return (
    <>
      <LanguageSwitcher />
      {step === "email" || !candidate ? (
        <EmailStep onSubmit={handleEmailSubmit} />
      ) : (
        <JobsStep candidate={candidate} onBack={handleBack} />
      )}
    </>
  );
}

export default App;
