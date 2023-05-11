import PropTypes from "prop-types";
import { Button } from "antd";
import "antd/dist/reset.css";

import "./char.css";

export const Char = (props) => {
  return (
    <Button className={"char"} disabled={props.letter === " "}>
      {props.letter}
    </Button>
  );
};

Char.propTypes = {};
