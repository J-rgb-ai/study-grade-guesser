import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ModelMetric {
  model_name: string;
  accuracy_score: number;
  mean_absolute_error: number;
  r_squared: number;
  training_samples: number;
}

interface TrainingData {
  hours_studied: number;
  grade_achieved: number;
}

const ModelMetrics = () => {
  const [metrics, setMetrics] = useState<ModelMetric | null>(null);
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);
  const [showAllData, setShowAllData] = useState(false);

  useEffect(() => {
    fetchMetrics();
    fetchTrainingData();
  }, []);

  const fetchMetrics = async () => {
    const { data } = await supabase
      .from("model_metrics")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    
    if (data) setMetrics(data);
  };

  const fetchTrainingData = async () => {
    const { data } = await supabase
      .from("training_data")
      .select("hours_studied, grade_achieved")
      .order("hours_studied");
    
    if (data) setTrainingData(data);
  };

  if (!metrics) return null;

  const displayedData = showAllData ? trainingData : trainingData.slice(0, 10);

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-[var(--shadow-card)] border-border/50">
        <h2 className="text-2xl font-bold mb-4">AI Model Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Model Type</p>
            <p className="text-lg font-semibold text-foreground">{metrics.model_name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Accuracy</p>
            <p className="text-lg font-semibold text-accent">{metrics.accuracy_score}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">R² Score</p>
            <p className="text-lg font-semibold text-primary">{metrics.r_squared}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">MAE</p>
            <p className="text-lg font-semibold text-foreground">{metrics.mean_absolute_error}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border/50">
          <Badge variant="secondary" className="text-sm">
            Trained on {metrics.training_samples} data points
          </Badge>
        </div>
      </Card>

      <Card className="p-6 shadow-[var(--shadow-card)] border-border/50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Training Dataset</h2>
          <Badge variant="outline">{trainingData.length} samples</Badge>
        </div>
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hours Studied</TableHead>
                <TableHead>Grade Achieved (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{row.hours_studied}</TableCell>
                  <TableCell>{row.grade_achieved}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {!showAllData && trainingData.length > 10 && (
          <button
            onClick={() => setShowAllData(true)}
            className="mt-4 text-sm text-primary hover:underline"
          >
            Show all {trainingData.length} records →
          </button>
        )}
        {showAllData && (
          <button
            onClick={() => setShowAllData(false)}
            className="mt-4 text-sm text-primary hover:underline"
          >
            Show less ←
          </button>
        )}
      </Card>
    </div>
  );
};

export default ModelMetrics;
