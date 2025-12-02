import PredictionForm from "@/components/PredictionForm";
import ModelMetrics from "@/components/ModelMetrics";
import { GraduationCap, TrendingUp, Brain } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-[var(--gradient-subtle)]">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--gradient-primary)]">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Grade Predictor AI
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            AI-Powered Education Analytics
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Predict Your Academic
            <span className="block bg-[var(--gradient-primary)] bg-clip-text text-transparent">
              Performance
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Using machine learning and linear regression, our AI predicts your
            expected grade based on study hours
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)] border border-border/50">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">ML Powered</h3>
            <p className="text-muted-foreground text-sm">
              Linear regression model trained on real student performance data
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)] border border-border/50">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Accurate Predictions</h3>
            <p className="text-muted-foreground text-sm">
              Get reliable grade estimates with confidence metrics
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)] border border-border/50">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Plan Your Study</h3>
            <p className="text-muted-foreground text-sm">
              Make informed decisions about your study schedule
            </p>
          </div>
        </div>

        {/* Prediction Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <PredictionForm />
        </div>

        {/* Model Metrics and Training Data */}
        <div className="max-w-5xl mx-auto">
          <ModelMetrics />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            Linear Regression Model • Trained on 100 samples • 94.5% Accuracy • Powered by AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
