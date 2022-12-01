import React, {useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import styled from 'styled-components';
import './style/class.css'
import {ReactComponent as FolderOpen} from "./icon/folderopen.svg"
import DownloadSimple from "./icon/DownloadSimple.png"
import CopySimple from "./icon/CopySimple.png"
import Arrow from "./icon/ArrowCounterClockwise.png"
import {ReactComponent as FloppyDisk} from "./icon/floppydisk.svg"
import {ReactComponent as ThreeDots} from "./icon/threedots.svg"
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
const SaveDiv = styled.div`
    border-color: black;
    float: left;
`;
var val = ["print('Hello World!')",
"print('Hello World!')",
"print('Hello World!')"]
export default function CodeEdit(props) {
    const state = {
        val : 0
    }
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
    function load(num){
        editorRef.current.setValue(val[num]);
        props.setCodeResult(" ")
    }
    function clear(){
        editorRef.current.setValue("print('Hello World!')");
        props.submit(0)
        props.setCodeResult(" ")
    }
    function copy(){
        navigator.clipboard.writeText(editorRef.current.getValue());
    }
    const download = () => {
        let fileName = 'week1_assign.py';
        let output = editorRef.current.getValue();
        const element = document.createElement('a');
        const file = new Blob([output], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element); // FireFox
        element.click();
    }

    function save(){
        // editorRef.current.getValue()
        if(val[0]==="print('Hello World!')"){
            val[0] = editorRef.current.getValue()
            this.setState({
                val : 1
            })
        }
        else if(val[1]==="print('Hello World!')"){
            val[1] = editorRef.current.getValue()
            this.setState({
                val : 2 
            })
        }
        else if(val[2]==="print('Hello World!')"){
            val[2] = editorRef.current.getValue()
            this.setState({
                val : 3
            })
        }
        //{editorRef.current.getValue()}
    }
    function execution(api){
        /*
        props.api(editorRef.current.getValue())
        props.submit(0)
        */
        axios.post(
            "http://127.0.0.1:8000/code_run/",
            {code: editorRef.current.getValue()})
            .then(response=>
                setCodeResult(JSON.parse(response['data'])['result']))
    }
    function grade(api){
        /*
        props.api(editorRef.current.getValue())
        props.submit(2)
        */
        axios.post(
            "http://127.0.0.1:8000/code_submit/",
            {code: editorRef.current.getValue()})
            .then(response=>
                console.log(JSON.parse(response['data'])))
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
                    height:"6%"}}>
                {(props.visible===0) ?
                    <>
                        <div
                            style={{
                                display:"flex",
                                alignItems:"center",
                                height:"100%",
                                width:"100%"}}>
                            <button
                                style={{
                                    position:"relative",
                                    left:"1%",
                                    background:"transparent",
                                    border:"0",
                                    borderRight:"",
                                    borderRightColor:"#566270"
                                }}
                                onClick={save}
                                >
                                <FloppyDisk/>
                            </button>
                            <button
                                className={"numberButton"}
                                style={{
                                    width: "4%",
                                    height: "65%",
                                    left: "5%"
                                }}
                                onClick={()=>load(0)}    
                            >
                                1
                            </button>
                            <button
                                className={"numberButton"}
                                style={{
                                    width: "4%",
                                    height: "65%",
                                    left: "7%"
                                }}
                                onClick={()=>load(1)}    
                            >
                                2
                            </button>
                            <button
                                className={"numberButton"}
                                style={{
                                    width: "4%",
                                    height: "65%",
                                    left: "9%"
                                }}
                                onClick={()=>load(2)}
                            >
                                3
                            </button>

                            <div
                                style={{
                                    position:"relative",
                                    display:"flex",
                                    alignItems:"center",
                                    left:"66%"
                                }}>
                                <div
                                    style={{
                                        textAlign:"center",
                                        lineHeight:"40px",
                                        backgroundColor:"white",
                                        position:"relative",
                                        fontSize:"20px",
                                        height:"40px",
                                        width:"160px",
                                        borderRadius:"15px"
                                    }}>
                                    02:13:30:00
                                </div>
                                <button
                                    style={{
                                        position:"relative",
                                        left: "5%",
                                        height:"100%",
                                        background:"transparent",
                                        border:"0",
                                        borderLeft:"",
                                        borderLeftColor:"#566270"}}>
                                    <ThreeDots/>
                                </button>
                            </div>
                        </div>
                    </>
                :
                    <div
                        style={{
                            position:"absolute",
                            width:"5%",
                            height:"10%"
                        }}>
                    </div>
                }
            </div>

            <Editor
                backgroundColor="#F0F0F0"
                height="60%"
                defaultLanguage="python"
                defaultValue="print('Hello World!')"
                onMount={handleEditorDidMount}/>
            {props.visible===0 ?
                <div
                    style={{
                        position:"relative",
                        height:"25%",
                        width:"6%",
                        left:"102%",
                        backgroundColor:"#F0F0F0",
                        top:"-70%",
                        borderRadius:"10px"}}>
                    <label for="file">
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
                        top:"-70%"}}/>
            }

            {props.visible===0 ?
                <div
                    id={"exeButtonSection"}
                    style={{
                        position:"relative",
                        height:"5%",
                        width:"100%",
                        top:"-23%"}}>
                    <div
                        id={"submitButton"}
                        style={{

                            textAlign:"center",
                            height:"80%",
                            width:"10%",
                            borderRadius:"20px",
                            border:"0.5px solid grey",
                            backgroundColor:"#50A657",
                            float:"right",
                            lineHeight: "200%",
                            fontWeight:"bolder",
                            fontSize:"20px"}}
                        onClick={submission}> Submit
                    </div>

                    <div className={"spacer3percent"}/>
                    <div
                        id={"gradeButton"}
                        style={{
                            textAlign:"center",
                            height:"80%",
                            width:"9%",
                            borderRadius:"20px",
                            border:"0.5px solid grey",
                            backgroundColor:"white",
                            float:"right",
                            lineHeight: "200%",
                            fontWeight:"bolder",
                            fontSize:"20px"}}
                        onClick={grade}> Score
                    </div>
                    <div className={"spacer3percent"}/>
                    <div
                        id={"executeButton"}
                        style={{
                            
                            textAlign:"center",
                            height:"80%",
                            width:"9%",
                            borderRadius:"20px",
                            border:"0.5px solid grey",
                            backgroundColor:"white",
                            float:"right",
                            lineHeight: "200%",
                            fontWeight:"bolder",
                            fontSize:"20px"}}
                        onClick={execution}> Run
                    </div>
                </div>
                :
                <></>
            }

            <div
                style={{
                    position:"relative",
                    top:"-23%",
                    height:"26%",
                    width:"100%",
                    backgroundColor:"white"}}>
                <div
                    style={{
                        position:"relative",
                        top:"8%",
                        left:"5%",
                        height:"84%",
                        width:"90%"}}>
                    {codeResult}
                </div>
            </div>
        </>
    );
}