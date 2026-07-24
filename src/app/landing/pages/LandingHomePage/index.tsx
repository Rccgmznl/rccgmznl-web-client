import EventsSection from "./EventsSection";
import FooterSection from "./FooterSection";
import GivingSection from "./GivingSection";
import HeroSection from "./HeroSection";
import ImageGallery from "./ImageGallery";
import LatestSermonSection from "./LatestSermonSection";
import LeadersSection from "./LeadersSection";
import MapSection from "./MapSection";
import RideSection from "./RideSection";
import WelcomeSection from "./WelcomeSection";

export default function LandingHomePage() {
    return (
        <>
            <HeroSection />
            <WelcomeSection />
            <EventsSection />
            <LatestSermonSection />
            <LeadersSection />
            <ImageGallery />
            <RideSection />
            <GivingSection />
            <MapSection />
            <FooterSection />
        </>
    );
}
