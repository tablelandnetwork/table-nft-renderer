import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-sql";
var hightlightWithLineNumbers = function (input, language, hideLineNumbers) {
    return highlight(input, language)
        .split("\n")
        .map(function (line, i) { return "".concat(hideLineNumbers ? "" : "<span class='editorLineNumber'>".concat(i + 1, "</span>")).concat(line); })
        .join("\n");
};
function CodeHighlighter(props) {
    return (React.createElement("div", { className: "code-editor-wrapper" },
        React.createElement(Editor, { preClassName: "language-sql", value: props.code, onValueChange: props.onChange, highlight: function (code) { return hightlightWithLineNumbers(code, languages.sql, props.hideLineNumbers); }, padding: 10, textareaId: props.hideLineNumbers ? "codeViewer" : "codeEditor", className: "editor language-sql", style: {
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 18,
                outline: 0
            } })));
}
export default CodeHighlighter;
