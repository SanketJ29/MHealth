import React from "react";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";
// import Team from "../components/Team";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Welcome/>
            {/* <Team/> */}
        </div>
    );
};

export default Home;