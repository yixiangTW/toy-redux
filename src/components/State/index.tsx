import { connect } from "../../Redux";
import Prism from "prismjs";
import 'prismjs/themes/prism.css';
import "./style.css";

const State = connect()(({ state }: { state: any }) => {
  console.log("State render");

  const code = `${JSON.stringify(state, null, 5)}`;

  let codeHtml = {
    __html: Prism.highlight(code, Prism.languages.javascript, "javascript"),
  };

  return (
    <div className="state">
      <pre className="language-javascript line-numbers">
        <code dangerouslySetInnerHTML={codeHtml}></code>
      </pre>
    </div>
  );
});

export default State;
