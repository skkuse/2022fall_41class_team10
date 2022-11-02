import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import styled from 'styled-components';



const SaveDiv = styled.div`
  border-color: black;
  float: left;
`;

export default function CodeEdit(props) {
  const editorRef = useRef(null);
  const textInput = useRef();
  const submit = props.api
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }


  function upload(){
    /*
    const file = e.target.files[0];
    
    const reader = new FileReader();
    reader.onloadend  = function(){
        editorRef.current.setValue(reader.result);
    }
    reader.readAsText(file);
    */
  }
  function clear(){
    editorRef.current.setValue("print('Hello Wolrd!')"); 
    props.unsubmit()
  }
  function copy(){
    navigator.clipboard.writeText(editorRef.current.getValue());
  }
  function download(){
    
  } 


  function save(){  
    //일단 보류
  }
  function execution(api){
    props.api(editorRef.current.getValue())
    //상위 component에서 채점하는 것을 알아야 함
    //또한 현재 작성한 코드를 상위 component로 전송
    //상위 component는 서버로 데이터 전송
    //get전까지 loading
    //get하고 나서 채점 component에 내용 전송
  }
  function grade(api){
    props.api(editorRef.current.getValue())

    //상위 component에서 채점하는 것을 알아야 함
    //또한 현재 작성한 코드를 상위 component로 전송
    //상위 component는 서버로 데이터 전송
    //get전까지 loading
    //get하고 나서 채점 component에 내용 전송
  }
  
  function submission(){
    props.api(editorRef.current.getValue())
    props.submit()
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
                lineHeight: "300%",
                float:"left"
            }}
        > 코드 입력</div>
        <div
            style={{
                position : "absolute",
                bottom :"10%",
                right:"2%",
                textAlign:"center",
                height:"40%",
                width:"8%",
                border:"3px solid black",
            }}
        >
            3
        </div>

        <div
            style={{
                position : "absolute",
                bottom :"10%",
                right:"13%",
                textAlign:"center",
                height:"40%",
                width:"8%",
                border:"3px solid black",
            }}
        >
            2
        </div>
        <div
            style={{
                position : "absolute",
                bottom :"10%",
                right:"24%",
                textAlign:"center",
                height:"40%",
                width:"8%",
                border:"3px solid black",
            }}
        >
            1
        </div>
    </div>
     <Editor
       height="80%"
       defaultLanguage="python"
       defaultValue="print('Hello Wolrd!')"
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
                width:"13%",
                borderRadius:"10px",
                border:"3px solid black",
                float:"right",
                lineHeight: "200%",
            }}
            onClick={submission}
        > 제출 </div>
        <div
            style={{
                marginTop:"5%",
                width:"3%",
                float:"right"
            }}
        />
        <div
            style={{
                marginTop:"5%",
                textAlign:"center",
                height:"40%",
                width:"13%",
                borderRadius:"10px",
                border:"3px solid black",
                float:"right",
                lineHeight: "200%",
            }}
            onClick={grade}
        > 채점 </div>
        <div
            style={{
                marginTop:"5%",
                width:"1%",
                float:"right"
            }}
        />
        <div
            style={{
                marginTop:"5%",
                textAlign:"center",
                height:"40%",
                width:"13%",
                borderRadius:"10px",
                border:"3px solid black",
                float:"right",
                lineHeight: "200%",
            }}
            onClick={execution}
        > 실행 </div>
    </div>
   </>
  );
}