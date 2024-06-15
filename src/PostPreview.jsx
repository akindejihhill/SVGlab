import PropTypes from "prop-types";
import MdRenderer from './MdRenderer'
import '../styles/PostPreview.css';

const PostPreview = ({post}) => { 
    const catChars = 35; //How many charaters of the category to display
    const previewChars = 300; //How many characters of the content preview to display
    
    //limit the size of the preview
    const content=post.content;
    let previewContent;
    if (content.length > previewChars){
        previewContent=content.slice(0,previewChars - 3) + "...";
    }
    else previewContent = content;

    //limit how much of the category name is displayed
    const cat=post.category;
    let catPreview;
    if (cat.length > catChars - 3) {
        catPreview= "..." + cat.slice(-catChars);
    }
    else catPreview = cat;

    const postID = post.id;
    return (
        <div className="postPreview" key={postID}>
            <p className="previewCat">{catPreview}</p>
            <p className="previewTitle">{post.title}</p>
            <div className="previewContent"><MdRenderer content={previewContent} /></div>
            <span className="bottomLine"><span className="previewAuthor">By {post.first_name} {post.last_name}</span><span className="previewDate">{post.dateTime}</span></span>
        </div>
    );

}

PostPreview.propTypes = {
    post : PropTypes.object
}

export default PostPreview;