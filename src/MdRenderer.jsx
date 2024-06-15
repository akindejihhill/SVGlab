
import PropTypes from "prop-types";
import { Remarkable } from 'remarkable';
import DOMPurify from 'dompurify';
import { useState, useEffect } from 'react';

/**
 * Converts Markdown to sanitized HTML
 * @param {*} params.content , the markdown content to be converted
 * @returns  A <div> containing the converted HTML to be displayed
 */
function MdRenderer({content}){
    const md = new Remarkable;
    const [markup, setMarkup] = useState();

    useEffect(()=>{
        const uncleanHTML = md.render(content);
        const cleanHTML = DOMPurify.sanitize(uncleanHTML);
        setMarkup(cleanHTML);
    }, [content]);


    return <div className="markdown-view" dangerouslySetInnerHTML={{__html: markup}} />;
}

MdRenderer.propTypes = {
    content : PropTypes.string
}

export default MdRenderer;