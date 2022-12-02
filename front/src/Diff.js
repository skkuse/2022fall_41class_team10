import React, { useEffect, useState } from "react";
import * as Diff2Html from "diff2html";
import "diff2html/bundles/css/diff2html.min.css";
export default function App() {
  const [diff, setDiff] = useState("");

  useEffect(() => {
    var diffHtml = Diff2Html.html(
      'Index: assign\n===================================================================\n--- assign\n+++ assign\n@@ -5,8 +5,8 @@\n\ def plus(a, b):,\
        \n-     return a + b\
        \n+     return int(a) + int(b)\
        \n a, b=map(int, input().split())\n result = plus(a,b)\n print(result)\
        \\ No newline at end of file\n',
      {
        inputFormat: "json",
        drawFileList: true,
        fileListToggle: false,
        fileListStartVisible: false,
        fileContentToggle: false,
        matching: "lines",
        outputFormat: "line-by-line",
        synchronisedScroll: false,
        highlight: true,
        renderNothingWhenEmpty: false
      }
    );

    setDiff(diffHtml);
  }, []);

  console.log(diff);

  return <div id="code-diff" dangerouslySetInnerHTML={{ __html: diff }}></div>;
}