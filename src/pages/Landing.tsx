import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Users, Zap } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl" />
        
        <div className="relative container mx-auto px-4 py-20">
          {/* Navigation */}
          <nav className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                PeerUp
              </span>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/auth")}
              className="border-primary/20 hover:border-primary/40 hover:bg-primary/10"
            >
              Sign In
            </Button>
          </nav>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Connect, Chat,{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Collaborate
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the next generation of real-time collaboration. Connect with peers,
              share ideas, and build meaningful relationships.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8"
                onClick={() => navigate("/auth")}
              >
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary/20 hover:border-primary/40 hover:bg-primary/10 text-lg px-8"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-20 animate-slide-up">
            <FeatureCard
              icon={<MessageCircle className="w-6 h-6" />}
              title="Real-time Chat"
              description="Instant messaging with typing indicators and read receipts"
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Smart Profiles"
              description="Showcase your skills and connect with like-minded peers"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Lightning Fast"
              description="Built for speed with cutting-edge technology"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-all duration-300 hover:scale-105">
      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 text-primary-foreground">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Landing;