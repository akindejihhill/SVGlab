import {useEffect, useState, useRef } from "react";
import ShowHide from './ShowHide';
// import {releaseKey, insertText, shortcutKey} from './helperFunctions'; //work on this later

/**
 * SVG Code is edited here
 */
function CSSEditor({content, setContent}){

    const CSSAreaRef = useRef();

    /**Work on these later, they go with the experemental helper functions*/
    // const [altPressed, setAltPressed] = useState(false);
    // const [ctrlPressed, setCtrlPressed] = useState(false);

    function handleChange(evt) {
        const value = evt.target.value;
        setContent(value);
        console.log(content);
    }

    return <div>
        <label htmlFor="SVG-editor" className="visually-hidden">Content</label>
        <textarea
            name="CSSCode"
            id="CSS-editor"
            className="editor-input"
            placeholder="CSS code go in here."
            value={content}
            onChange={handleChange}
            // onKeyDown={shortcutKey} //For the experemental helper functions
            // onKeyUp={releaseKey}    //For the experemental helper functions
            ref={CSSAreaRef}
        />
    </div>
}


function SVGEditor({content, setContent}){

    const SVGAreaRef = useRef();

    /**Work on these later, they go with the experemental helper functions*/
    // const [altPressed, setAltPressed] = useState(false);
    // const [ctrlPressed, setCtrlPressed] = useState(false);

    function handleChange(evt) {
        const value = evt.target.value;
        setContent(value);
        console.log(content);
    }



    return <div>
        <label htmlFor="SVG-editor" className="visually-hidden">Content</label>
        <textarea
            name="SVGCode"
            id="SVG-editor"
            className="editor-input"
            placeholder="SVG or HTML elements go in here."
            value={content}
            onChange={handleChange}
            // onKeyDown={shortcutKey} //For the experemental helper functions
            // onKeyUp={releaseKey}    //For the experemental helper functions
            ref={SVGAreaRef}
        />
    </div>
}

function JSEditor({content, setContent}){

    const JSAreaRef = useRef();

    /**Work on these later, they go with the experemental helper functions*/
    // const [altPressed, setAltPressed] = useState(false);
    // const [ctrlPressed, setCtrlPressed] = useState(false);

    function handleChange(evt) {
        const value = evt.target.value;
        setContent(value);
        console.log(content);
    }


    return <div>
        <label htmlFor="JS-editor" className="visually-hidden">Content</label>
        <textarea
            name="JSCode"
            id="JS-editor"
            className="editor-input"
            placeholder="JavaScript code goes in here."
            value={content}
            onChange={handleChange}
            // onKeyDown={shortcutKey} //For the experemental helper functions
            // onKeyUp={releaseKey}    //For the experemental helper functions
            ref={JSAreaRef}
        />
    </div>
}

function Editor(){

    const [cssContent, setCssContent] = useState("");
    const [svgContent, setSvgContent] = useState("");
    const [jsContent, setJsContent] = useState("");
    const [svg, setSvg] = useState("");

    useEffect(()=>{
        const svgCode = "<style>" + cssContent + "</style>" + `\n` + svgContent + `\n`;
        setSvg(svgCode);
    },[cssContent, svgContent]);

    //execute injected javascript code after the rest of the svg code has been rendered
    useEffect(() => {
        if (jsContent) {
            const blob = new Blob([jsContent], { type: 'application/javascript' });
            const scriptURL = URL.createObjectURL(blob);
            const scriptEl = document.createElement('script');
            scriptEl.src = scriptURL;
            document.body.appendChild(scriptEl);
    
            // Clean up to avoid memory leaks
            return () => {
                URL.revokeObjectURL(scriptURL);
                document.body.removeChild(scriptEl);
            };
        }
    }, [jsContent]);

    return <div>
        <div id="page-header">
            <h1 className="sandbox" >SVG/HTML Sandbox: </h1>
            <p> A place to quickly experement with with SVG or HTML effects.</p>
        </div>
        <div id="writing-section" >
            <div id="editor-section">
                <ShowHide comp={<CSSEditor content={cssContent} setContent={setCssContent} />} compVisible={false} title="Edit CSS"/>
                <ShowHide comp={<SVGEditor content={svgContent} setContent={setSvgContent} />} compVisible={true} title="Edit SVG"/>
                <ShowHide comp={<JSEditor content={jsContent} setContent={setJsContent} />} compVisible={false} title="Edit JavaScript"/>
            </div>

            <div className="outputsection" id="preview">
                <div id="preview-header">Preview</div>
                <div className="content" dangerouslySetInnerHTML={{ __html: svg }}>
                </div>
            </div>
        </div>
    </div>
        
}

export default Editor;