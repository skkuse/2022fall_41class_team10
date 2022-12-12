import React, {useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import styled from 'styled-components';
import './style/class.css'
import {ReactComponent as FolderOpen} from "./icon/folderopen_black.svg"
import DownloadSimple from "./icon/DownloadSimple.png"
import CopySimple from "./icon/CopySimple.png"
import Arrow from "./icon/ArrowCounterClockwise.png"
import Timer from "./Timer"
import {ReactComponent as FloppyDisk_W} from "./icon/floppydisk_white.svg"
import {ReactComponent as FloppyDisk_B} from "./icon/floppydisk_black.svg"
import {ReactComponent as ThreeDots_W} from "./icon/threedots_white.svg"
import {ReactComponent as ThreeDots_B} from "./icon/threedots_black.svg"
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {ReactComponent as Home_B} from "./icon/house_black.svg";
import {ReactComponent as Home_W} from "./icon/house_white.svg";


const SaveDiv = styled.div`
    border-color: black;
    float: left;
`;

const skeleton = ("def plus(a, b):\n" +
    "    #Write Your Code!\n" +
    "\n" +
    "a, b = map(int, input().split())\n" +
    "result = plus(a, b)\n" +
    "print(result)");

var val = [skeleton,
    skeleton,
    skeleton]

export default function CodeEdit(props) {
    const state = {
        val : 0
    }
    const editorRef = useRef(null);
    const textInput = useRef(null);
    const [codeResult, setCodeResult ] = useState("");
    const [color, setColor] = useState(0);

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
        editorRef.current.setValue(props.skeleton_code);
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
        if(val[0]===("def plus(a, b):\n" +
            "    #Write Your Code!\n" +
            "\n" +
            "a, b = map(int, input().split())\n" +
            "result = plus(a, b)\n" +
            "print(result)")){
            val[0] = editorRef.current.getValue()
            this.setState({
                val : 1
            })
        }
        else if(val[1]===("def plus(a, b):\n" +
            "    #Write Your Code!\n" +
            "\n" +
            "a, b = map(int, input().split())\n" +
            "result = plus(a, b)\n" +
            "print(result)")){
            val[1] = editorRef.current.getValue()
            this.setState({
                val : 2
            })
        }
        else if(val[2]===("def plus(a, b):\n" +
            "    #Write Your Code!\n" +
            "\n" +
            "a, b = map(int, input().split())\n" +
            "result = plus(a, b)\n" +
            "print(result)")){
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
        props.setLoading()
        axios.post(
            "http://127.0.0.1:8000/code_run/",
            {code: editorRef.current.getValue()})
            .then(response=>{
                var res = JSON.parse(response['data'])
                console.log(res)
                if(!res['stdout']){
                    setCodeResult(res['stderr'])
                }else{
                    setCodeResult(res['stdout'])
                }
                //if()
                //console.log(JSON.parse(response['data']))
                //setCodeResult(JSON.parse(response['data'])['result'])
            })
        props.offLoading()
    }
    function grade(api){
        /*
        props.api(editorRef.current.getValue())
        props.submit(2)
        */
        props.grade_api(editorRef.current.getValue())
        //상위 component에서 채점하는 것을 알아야 함
        //또한 현재 작성한 코드를 상위 component로 전송
        //상위 component는 서버로 데이터 전송
        //get전까지 loading
        //get하고 나서 채점 component에 내용 전송
    }

    function submission(){
        execution()
        props.api(editorRef.current.getValue())
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
                                    borderRight:"solid 2px",
                                    borderLeftColor: (props.theme === 1) ? "#F2F2F2F2" : "#566270"
                                }}
                                onClick={save}>
                                {props.theme === 1 ?  <FloppyDisk_W/>  :<FloppyDisk_B/>}
                            </button>
                            <button
                                className={(color===1?"active":"numberButton")}
                                style={{
                                    height: "36px",
                                    width: "36px",
                                    left: "5%"
                                }}
                                onClick={()=>{setColor(1); load(0);}}>
                                1
                            </button>
                            <button
                                className={(color===2?"active":"numberButton")}
                                style={{
                                    height: "36px",
                                    width: "36px",
                                    left: "7%"
                                }}
                                onClick={()=>{setColor(2); load(1);}}>
                                2
                            </button>
                            <button
                                className={(color===3?"active":"numberButton")}
                                style={{
                                    height: "36px",
                                    width: "36px",
                                    left: "9%"
                                }}
                                onClick={()=>{setColor(3); load(2);}}>
                                3
                            </button>

                            <div
                                className={'ms-md-auto'}
                                style={{
                                    display:"flex",
                                    alignItems:"center",
                                    left:"53%"
                                }}>
                                <Timer/>
                                <button
                                    className={'me-2'}
                                    style={{
                                        position:"relative",
                                        left: "5%",
                                        height:"100%",
                                        background:"transparent",
                                        border:"0",
                                        borderLeft:"solid 2px",
                                        borderLeftColor: (props.theme === 1) ? "#F2F2F2F2" : "#566270"}}>
                                    {props.theme === 1 ?  <ThreeDots_W/>  :<ThreeDots_B/>}
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
                // backgroundColor="#F0F0F0"
                height="60%"
                defaultLanguage="python"
                defaultValue={props.skeleton_code}
                theme={(props.theme === 1) ? "vs-dark" : "light"}
                onMount={handleEditorDidMount}/>
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
                        <div
                            style={{
                                position : "absolute",
                                top :"5%",
                                left:"10%",
                                width: "100%",
                                border: '0'
                            }}
                            >
                            <FolderOpen />
                        </div>
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
                    onClick={copy}/>
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
                    onClick={download}/>
                </div>
                <div
                    id={"exeButtonSection"}
                    style={{
                        position:"relative",
                        height:"5%",
                        width:"100%",
                        top:"-23%"}}>
                    <button
                        id={"submitButton"}
                        style={{
                            textAlign:"center",
                            width:"9%",
                            borderRadius:"20px",
                            border:"0.5px solid grey",
                            float:"right",
                            lineHeight: "200%",
                            fontWeight:"bolder",}}
                        onClick={submission}> Submit
                    </button>

                    <div className={"spacer3percent"}/>
                    <button
                        id={"gradeButton"}
                        style={{
                            textAlign:"center",
                            width:"9%",
                            borderRadius:"20px",
                            border:"0.5px solid grey",
                            float:"right",
                            lineHeight: "200%",
                            fontWeight:"bolder",}}
                        onClick={grade}> Score
                    </button>
                    <div className={"spacer3percent"}/>
                    <button
                        id={"executeButton"}
                        style={{
                            textAlign:"center",
                            width:"9%",
                            borderRadius:"20px",
                            border:"0.5px solid grey",
                            float:"right",
                            lineHeight: "200%",
                            fontWeight:"bolder",}}
                        onClick={execution}> Run
                    </button>
                </div>

            <div
                className={"text_body"}
                style={{
                    position:"relative",
                    top:"-23%",
                    height:"26%",
                    width:"100%",
                }}>
                <div
                    style={{
                        position:"relative",
                        top:"8%",
                        left:"5%",
                        height:"84%",
                        width:"90%",
                        whiteSpace: "pre-wrap"}}>
                    {codeResult}
                </div>
            </div>
        </>
    );
}