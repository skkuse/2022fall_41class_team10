import React, {useState, useRef, Component } from "react";
import Editor from "@monaco-editor/react";
import styled from 'styled-components';
import './style/class.css'
import {ReactComponent as FolderOpen_B} from "./icon/folderopen_black.svg"
import {ReactComponent as FolderOpen_W} from "./icon/folderopen_white.svg"
import {ReactComponent as ArrowCCL_B} from "./icon/arrowcounterclockwise_black.svg"
import {ReactComponent as ArrowCCL_W} from "./icon/arrowcounterclockwise_white.svg"
import {ReactComponent as Copy_B} from "./icon/copy_black.svg"
import {ReactComponent as Copy_W} from "./icon/copy_white.svg"
import {ReactComponent as Download_B} from "./icon/download_black.svg"
import {ReactComponent as Download_W} from "./icon/download_white.svg"
import Timer from "./Timer"
import {ReactComponent as FloppyDisk_W} from "./icon/floppydisk_white.svg"
import {ReactComponent as FloppyDisk_B} from "./icon/floppydisk_black.svg"
import {ReactComponent as ThreeDots_W} from "./icon/threedots_white.svg"
import {ReactComponent as ThreeDots_B} from "./icon/threedots_black.svg"
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';


const SaveDiv = styled.div`
    border-color: black;
    float: left;
`;

let valid = ["", "", ""]

export default function CodeEdit(props) {
    const state = {
        val : 0,
    }
    const [popup, setPopup] = useState({open: false});
    const editorRef = useRef(null);
    const textInput = useRef(null);
    const [codeResult, setCodeResult ] = useState("");
    const [color, setColor] = useState(1);

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
        if(valid[num] === ""){
            valid[num] = props.skeleton_code;
        }
        editorRef.current.setValue(valid[num]);
        // console.log(valid)
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
        if(color === 1){
            valid[0] = editorRef.current.getValue();
            // temp[0] = editorRef.current.getValue();
            // state.valid = temp;
        }
        else if(color === 2){
            valid[1] = editorRef.current.getValue();
            // temp[1] = editorRef.current.getValue();
            // state.valid = temp;
        }
        else if(color === 3){
            valid[2] = editorRef.current.getValue();
            // temp[2] = editorRef.current.getValue();
            // state.valid = temp;
        }
        // valid[1]=valid[0]
        // valid[2]=valid[1]
        // valid[0]=editorRef.current.getValue()
        // console.log(valid)
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

    function showToggle(){
        if(popup.open){
            setPopup({open: false})
        }
        else {
            setPopup({open: true});
        }
        console.log(popup.open)
    }


    return (
        <>
            <div
                style={{
                    position:"relative",
                    height:"6%"}}>
                <div
                    style={{
                        display:"flex",
                        alignItems:"center",
                        height:"100%",
                        width:"100%"}}>
                    <button
                        style={{
                            background:"transparent",
                            border:"0",
                            borderRight:"solid 2px",
                            borderLeftColor: (props.theme === 1) ? "#F2F2F2F2" : "#566270"
                        }}
                        onClick={save}>
                        {props.theme === 1 ?  <FloppyDisk_W/>  :<FloppyDisk_B/>}
                    </button>
                    <button
                        className={(color===1?"activeNumBtn ":"") + "numberButton"}
                        style={{
                            height: "36px",
                            width: "36px",
                            left: "5%"
                        }}
                        onClick={()=>{setColor(1); load(0);}}>
                        1
                    </button>
                    <button
                        className={"numberButton " + (color===2?"activeNumBtn":"")}
                        style={{
                            height: "36px",
                            width: "36px",
                            left: "7%"}}
                        onClick={()=>{setColor(2); load(1);}}>
                        2
                    </button>
                    <button
                        className={"numberButton " + (color===3?"activeNumBtn":"")}
                        style={{
                            height: "36px",
                            width: "36px",
                            left: "9%"}}
                        onClick={()=>{setColor(3); load(2);}}>
                        3
                    </button>

                    <div
                        className={'ms-md-auto'}
                        style={{
                            display:"flex",
                            alignItems:"center",
                        }}>
                        <Timer/>
                        {popup.open === true?
                            <>
                                <div
                                    id={'fileBtns'}
                                    style={{
                                        height:"40px",
                                        width:"fit-content",
                                        borderRadius: "10px",
                                    }}>
                                    <div className={'d-flex align-content-center'}>
                                        <label htmlFor="file">
                                            <div
                                                className={'m-2 mt-0'}
                                                style={{
                                                    width: "36px",
                                                    height: "36px",
                                                    border: '0',

                                                }}>
                                                {props.theme === 0 ?  <FolderOpen_W/>  :<FolderOpen_B/>}
                                            </div>
                                        </label>
                                        <input type="file" id="file" style={{display: "none"}} onChange={upload} ref={textInput}/>

                                        <div
                                            className={'ms-1'}
                                            style={{
                                                width: "32px",
                                                height: "32px",
                                                border: '0',
                                            }}
                                            onClick={clear}>
                                            {props.theme === 0 ?  <ArrowCCL_W/>  :<ArrowCCL_B/>}
                                        </div>

                                        <div
                                            className={'ms-3'}
                                            style={{
                                                width: "36px",
                                                height: "36px",
                                                border: '0',
                                            }}
                                            onClick={copy}>
                                            {props.theme === 0 ?  <Copy_W/>  :<Copy_B/>}
                                        </div>

                                        <div
                                            className={'ms-3 me-3'}
                                            style={{
                                                width: "36px",
                                                height: "36px",
                                                border: '0',
                                            }}
                                            onClick={download}>
                                            {props.theme === 0 ?  <Download_W/>  :<Download_B/>}
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <></>
                        }
                        <button
                            type={"button"}
                            className={'me-2 btn-modal'}
                            style={{
                                position:"relative",
                                height:"100%",
                                background:"transparent",
                                left:"5%",
                                border:"0",
                                borderLeft:"solid 2px",
                                borderLeftColor: (props.theme === 1) ? "#F2F2F2F2" : "#566270"}}
                                onClick={showToggle}>
                            {props.theme === 1 ?  <ThreeDots_W/>  :<ThreeDots_B/>}
                        </button>
                    </div>
                </div>
            </div>


            <Editor
                height="60%"
                defaultLanguage="python"
                defaultValue={props.skeleton_code}
                theme={(props.theme === 1) ? "vs-dark" : "light"}
                onMount={handleEditorDidMount}/>

            <div
                id={"exeButtonSection"}
                style={{
                    position:"relative",
                    height:"5%",
                    width:"100%",
                    marginTop:"5%"}}>
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