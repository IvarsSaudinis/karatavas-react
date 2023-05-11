import PropTypes from "prop-types";
import "./letters.css";
import { Char } from "../char";

export const Letters = (props) => {
  let lettersArray = Array.from(props.phrase);

  return (
    <div className="letters">
      {lettersArray.map((letter, index) => {
        return (
          <Char
            key={index}
            letter={props.usedLetters.indexOf(letter) > -1 ? letter : "."}
          />
        );
      })}
    </div>
  );
};

Letters.propTypes = {};
