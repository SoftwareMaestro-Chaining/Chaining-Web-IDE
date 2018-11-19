const csjs = require("csjs-inject")
const styleGuide = require("../../ui/styles-guide/theme-chooser")
const styles = styleGuide.chooser()

const css = csjs`
  .tutorialTabView {
    padding: 2%;
    display: flex;
    flex-direction: column;
  }
  .instanceContainer {
    ${styles.rightPanel.runTab.box_Instance}
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
    border: none;
    text-align: center;
    padding: 10px 0px 15px 15px;
  }


  .instanceButtonNonePay {
    background: #fbd6d6; /* pink */


    border-radius: 7px;
    box-shadow: 5px 5px 0  #ffb5bb;
    color: black;
    cursor: pointer;
    margin: 10px;
    outline: 0;
    border: 0;
    display: inline-block;
    width: 220px;
    height: 40px;
    transition: all .1s linear;
     font-size: 10px;
  }

  .instanceButtonNonePay:active {
    box-shadow: 0 2px 0 #ffb5bb;
    transform: translateY(3px);    
  }

  .instanceButton {
    background: #dcfae6;/* light green */


    border-radius: 7px;
    box-shadow: 5px 5px 0 #8fddb5;
    color: black;
    cursor: pointer;
    margin: 10px;
    outline: 0;
    border: 0;
    display: inline-block;
    width: 220px;
    height: 40px;
    transition: all .1s linear;
    font-size: 10px;
  }

  .instanceButton:active {
    box-shadow: 0 2px 0 #8fddb5;
    transform: translateY(3px);    
  }

  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  .modalContent {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
  }

  @-webkit-keyframes animatetop {
    from {top:-300px; opacity:0} 
    to {top:0; opacity:1}
  }

  @keyframes animatetop {
    from {top:-300px; opacity:0}
    to {top:0; opacity:1}
  }

  .close {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .modalHeader {
    padding: 2px 16px;
    background-color: #5cb85c;
    color: white;
  }

  .modalBody {padding: 2px 16px;}

  .modalFooter {
    padding: 2px 16px;
    background-color: #5cb85c;
    color: white;
  }

  .indent {
    padding-left: 1.8em;
  }
`
module.exports = css
