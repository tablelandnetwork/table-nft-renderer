import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-sql";

const highlightWithLineNumbers = (input, language, hideLineNumbers) =>
  highlight(input, language)
    .split("\n")
    .map(
      (line, i) =>
        `${
          hideLineNumbers
            ? ""
            : `<span class='editorLineNumber'>${i + 1}</span>`
        }${line}`
    )
    .join("\n");

function CodeHighlighter(props) {
  return (
    <div className="code-editor-wrapper">
      <Editor
        preClassName="language-sql"
        value={props.code}
        onValueChange={props.onChange}
        highlight={(code) =>
          highlightWithLineNumbers(code, languages.sql, props.hideLineNumbers)
        }
        padding={10}
        textareaId={props.hideLineNumbers ? "codeViewer" : "codeEditor"}
        className="editor language-sql"
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 18,
          outline: 0,
        }}
      />
    </div>
  );
}

export default CodeHighlighter;
