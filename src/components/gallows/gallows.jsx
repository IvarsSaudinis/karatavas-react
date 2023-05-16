import PropTypes from "prop-types";
import { Alert } from "antd";
import "./gallows.css";

const img0 = require("../../images/0.png");
const img1 = require("../../images/1.png");
const img2 = require("../../images/2.png");
const img3 = require("../../images/3.png");
const img4 = require("../../images/4.png");
const img5 = require("../../images/5.png");
const img6 = require("../../images/6.png");
const img7 = require("../../images/7.png");

const image = [img0, img1, img2, img3, img4, img5, img6, img7];

export const Gallows = (props) => {
  return (
    <div className="gallows">
      {props.level > 7 ? (
        <Alert
          className={"alert"}
          message="Spēle beigusies!"
          description="Diemžēl jums neizdevās izglābt cilvēciņu. Mēģiniet vēlreiz!"
          type="error"
          showIcon
        />
      ) : (
        <img
          src={image[props.level]}
          alt="gallows"
          style={{ width: "80%", textAlign: "center" }}
        />
      )}

      <div>{"Pakāpe: " + props.level + "/7"}</div>
    </div>
  );
};

Gallows.propTypes = {};
