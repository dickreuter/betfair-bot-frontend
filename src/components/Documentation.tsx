import React from "react";
import data from "./factors.json";
import "bootstrap/dist/css/bootstrap.css";
import "./Documentation.css"; // Import custom CSS for specific styles

const Documentation = () => {
  const dataAttributes = data.data_attributes;

  return (
    <>
      <div className="video my-video">
        <iframe
          src="https://app.colossyan.com/embed/4b33b5ca-6c65-4fbb-811d-32a4a6c2c79e"
          width="730"
          height="415"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className="custom-header">Documentation of Strategy Factors</div>
      <table className="table-left-align"> {/* Custom class for table alignment */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Example</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {dataAttributes.map((attribute, index) => (
            <tr key={index}>
              <td>{attribute.name}</td>
              <td>{attribute.example}</td>
              <td>{attribute.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Documentation;
