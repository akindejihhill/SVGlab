import {useEffect, useState} from "react";
import ShowHide from './ShowHide';
import SandboxIframe from "./SandboxIframe";

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
            placeholder={language === "html"? "SVG or HTML code goes in here" : language + " code goes in here."}
            value={content}
            onChange={handleChange}
        />
    </div>
}

function Editor(){

    const [cssContent, setCssContent] = useState("");
    const [svgContent, setSvgContent] = useState("");
    const [jsContent, setJsContent] = useState("");
    const [centered, setCentered] = useState(true);

    function switchOrientation(){
        setCentered(!centered);
    }

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
            Links: 
            <ul>
                <li><a href="http://cerebro.homelinux.net/kb/posts/52">Article: SVG in React</a></li>
                <li><a href="https://www.flaticon.com/">FlatIcon</a></li>
                <li><a href="https://heroicons.com/">heroicons</a></li>
            </ul>
        </div>
        <div id="writing-section" >
            <div id="editor-section">
                <ShowHide comp={<CodeEditor content={cssContent} setContent={setCssContent} language="css" />} compVisible={false} title="Edit CSS"/>
                <ShowHide comp={<CodeEditor content={svgContent} setContent={setSvgContent} language="html" />} compVisible={true} title="Edit SVG"/>
                <ShowHide comp={<CodeEditor content={jsContent} setContent={setJsContent} language="javascript" />} compVisible={false} title="Edit JavaScript"/>
            </div>

            <div className="outputsection" id="preview-container">
                <div id="preview-header">
                    <span>Preview</span>
                    <span id="orentation-switch"><input type="checkbox" id="orientation" checked={centered} onChange={switchOrientation}/><label htmlFor="orientation">centered</label></span>
                </div>
                <div id="preview">
                    <SandboxIframe css={cssContent} svg={svgContent} js={jsContent} height="90vh" centered={centered}/>
                </div>
            </div>
        </div>
    </div>
        
}

export default Editor;