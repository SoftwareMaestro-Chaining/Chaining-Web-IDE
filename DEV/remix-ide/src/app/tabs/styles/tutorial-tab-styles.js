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

  .instanceButton {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    width: 100%;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: flex;
    font-size: 16px;
  }

  .instanceButtonNonePay {
    background-color: #da368c; /* Green */
    border: none;
    color: white;
    width: 100%;
    padding: 15px 32px;
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: center;
    text-decoration: none;
    display: flex;
    font-size: 16px;
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
`
module.exports = css
