import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Brands from "./components/Brands";
import TireCategories from "./components/TireCategories";
import About from "./components/About";
import ProductCatalog from "./components/ProductCatalog";
import Contact from "./components/Contact";
import Location from "./components/Location";
import Footer from "./components/Footer";
import CatalogHost from "./components/CatalogHost";
import FloatingButtons from "./components/FloatingButtons";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Brands />
        <TireCategories />
        <About />
        <ProductCatalog />
        <Contact />
        <Location />
      </main>

      <Footer />
      <CatalogHost />
      <FloatingButtons />
    </>
  );
}

export default App;
