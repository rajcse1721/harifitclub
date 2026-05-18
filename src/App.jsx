import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Programs from "./components/Programs";
import Classes from "./components/Classes";
import Booking from "./components/Booking";
import Membership from "./components/Membership";
import Nutrition from "./components/Nutrition";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedClass, setSelectedClass] = useState("");

  const goTo = (section) => setActiveSection(section);

  const handleBookClass = (type) => {
    setSelectedClass(type);
    setActiveSection("booking");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <>
            <Home
              onBook={() => goTo("booking")}
              onPrograms={() => goTo("programs")}
            />
            <Programs />
            <Classes onBook={handleBookClass} />
            <Booking
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
            />
            <Membership onBook={() => goTo("booking")} />
            <Nutrition onBook={() => goTo("booking")} />
            <Testimonials />
          </>
        );
      case "programs":
        return <Programs />;
      case "classes":
        return <Classes onBook={handleBookClass} />;
      case "booking":
        return (
          <Booking
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
          />
        );
      case "membership":
        return <Membership onBook={() => goTo("booking")} />;
      case "nutrition":
        return <Nutrition onBook={() => goTo("booking")} />;
      default:
        return (
          <>
            <Home
              onBook={() => goTo("booking")}
              onPrograms={() => goTo("programs")}
            />
            <Programs />
            <Classes onBook={handleBookClass} />
            <Booking
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
            />
            <Membership onBook={() => goTo("booking")} />
            <Nutrition onBook={() => goTo("booking")} />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div
      style={{ background: "#0f0f0f", color: "#f0f0f0", minHeight: "100vh" }}
    >
      <Nav active={activeSection} setActive={goTo} />
      <div style={{ paddingTop: 60 }}>
        {renderSection()}
        <Footer setActive={goTo} />
      </div>
    </div>
  );
}
