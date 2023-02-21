/** @format */

import React from 'react'

class Editor extends React.Component {
  private _root!: HTMLDivElement // Ref to the editable div
  private _mutationObserver!: MutationObserver // Modifications observer
  private _innerTextBuffer: string = '' // Stores the last printed value

  public componentDidMount() {
    this._root.contentEditable = 'true'
    this._mutationObserver = new MutationObserver(this.onContentChange)
    this._mutationObserver.observe(this._root, {
      childList: true, // To check for new lines
      subtree: true, // To check for nested elements
      characterData: true, // To check for text modifications
    })
  }

  public render() {
    return <div ref={this.onRootRef}>Modify the text here ...</div>
  }

  private onContentChange: MutationCallback = (mutations: MutationRecord[]) => {
    mutations.forEach(() => {
      // Get the text from the editable div
      // (Use innerHTML to get the HTML)
      const { innerText } = this._root

      // Content changed will be triggered several times for one key stroke
      if (!this._innerTextBuffer || this._innerTextBuffer !== innerText) {
        console.log(innerText) // Call this.setState or this.props.onChange here
        this._innerTextBuffer = innerText
      }
    })
  }

  private onRootRef = (elt: HTMLDivElement) => {
    this._root = elt
  }
}

export default Editor
