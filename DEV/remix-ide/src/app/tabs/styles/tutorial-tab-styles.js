const csjs = require('csjs-inject')
const styleGuide = require('../../ui/styles-guide/theme-chooser')
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
`