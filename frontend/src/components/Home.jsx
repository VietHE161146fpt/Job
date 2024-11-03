import React, { useEffect } from "react";
import HeroSection from "./auth/HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import useGetAllJobs from "../hook/useGetAllJobs";
import LatestJobs from "./LatestJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "manager") {
      navigate("/admin/manager");
    }
  }, []);
  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  );
};

export default Home;
