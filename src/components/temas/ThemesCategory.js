import React, { useEffect } from "react";
import { Navbar } from "../main/Navbar";
import { SideBar } from "./SideBar";
import { WrapImages } from "./WrapImages";
import { useParams } from "react-router-dom";
import { Footer } from "../main/Footer";
import { SearchBar } from "../search/SearchBar";

export const ThemesCategory = () => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="home__main-container">
      <Navbar />
      <SearchBar />
      <div className="temas__search-container">
        <SideBar />
        <WrapImages id={id} />
      </div>
      <Footer />
    </div>
  );
};
