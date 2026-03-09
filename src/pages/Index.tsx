import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TrophyRoom from "@/components/TrophyRoom";
import StackBadges from "@/components/StackBadges";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <TrophyRoom />
      <StackBadges />
      <ContactSection />
    </div>
  );
};

export default Index;
