"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, FileText } from "lucide-react";
import {
  type ClaimFormData,
  initialFormData,
  stageConfigs,
} from "@/lib/claim-types";
import { ClaimResult } from "./claim-result";
import { Stage0Form } from "./stage-0-form";
import { Stage1SearchPolicy } from "./stage-1-search-policy";
import { Stage2CauseOfLoss } from "./stage-2-cause-of-loss";
import { Stage3InterestInsured } from "./stage-3-interest-insured";
import { Stage4KOL } from "./stage-4-kol";
import { Stage5NatureOfLoss } from "./stage-5-nature-of-loss";
import { Stage6Deductible } from "./stage-6-deductible";

export function ClaimRegistrationForm() {
  const [currentStage, setCurrentStage] = useState(0);
  const [formData, setFormData] = useState<ClaimFormData>(initialFormData);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [lockedFields, setLockedFields] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (updates: Partial<ClaimFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const completeStage = (stage: number, fieldsToLock: string[] = []) => {
    if (!completedStages.includes(stage)) {
      setCompletedStages((prev) => [...prev, stage]);
    }
    if (fieldsToLock.length > 0) {
      setLockedFields((prev) => [...new Set([...prev, ...fieldsToLock])]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCompletedStages([]);
    setLockedFields([]);
    setCurrentStage(0);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return <ClaimResult formData={formData} onReset={resetForm} />;
  }

  return (
    <div className="flex h-full max-h-screen">
      {/* Stage Navigation Sidebar */}
      <div className="w-72 flex flex-col border-r bg-muted/30 p-4 space-y-2.5 max-h-screen">
        <div className="">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Claim Registration
          </h2>
          <p className="text-sm text-muted-foreground">
            Complete all stages to submit
          </p>
        </div>

        <div className="flex-1 flex flex-col space-y-2 pb-2.5 overflow-auto">
          {stageConfigs.map((config) => {
            const isEnabled = config.isEnabled(formData, completedStages);
            const isCompleted = completedStages.includes(config.stage);
            const isActive = currentStage === config.stage;

            return (
              <button
                key={config.stage}
                onClick={() => isEnabled && setCurrentStage(config.stage)}
                disabled={!isEnabled}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all",
                  isActive && "bg-primary text-primary-foreground",
                  !isActive && isEnabled && "hover:bg-muted",
                  !isEnabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
                    isCompleted &&
                      !isActive &&
                      "bg-primary text-primary-foreground",
                    isActive && "bg-primary-foreground text-primary",
                    !isCompleted &&
                      !isActive &&
                      "bg-muted-foreground/20 text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : config.stage}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "font-medium text-sm truncate",
                      !isActive && !isEnabled && "text-muted-foreground"
                    )}
                  >
                    {config.name}
                  </p>
                  <p
                    className={cn(
                      "text-xs truncate",
                      isActive
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {config.description}
                  </p>
                </div>
                {isActive && <ChevronRight className="h-4 w-4 shrink-0" />}
              </button>
            );
          })}
        </div>
        {/* Submit Button */}
        <div className="pt-4 border-t mt-4">
          <Button
            className="w-full"
            disabled={completedStages.length < 7}
            onClick={handleSubmit}
          >
            Submit Claim
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle>{stageConfigs[currentStage].name}</CardTitle>
            <CardDescription>
              {stageConfigs[currentStage].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStage === 0 && (
              <Stage0Form
                formData={formData}
                updateFormData={updateFormData}
                lockedFields={lockedFields}
                onComplete={() => completeStage(0)}
                isCompleted={completedStages.includes(0)}
              />
            )}
            {currentStage === 1 && (
              <Stage1SearchPolicy
                formData={formData}
                updateFormData={updateFormData}
                onComplete={(fieldsToLock) => {
                  completeStage(1, fieldsToLock);
                  setCurrentStage(2);
                }}
              />
            )}
            {currentStage === 2 && (
              <Stage2CauseOfLoss
                formData={formData}
                updateFormData={updateFormData}
                onComplete={(fieldsToLock) => {
                  completeStage(2, fieldsToLock);
                  setCurrentStage(3);
                }}
              />
            )}
            {currentStage === 3 && (
              <Stage3InterestInsured
                formData={formData}
                updateFormData={updateFormData}
                onComplete={(fieldsToLock) => {
                  completeStage(3, fieldsToLock);
                  setCurrentStage(4);
                }}
              />
            )}
            {currentStage === 4 && (
              <Stage4KOL
                formData={formData}
                updateFormData={updateFormData}
                onComplete={(fieldsToLock) => {
                  completeStage(4, fieldsToLock);
                  setCurrentStage(5);
                }}
              />
            )}
            {currentStage === 5 && (
              <Stage5NatureOfLoss
                formData={formData}
                updateFormData={updateFormData}
                onComplete={(fieldsToLock) => {
                  completeStage(5, fieldsToLock);
                  setCurrentStage(6);
                }}
              />
            )}
            {currentStage === 6 && (
              <Stage6Deductible
                formData={formData}
                updateFormData={updateFormData}
                onComplete={(fieldsToLock) => {
                  completeStage(6, fieldsToLock);
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
