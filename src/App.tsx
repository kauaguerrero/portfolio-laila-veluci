import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Audience from "./components/Audience";
import Experience from "./components/Experience";
import HowItWorks from "./components/HowItWorks";
import Portfolio from "./components/Portfolio";
import Differentials from "./components/Differentials";
import FuturePartners from "./components/FuturePartners";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Audience />
        <Experience />
        <HowItWorks />
        <Portfolio />
        <Differentials />
        <FuturePartners />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
