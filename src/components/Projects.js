import React, { useState, useEffect } from 'react'
import Loader from 'react-spinners/BarLoader'
import sanityClient from '../client.js'
import './css/Projects.css'
// import image from "./images/dressed2.PNG";

export default function Project() {
  const [projectData, setProjectData] = useState(null)

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'project']{
                title,
                date,
                description,
                link,
                tags,
                projectType,
                
                mainImage{
                    asset->{
                        _id,
                        url
                    },
                    alt
                }
            }`
      )
      .then((data) => setProjectData(data))
      .catch(console.error)
  }, [])

  return (
    <div>
      <section className="section">
        <h1 className="section-heading">My Projects</h1>
        {!projectData && <Loader />}
        <div className="projects-wrapper center">
          {projectData &&
            projectData.map((project, index) => (
              <div className="project" key={index}>
                <div className="project-text">
                  <h2 className="project-name">{project.title}</h2>
                  <h4 className="project-technologies">{project.tags}</h4>
                  <span className="project-type">{project.projectType}</span>
                </div>
                <img
                  src={project.mainImage.asset.url}
                  className="project-img"
                  alt=""
                />
                <a
                  href={project.link}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to site
                </a>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}
