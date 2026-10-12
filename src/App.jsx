import { useState } from "react";
import { useLenis } from "./hooks/useLenis";
import { registerGsap } from "./animations/gsapSetup";
import HeroSection from "./components/HeroSection";
import HighlightsStrip from "./components/HighlightsStrip";
import AboutSection from "./components/AboutSection";
import CategoryShowcase from "./components/CategoryShowcase";
import MenuExplorer from "./components/MenuExplorer";
import CoffeeStory from "./components/CoffeeStory";
import HotFoodSection from "./components/HotFoodSection";
import FoodMarquee from "./components/FoodMarquee";
import PopularItems from "./components/PopularItems";
import GallerySection from "./components/GallerySection";
import OnTheGoSection from "./components/OnTheGoSection";
import Testimonials from "./components/Testimonials";
import LocationSection from "./components/LocationSection";
import Footer from "./components/Footer";
import "./styles/global.css";

registerGsap();

export default function App() {
  useLenis();
  const [menuCategory, setMenuCategory] = useState("coffee");

  return (
    <main>
      <HeroSection />
      <HighlightsStrip />
      <AboutSection />
      <CategoryShowcase onSelectCategory={setMenuCategory} />
      <MenuExplorer
        activeCategory={menuCategory}
        onCategoryChange={setMenuCategory}
      />
      <CoffeeStory />
      <HotFoodSection onSelectCategory={setMenuCategory} />
      <FoodMarquee />
      <PopularItems />
      <GallerySection />
      <OnTheGoSection />
      <Testimonials />
      <LocationSection />
      <Footer />
    </main>
  );
}
