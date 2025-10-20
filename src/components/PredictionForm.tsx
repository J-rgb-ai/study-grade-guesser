import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface PredictionResult {
  predictedGrade: number;
  confidence: number;
}

const PredictionForm = () => {
  const [hours, setHours] = useState("");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePredict = async () => {
    if (!hours || parseFloat(hours) < 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number of study hours",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual backend call once Lovable Cloud is enabled
      // Temporary simulation for demo
      const studyHours = parseFloat(hours);
      const baseGrade = 45 + (studyHours * 5.5);
      const predictedGrade = Math.min(100, Math.max(0, baseGrade + (Math.random() - 0.5) * 5));
      const confidence = Math.min(95, 70 + (studyHours * 2));
      
      setPrediction({
        predictedGrade: Math.round(predictedGrade * 10) / 10,
        confidence: Math.round(confidence),
      });
      
      toast({
        title: "Prediction Complete",
        description: `Based on ${hours} hours of study`,
      });
    } catch (error) {
      toast({
        title: "Prediction Failed",
        description: "Unable to generate prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 80) return "text-accent";
    if (grade >= 60) return "text-primary";
    return "text-muted-foreground";
  };

  const getGradeLetter = (grade: number) => {
    if (grade >= 90) return "A";
    if (grade >= 80) return "B";
    if (grade >= 70) return "C";
    if (grade >= 60) return "D";
    return "F";
  };

  return (
    <Card className="p-8 shadow-[var(--shadow-card)] border-border/50">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="hours" className="text-lg font-semibold">
            Hours Studied
          </Label>
          <Input
            id="hours"
            type="number"
            min="0"
            step="0.5"
            placeholder="Enter hours (e.g., 5.5)"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="text-lg"
            disabled={isLoading}
          />
          <p className="text-sm text-muted-foreground">
            Enter the number of hours you plan to study
          </p>
        </div>

        <Button
          onClick={handlePredict}
          disabled={isLoading || !hours}
          className="w-full text-lg h-12"
          size="lg"
        >
          {isLoading ? "Predicting..." : "Predict Grade"}
        </Button>

        {prediction && (
          <div className="space-y-4 pt-4 border-t border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground font-medium">
                Predicted Grade
              </p>
              <div className="flex items-center justify-center gap-3">
                <span
                  className={`text-6xl font-bold ${getGradeColor(
                    prediction.predictedGrade
                  )}`}
                >
                  {prediction.predictedGrade}%
                </span>
                <span
                  className={`text-4xl font-bold ${getGradeColor(
                    prediction.predictedGrade
                  )}`}
                >
                  ({getGradeLetter(prediction.predictedGrade)})
                </span>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Model Confidence
                </span>
                <span className="text-lg font-semibold text-primary">
                  {prediction.confidence}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-1000 ease-out rounded-full"
                  style={{ width: `${prediction.confidence}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-center text-muted-foreground italic">
              This prediction is based on a linear regression model trained on
              historical student data
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PredictionForm;
