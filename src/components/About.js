import React, { useState, useEffect } from "react";
// import Filler from "./Filler";
import ProgressBar from "./ProgressBar";
import sanityClient from '../client.js'
import "./css/About.css";
import Loader from "react-spinners/BarLoader";

function About(props) {

  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'skill']{
            name,
            tech,
            exp
          
        }`
        
      )
      .then((data) => setAuthorData(data))
      .catch(console.error);
  }, []);
  
  return (
    
    <section className="section-about">
      <h1 className="section-about-heading">About Me</h1>
     {!authorData && <Loader />}
      <div className="progress-bars-wrapper">
        {authorData && authorData.map((skill, index) => (
        <div key={index}>
          <ProgressBar percentage={skill.exp}><span>{skill.name}</span>: {skill.tech}</ProgressBar>
        </div>
          
        ))}
        
      </div>
      
    </section>
  );
}

export default About;