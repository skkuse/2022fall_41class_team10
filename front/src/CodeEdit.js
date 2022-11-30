import React, {useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import styled from 'styled-components';
import FolderOpen from "./icon/FolderOpen.png"
import DownloadSimple from "./icon/DownloadSimple.png"
import CopySimple from "./icon/CopySimple.png"
import Arrow from "./icon/ArrowCounterClockwise.png"
import FolppyDisk from "./icon/FloppyDisk.png"
import axios from 'axios'
const SaveDiv = styled.div`
  border-color: black;
  float: left;
`;

export default function CodeEdit(props) {
  const editorRef = useRef(null);
  const textInput = useRef(null);
  const [codeResult, setCodeResult ] = useState("");
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }

  const uploadClick = (e) =>{
    textInput.current.click();
  }
  const upload = (e) =>{
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend  = function(){
        editorRef.current.setValue(reader.result);
    }
    reader.readAsText(file);
    
  }
  function clear(){
    editorRef.current.setValue("print('Hello World!')"); 
    props.submit(0)
    props.setCodeResult(" ")
  }
  function copy(){
    navigator.clipboard.writeText(editorRef.current.getValue());
  }
  const download =
    () => {
        let fileName = '파일이름.py';
        let output = editorRef.current.getValue();
        const element = document.createElement('a');
        const file = new Blob([output], {
          type: 'text/plain',
        });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element); // FireFox
        element.click();
      }

  


  function save(){  
    //editorRef.current.getValue()
  }
  function execution(api){
    /*
    props.api(editorRef.current.getValue())
    props.submit(0)
    */
    axios.post(
        "http://127.0.0.1:8000/code_run/",
        {code: editorRef.current.getValue()}
      )
      .then(response=>
        setCodeResult(JSON.parse(response['data'])['result'])
      )
  }
  function grade(api){
    /*
    props.api(editorRef.current.getValue())
    props.submit(2)
    */
    axios.post(
        "http://127.0.0.1:8000/code_submit/",
        {code: editorRef.current.getValue()}
      )
      .then(response=>
            console.log(JSON.parse(response['data']))
      )
    //상위 component에서 채점하는 것을 알아야 함
    //또한 현재 작성한 코드를 상위 component로 전송
    //상위 component는 서버로 데이터 전송
    //get전까지 loading
    //get하고 나서 채점 component에 내용 전송
  }
  
  function submission(){
    execution()
    props.api(editorRef.current.getValue())
    props.submit(1)
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
            height:"6%",
            overflow:"auto"
        }}
    >
    {(props.visible===0)
        ?
        <>
        <div
            style={{
                position : "absolute",
                top:"15%",
                right:"69%",
                textAlign:"center",
                height:"65%",
                width:"5%",
                backgroundColor:"#2E4E3F",
                color:"white",
                fontSize:"150%",
                borderRadius:"100%"
            }}
        >
            3
        </div>

        <div
            style={{
                position : "absolute",
                top:"15%",
                right:"75%",
                textAlign:"center",
                height:"65%",
                width:"5%",
                backgroundColor:"#2E4E3F",
                color:"white",
                fontSize:"150%",
                borderRadius:"100%"
            }}
        >
            2
        </div>
        <div
            style={{
                position : "absolute",
                top:"15%",
                right:"81%",
                textAlign:"center",
                height:"65%",
                width:"5%",
                backgroundColor:"#2E4E3F",
                color:"white",
                fontSize:"150%",
                borderRadius:"100%"
            }}
        >
            1
        </div>
        <img
            src = {FolppyDisk}
            style={{
                position : "absolute",
                top:"15%",
                left:"5%",
                height:"70%",
                width:"5%",
                border:"0px solid black",
            }}
        />
        </>
        :
        <div
            style={{
                position:"absolute",
                width:"5%",
                height:"10%",

            }}
        />
    }
    </div>
     <Editor
       backgroundColor="#F0F0F0"
       height="60%"
       defaultLanguage="python"
       defaultValue="print('Hello World!')"
       onMount={handleEditorDidMount}
     />
    {
        props.visible===0
    ?
    <div
        style={{
            position:"relative",
            height:"25%",
            width:"6%",
            left:"102%",
            backgroundColor:"#F0F0F0",
            top:"-70%",
            borderRadius:"10px"
        }}
    >
        <label

        for="file"
        >
        <img 
            style={{
                position : "absolute",
                    top :"5%",
                    textAlign:"center",
                    left:"10%",
                    fontSize:"90%",
                    lineHeight:"220%"}}
            src ={FolderOpen}/>
        </label>
        <input type="file" id="file" style = {{display:"none"}} onChange={upload} ref={textInput}/>

        <img
            src = {Arrow}
            style={{
            position : "absolute",
            top :"28%",
            left:"11%",
            textAlign:"center",
            
            fontSize:"90%",
            lineHeight:"220%"
            }}
        onClick={clear}
        />

        <img
            src = {CopySimple}
            style={{
            position : "absolute",
            top :"53%",
            left:"9%",
            textAlign:"center",
            fontSize:"90%",
            lineHeight:"220%"
        }}
        onClick={copy}
        />
        <img
            src = {DownloadSimple}
            style={{
            position : "absolute",
            top :"75%",
            left: "10%",
            textAlign:"center",
            fontSize:"60%",
            lineHeight:"290%"
        }}
        onClick={download}
        />
    </div>
    :
    <div
        style={{
            position:"relative",
            height:"25%",
            width:"10%",
            left:"100%",

            top:"-70%",

        }}
    />
    }
    <div
        style={{
            position:"relative",
            top:"-23%",
            height:"25%",
            width:"100%",
            backgroundColor:"white"
        }}
    >
        <div
            style={{
                position:"relative",
                top:"8%",
                left:"5%",
                height:"84%",
                width:"90%",
                
            }}
        >
            {codeResult}
        </div>
    </div>

    {

    props.visible===0
    ?
     <div
        style={{
            position:"relative",
            height:"10.8%",
            width:"100%",
            top:"-25%"
        }}
    >
        <div
            style={{
                marginTop:"5%",
                textAlign:"center",
                height:"30%",
                width:"9%",
                borderRadius:"20px",
                border:"0.5px solid grey",
                backgroundColor:"#50A657",
                float:"right",
                lineHeight: "200%",
                fontWeight:"bolder"
            }}
            onClick={submission}
        > Submit </div>
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
                height:"30%",
                width:"9%",
                borderRadius:"20px",
                border:"0.5px solid grey",
                backgroundColor:"white",
                float:"right",
                lineHeight: "200%",
                fontWeight:"bolder"
            }}
            onClick={grade}
        > Score </div>
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
                height:"30%",
                width:"9%",
                borderRadius:"20px",
                border:"0.5px solid grey",
                backgroundColor:"white",
                float:"right",
                lineHeight: "200%",
                fontWeight:"bolder"
            }}
            onClick={execution}
        > Run </div>
    </div>
    :
    <></>
    }
   </>
  );
}