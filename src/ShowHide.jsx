import PropTypes from "prop-types";
import './styles/ShowHide.css';
import {useState} from 'react';


/**
 * Wraps a component (comp) in a UI object that can be expanded or collapsed 
 * @param {object} comp : the component to wrap 
 * @param {bool} compVisible : Whether the component starts out visible or not. 
 * @param {string} title : The title to put in the title bar of the collapsable section. 
 * @returns 
 */
function ShowHide({comp, compVisible, title}){

    const [visible, setVisible] = useState(compVisible);

    function handleClick(e){
        e.preventDefault()
        setVisible((current) => !current); 
    }

    return <div className="show-hide editor">
        <div className="show-hide-header" onClick={handleClick}><button type="button" className="show-hide-toggle" >{visible? "-" : "+"}</button><span className="title">{title}</span></div>
        <div className={visible ? "show-component" : "hide-component"}>
            {comp}
        </div>

    </div>

}

ShowHide.propTypes = {
    comp : PropTypes.object,
    compVisible : PropTypes.bool,
    title : PropTypes.string
}

export default ShowHide;