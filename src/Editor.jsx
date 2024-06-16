import {useEffect, useState} from "react";
import ShowHide from './ShowHide';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-github_dark';

function CodeEditor({content, setContent, language}){

    function handleChange(newValue) {
        setContent(newValue);
        console.log(newValue);
    }

    return <div>
        <label htmlFor={language+"-editor"} className="visually-hidden">Content</label>
        <AceEditor
            mode={language}
            theme="github_dark"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                fontSize: 16,
            }}
            name={language+"-editor"}
            id={language+"-editor"}
            className="editor-input"
            placeholder={language + " code goes in here."}
            value={content}
            onChange={handleChange}
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
            <h1 className="sandbox" >SVG Lab: </h1>
            <p>A sandbox to quickly experement with SVG or HTML effects.</p>
        </div>
        <div id="links">
            Tools: 
            <ul>
                <li><a href="https://iconly.io/tools/svg-cleaner">SVG cleaner</a></li>
                <li><a href="https://svg2jsx.com/">SVG 2 JSX</a></li>
            </ul>
        </div>
        <div id="writing-section" >
            <div id="editor-section">
                <ShowHide comp={<CodeEditor content={cssContent} setContent={setCssContent} language="css" />} compVisible={false} title="Edit CSS"/>
                <ShowHide comp={<CodeEditor content={svgContent} setContent={setSvgContent} language="html" />} compVisible={true} title="Edit SVG"/>
                <ShowHide comp={<CodeEditor content={jsContent} setContent={setJsContent} language="javascript" />} compVisible={false} title="Edit JavaScript"/>
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