import React, { useRef, useEffect } from 'react';

/**
 * Renders css, svg/html, and javascript code
 * @param {string} css : css markup, excluding <style> tag 
 * @param {string} svg : svg or html markup. For HTMl provide elements only no boilerplate tags <html><body><title> etc,  
 * @param {string} js : JavaScript, without the <script> tag
 * @param {string} height : the height of the rendered output (default 100%)
 * @param {string} width : the width of the rendered output (default 100%)
 * @param {bool} centered : Whether to center everything in the page or not
 * @returns an iframe that renders the input
 */
const SandboxIframe = ({ css, svg, js, height="100vh", width="100%", centered=false}) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const content = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>THIS IS NOT A REAL WEBSITE - This is a mock page created by an online sandbox for web developers</title>
        <style>${centered? `body{display:flex;align-items:center;justify-content:center;height:${height};}` + css : css}</style>
      </head>
      <body>
        ${svg}
        <script>${js}</script>
      </body>
      </html>
    `;

    // If srcdoc is supported, this is a cleaner approach
    if ("srcdoc" in document.createElement("iframe")) {
      iframeRef.current.srcdoc = content;
    } else {
      // For browsers where srcdoc isn't supported, use the document directly
      const iframeDoc = iframeRef.current.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(content);
      iframeDoc.close();
    }
  }, [svg, css, js, centered]);  // Depend on props so it re-renders when they change

  return <iframe ref={iframeRef} sandbox="allow-scripts allow-popups" style={{width: width, height: height, border: "none"}}></iframe>;
};

export default SandboxIframe;