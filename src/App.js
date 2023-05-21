import React, { Component } from "react";

import { Gallows } from "./components/gallows";
import { Letters } from "./components/letters";

import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import { Divider, Drawer, Modal, Tag } from "antd";

import { alphabet } from "./assets/alphabet";
import { data } from "./assets/vocabulary";
import "./App.css";

class Karatavas extends Component {
  state = {
    usedLetters: [" "],
    layoutName: "default",
    disabledButtons: "Q W Y X",
    phrase: "",
    level: 0,
    openDrawer: false,
    openModal: false,
    openWinningModal: false,
  };

  componentDidMount() {
    document.addEventListener("keydown", this.keydownHandler);
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    const randomPhrase = this.choosePhrase();
    this.setState({
      phrase: randomPhrase,
    });
  }
  choosePhrase = () => {
    const randomElement =
      data.vocabulary[Math.floor(Math.random() * data.vocabulary.length)];
    return randomElement.phrase.toUpperCase();
  };
  onKeyPress = (button) => {
    const key = { key: button };
    if (button === "{shift}" || button === "{lock}") this.handleShift();

    this.keydownHandler(key);
    // console.log('Button pressed', button)
  };
  keydownHandler = (event) => {
    if (event.key === "{info}") {
      this.setState({
        openDrawer: true,
      });
    }

    if (event.key === "{about}") {
      this.setState({
        openModal: true,
      });
    }

    if (
      alphabet.includes(event.key.toUpperCase()) &&
      !this.state.usedLetters.includes(event.key.toUpperCase())
    ) {
      this.setState(
        {
          usedLetters: [...this.state.usedLetters, event.key.toUpperCase()],
          disabledButtons:
            this.state.disabledButtons + " " + event.key.toUpperCase(),
        },
        () => {
          const level = this.state.usedLetters.filter(
            (letter) => this.state.phrase.indexOf(letter) === -1
          ).length;

          const foundLetters = this.state.phrase.split("");

          if (
            foundLetters.every(
              (letter) => this.state.usedLetters.includes(letter) && level < 7
            )
          ) {
            this.setState({
              openWinningModal: true,
            });
          }

          this.setState({
            level: level,
          });
        }
      );
    }
  };
  closeDrawer = () => {
    this.setState({
      openDrawer: false,
    });
  };
  handleOk = () => {
    this.setState({
      openModal: false,
      openWinningModal: false,
    });
  };
  handleShift = () => {
    let layoutName = this.state.layoutName;
    let disabledButtons =
      "Q W R T Y O P D F H J Z X V B M" + this.state.usedLetters.join(" ");
    let disabledButtonsShift = "Q W Y X" + this.state.usedLetters.join(" ");

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default",
      disabledButtons:
        layoutName === "default" ? disabledButtons : disabledButtonsShift,
    });
  };

  render() {
    const {
      level,
      phrase,
      usedLetters,
      openDrawer,
      openModal,
      openWinningModal,
    } = this.state;
    return (
      <div className="App">
        <Gallows level={level} />
        <Divider />
        <Letters phrase={phrase} usedLetters={usedLetters} />
        <Divider />
        <div className="footer">
          <Keyboard
            onKeyPress={this.onKeyPress}
            //  onChange={this.onChange}
            layoutName={this.state.layoutName}
            buttonTheme={[
              {
                class: "key-disabled",
                buttons: this.state.disabledButtons,
              },
              {
                class: "key-highlight",
                buttons: "{shift}",
              },
              {
                class: "key-info",
                buttons: "{info}",
              },
            ]}
            layout={{
              default: [
                "Q W E R T Y U I O P {about}",
                "{shift} A S D F G H J K L",
                "Z X C V B N M {info}",
              ],
              shift: [
                "Q W Ē R T Y Ū Ī O P {about}",
                "{shift} Ā Š D F Ģ H J Ķ Ļ",
                "Ž X Č V B Ņ M {info}",
              ],
            }}
            display={{
              "{about}": "par",
              "{info}": "info",
              "{shift}": "a..ā",
            }}
          />
        </div>
        <Drawer
          title="Vārdi"
          placement="right"
          open={openDrawer}
          onClose={this.closeDrawer}
        >
          {data.vocabulary.map((i, index) => (
            <Tag style={{ marginBottom: "4px" }} key={index}>
              {i.phrase}
            </Tag>
          ))}
        </Drawer>
        {/*winnind modal*/}
        <Modal
          title={"Apsveicu!"}
          open={openWinningModal}
          closable={false}
          onOk={this.handleOk}
          cancelButtonProps={{ hidden: true }}
        >
          <p>Frāze ir uzminēta!</p>
        </Modal>

        {/*about*/}
        <Modal
          open={openModal}
          title={"Par lietotni"}
          onOk={this.handleOk}
          closable={false}
          cancelButtonProps={{ hidden: true }}
        >
          <p>
            <strong>Klasiska karātavu spēle.</strong>
          </p>
          <p>
            Minamās frāzes prātoja ChatGPT. Karātavu dizains, konstrukcijas
            uzbūve - Kristers
          </p>
          <p>
            Kods pieejams{" "}
            <a
              target={"_blank"}
              href={"https://github.com/IvarsSaudinis/karatavas-react"}
            >
              github
            </a>{" "}
            un darbojas{" "}
            <a target={"_blank"} href={"https://vercel.com/"}>
              {" "}
              Vercel{" "}
            </a>{" "}
            platformā
          </p>
        </Modal>
      </div>
    );
  }
}

export default Karatavas;
