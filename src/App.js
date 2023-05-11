import React, {Component} from 'react'

import {Gallows} from './components/gallows'
import {Letters} from "./components/letters"

import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

import { Divider }  from "antd";

import {alphabet} from "./assets/alphabet";
import './App.css'

class Karatavas extends Component {

    state = {
        usedLetters: [" "],
        layoutName: 'default',
        disabledButtons: 'Q W Y X',
    }
    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler)
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault()
        })
    }
    onKeyPress = (button) => {
        const key = {key: button}
        if (button === "{shift}" || button === "{lock}") this.handleShift();

        this.keydownHandler(key)
        // console.log('Button pressed', button)
    }
    keydownHandler = (event) => {
        console.log('Button pressed', event)
        if(alphabet.includes(event.key.toUpperCase()) && !this.state.usedLetters.includes(event.key.toUpperCase())) {
            this.setState({
                usedLetters: [...this.state.usedLetters, event.key.toUpperCase()],
                disabledButtons: this.state.disabledButtons + " " + event.key.toUpperCase()
            }, ()=> {
                console.log(this.state.usedLetters)
                console.log("disabled buttons", this.state.disabledButtons)
            })
        }
    }
    handleShift = () => {
        let layoutName = this.state.layoutName;
        let disabledButtons ='Q W R T Y O P D F H J Z X V B M' + this.state.usedLetters.toString()
        let disabledButtonsShift ='Q W Y X' + this.state.usedLetters.toString()

        this.setState({
            layoutName: layoutName === "default" ? "shift" : "default",
            disabledButtons: layoutName === "default" ? disabledButtons : disabledButtonsShift
        });
    };

    render() {

        return (
            <div className="App">
                <Gallows level={1} />
                <Divider />
                <Letters usedLetters={this.state.usedLetters}/>
                <Divider />
                <Keyboard
                    onKeyPress={this.onKeyPress}
                    //  onChange={this.onChange}
                    layoutName={this.state.layoutName}
                    buttonTheme={[
                        {
                            class: "key-disabled",
                            buttons: this.state.disabledButtons
                        },
                        {
                            class: "key-highlight",
                            buttons: "{shift}"
                        }
                    ]}
                    layout={{
                        'default': [
                            'Q W E R T Y U I O P {bksp}',
                            '{shift} A S D F G H J K L',
                            'Z X C V B N M {enter}'
                        ],
                        'shift': [
                            'Q W Ē R T Y Ū Ī O P {bksp}',
                            '{shift} Ā Š D F Ģ H J Ķ Ļ',
                            'Ž X Č V B Ņ M {enter}'
                        ]
                    }}
                    display={{
                        '{bksp}': 'DZĒST',
                        '{enter}': 'APSTIRPINĀT',
                        '{shift}': 'a..ā'
                    }}
                />
            </div>
        );
    }
}

export default Karatavas;
