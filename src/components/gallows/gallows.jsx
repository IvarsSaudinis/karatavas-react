import PropTypes from "prop-types";
import "./gallows.css";

const img1 = require("../../images/1.png");

export const Gallows = (props) => {
  return (
    <div className="gallows">
      <img
        src={img1}
        alt="gallows"
        style={{ width: "80%", textAlign: "center" }}
      />
      <div>{"LEVEL: " + props.level + "/7"}</div>
    </div>
  );
};

Gallows.propTypes = {};
