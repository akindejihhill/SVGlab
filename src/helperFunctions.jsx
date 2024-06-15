function releaseKey(evt){
    if (evt.key === "Alt"){
        setAltPressed(false);
    }
    if (evt.key === "Control"){
        setCtrlPressed(false);
    }
}

function insertText(insert){
    // get caret position/selection
    let val = content;
    const start = textAreaRef.current.selectionStart;
    const end = textAreaRef.current.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    let newVal = val.substring(0, start) + insert + val.substring(end);
    setContent(newVal);

    // Calculate new cursor position
    const newCursorPos = start + insert.length;
    setCursorPosition(newCursorPos); // Store new cursor position in state
}

function shortcutKey(evt){
    if (evt.key === "Alt") {setAltPressed(true)}
    if (evt.key === "Control") {setCtrlPressed(true)}
    if (evt.key === " " && ctrlPressed) { // Alt-Space was pressed
        insertText("&nbsp;");
    }
    if (evt.key === "t" && altPressed) { // Alt-t was pressed
        insertText("    ");
    }

    console.log("->"+evt.key+"<-");
    console.log(textAreaRef.current.selectionStart);
    console.log(textAreaRef.current.selectionEnd);
}

export {releaseKey, insertText, shortcutKey};