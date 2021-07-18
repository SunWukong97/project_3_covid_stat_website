import React from "react";
import "./AboutSection.css";
function AboutSection() {
  return (
    <div className="about-container">
      <h2>About</h2>
      <p>
        This is a personal project where I create a react app along with the
        usage of the <a href="https://opencovid.ca/api/">Open Covid API</a> to
        create a visual representation of Covid stats in Canada. Additional
        features such as more in-depth statistics and info will be added in the
        future.
      </p>
    </div>
  );
}

export default AboutSection;
