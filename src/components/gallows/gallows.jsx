import PropTypes from "prop-types";
import "./gallows.css";

const img1 = require("../../images/1.png");

export const Gallows = (props) => {
  return (
    <div className="gallows" style={{ height: "300px" }}>
      <img src={img1} alt="gallows" style={{ height: "100%" }} />
      {"LEVEL: " + props.level + "/7"}
    </div>
  );
};

Gallows.propTypes = {};
