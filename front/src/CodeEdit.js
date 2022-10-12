import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import styled from 'styled-components';



const SaveDiv = styled.div`
  border-color: black;
  float: left;
`;

export default function CodeEdit() {
  const editorRef = useRef(null);
  const textInput = useRef();
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }


  function upload(){
    //const file = e.target.files[0];
    /*
    const reader = new FileReader();
    reader.onloadend  = function(){
        editorRef.current.setValue(reader.result);
    }
    reader.readAsText(file);*/
  }
  function clear(){
    editorRef.current.setValue("// some comment"); 
  }
  function copy(){
    navigator.clipboard.writeText(editorRef.current.getValue());
  }
  function download(){
    
  } 


  function save(){  
    //일단 보류
  }
  function execution(){
    console.log(editorRef.current.getValue());
    //상위 component에서 채점하는 것을 알아야 함
    //또한 현재 작성한 코드를 상위 component로 전송
    //상위 component는 서버로 데이터 전송
    //get전까지 loading
    //get하고 나서 채점 component에 내용 전송
  }
  function grade(){
    console.log(editorRef.current.getValue());
    //상위 component에서 채점하는 것을 알아야 함
    //또한 현재 작성한 코드를 상위 component로 전송
    //상위 component는 서버로 데이터 전송
    //get전까지 loading
    //get하고 나서 채점 component에 내용 전송
  }
  
  function submission(){
    console.log(editorRef.current.getValue());
    //상위 component에서 채점하는 것을 알아야 함
    //또한 현재 작성한 코드를 상위 component로 전송
    //상위 component는 서버로 데이터 전송
    //get전까지 loading
    //get하고 나서 채점 component에 내용 전송
  }
  return (
   <>
    <div
        style={{
            position:"relative",
            height:"9%",
            overflow:"auto"
        }}
    >
        <div
            style={{
                marginTop:"5%",
                marginLeft:"5%",
                textAlign:"center",
                height:"30%",
                width:"20%",
                borderRadius:"10px",
                float:"left"
            }}
        > 코드 입력</div>
        <div
            style={{
                position : "absolute",
                bottom :"0%",
                right:"0%",
                textAlign:"center",
                height:"40%",
                width:"10%",
                border:"3px solid black",
            }}
        >
            3
        </div>
        <div
            style={{
                position : "absolute",
                bottom :"0%",
                right:"10%",
                textAlign:"center",
                height:"40%",
                width:"10%",
                border:"3px solid black",
            }}
        >
            2
        </div>
        <div
            style={{
                position : "absolute",
                bottom :"0%",
                right:"20%",
                textAlign:"center",
                height:"40%",
                width:"10%",
                border:"3px solid black",
            }}
        >
            1
        </div>
        <div
            style={{
                position : "absolute",
                bottom :"0%",
                right:"30%",
                textAlign:"center",
                height:"40%",
                width:"10%",
                border:"3px solid black",
            }}
        >
            0
        </div>
    </div>
     <Editor
       height="80%"
       defaultLanguage="javascript"
       defaultValue="// some comment"
       onMount={handleEditorDidMount}
     />
     <div
        style={{
            position:"relative",
            height:"10.8%",
            width:"100%",
            border:"1px solid black",
        }}
    >
            <label
                for="file"
                style={{
                    position : "absolute",
                        top :"25%",
                        textAlign:"center",
                        left:"2%",
                        height:"40%",
                        width:"10%",
                        border:"3px solid black",
                }}
            >
            1
            </label>
            
            <input type="file" id="file" style = {{display:"none"}} ref={upload(this)}/>
        <div
            style={{
                position : "absolute",
                top :"25%",
                textAlign:"center",
                left:"13%",
                height:"40%",
                width:"10%",
                border:"3px solid black",
            }}
            onClick={clear}
        >
            2
        </div>
        <div
            style={{
                position : "absolute",
                top :"25%",
                textAlign:"center",
                left:"24%",
                height:"40%",
                width:"10%",
                border:"3px solid black",
            }}
            onClick={copy}
        >
            3
        </div>
        <div
            style={{
                position : "absolute",
                top :"25%",
                right:"30%",
                textAlign:"center",
                left:"35%",
                height:"40%",
                width:"10%",
                border:"3px solid black",
            }}
            onClick={download}
        >
            4
        </div>
        <div
            style={{
                marginTop:"5%",
                textAlign:"center",
                height:"40%",
                width:"15%",
                borderRadius:"10px",
                border:"3px solid black",
                float:"right"
            }}
            onClick={execution}
        > 제출</div>
        <div
            style={{
                marginTop:"5%",
                textAlign:"center",
                height:"40%",
                width:"15%",
                borderRadius:"10px",
                border:"3px solid black",
                float:"right"
            }}
            onClick={grade}
        > 채점 </div>
        <div
            style={{
                marginTop:"5%",
                textAlign:"center",
                height:"40%",
                width:"15%",
                borderRadius:"10px",
                border:"3px solid black",
                float:"right"
            }}
            onClick={execution}
        > 채점 </div>
    </div>
   </>
  );
}

