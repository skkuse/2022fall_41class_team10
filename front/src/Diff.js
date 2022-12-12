import React, { useEffect, useState } from "react";
import * as Diff2Html from "diff2html";
import "diff2html/bundles/css/diff2html.min.css";
export default function App(props) {
  const [diff, setDiff] = useState("");

  useEffect(() => {
    var diffHtml = Diff2Html.html(
       props.code_diff,
      {
        inputFormat: "json",
        drawFileList: true,
        fileListToggle: false,
        fileListStartVisible: false,
        fileContentToggle: false,
        matching: "lines",
        outputFormat: "side-by-side",
        synchronisedScroll: false,
        highlight: true,
        renderNothingWhenEmpty: false
      }
    );

    setDiff(diffHtml);
  }, []);
  return <div id="code-diff" dangerouslySetInnerHTML={{ __html: diff }}></div>;
}