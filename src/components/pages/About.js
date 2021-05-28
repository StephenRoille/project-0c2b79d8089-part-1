import React from "react"

const About = () => {
  return (
    <>
      <h1>About this App</h1>
      <p>
        This application allows to search users with the GitHub API{" "}
        <i class='fab fa-github' style={{ color: "dark-grey" }}>
          {" "}
        </i>
        .
      </p>
      <p>
        Shout-out to <a href='https://www.youtube.com/user/TechGuyWeb'>Brad Traversy </a>
        for sharing his React.js knowledge.
      </p>
      <p>
        <b>Version</b>: 0.1.0 - Made with{" "}
        <i class='fas fa-heart' style={{ color: "red" }}></i> and React.js{" "}
        <i class='fab fa-react' style={{ color: "turquoise" }}></i>
      </p>
    </>
  )
}

export default About
