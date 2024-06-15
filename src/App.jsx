import './styles/App.css';
import Editor from "./Editor";
import {useState} from 'react';

function App() {
    const [error, setError] = useState(null);

    async function handleSubmit(evt){
        evt.preventDefault();

        const formData = {
            css   : css,
            svg : svg,
            javascript: javascript,
        }
        const newArticle = await KBApi.submitArticle(formData);
        if (newArticle.error) {
            alert(`Uh-oh: Something went wrong.\nPlease provide details to the webmaster\n"${newArticle.error}"`);
        } else {
            navigate(`/posts/${newArticle}`);
        }
    }

    return  <div id="edit-container">
      <form className="article-form" >
          {error? <div className = "warning-section">{error}</div> : ""}
          <Editor />
          <div className="formsection">
          </div>
      </form>
    </div>
}




export default App;
