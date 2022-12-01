import React, {useRef} from "react";
import CodeEdit from "./CodeEdit";
import Problem from "./Problem"
import Result from "./Result"
import styled from 'styled-components';
import axios from 'axios'
import {ReactComponent as Home} from "./icon/house.svg"
import {ReactComponent as Gear} from "./icon/gear.svg"
import Diff from "./Diff"
const pro1 = "두 수를 입력받아 더한 결과를 나타내십시오."
const pro2 = "입력받는 값은 정수로 처리해야 합니다."
const testcase1 ={
    'input': '1 3',
    'output': '4'
}
const testcase2 ={
    'input': '4 4',
    'output': '8'
}
export default class App extends React.Component {
  
    state = {
        submit: 1,
        case_correct:{
            "테스트케이스-1":"통과",
            "테스트케이스-2":"통과",
            "히든 테스트케이스-3":"실패",
            "히든 테스트케이스-4":"실패",
            "히든 테스트케이스-5":"통과",
        },
        efficency:{
            "Line Of Codes": 90,
            "Resevation Words": 100,
            "Data Flow Compliexity": 80,
            "control Flow Complexity": 80
        },
        readability: {
            "mypy": 20,
            "pylint": 90,
            "eradicate" : 85,
            "radon": 70,
            "pycodestyle": 15
        },
        code_result:" ",
        data:""
    }

    api = async (data)=>{
        await axios.post(
            "http://127.0.0.1:8000/code_submit/",
            {code: data})
        .then(response=>
            this.setReadability(JSON.parse(response["data"])))
    }

    setReadability = (data)=>{
        console.log(data)
        this.setState({
            readability: {
                "mypy": data["score"]["code_readability"][0]*5,
                "pylint": data["score"]["code_readability"][1]*5,
                "eradicate" : data["score"]["code_readability"][2]*5,
                "radon": data["score"]["code_readability"][3]*5,
                "pycodestyle": data["score"]["code_readability"][4]*5
            }
        })
    }

    setCodeResult = (code)=>{
        console.log(code)
        this.setState(current=>({code_result:code}))
    }

    setSubmit = (tf)=>{
        this.setState(current=>({submit:tf}))
    }

    backHome = ()=>{
        this.setState(current=>({submit:0}))
    }

    render(){
        return(
        <div
            id={"total_container"}
            style={{
                height:"1200px",
                width:"1800px",
                backgroundColor:"#F0F0F0"}}>

            <header
                style={{
                    display:"flex",
                    alignItems:"center",
                    height:"5%",
                    width:"100%",
                    backgroundColor:"#2E4E3F",
                    border:"1em #F0F0F0"}}>
                <button
                    id={"homeButton"}
                    style={{
                        position:"relative",
                        left:"1%",
                        height:"100%",
                        backgroundColor:"#2E4E3F",
                        border:"#2E4E3F"}}>
                    <Home/>
                </button>
                <div
                    style={{
                        position:"relative",
                        color:"white",
                        fontSize:"25px",
                        fontWeight:"bolder",
                        left:"3%"}}>
                    강의 1</div>
                <div
                    style={{
                        position:"relative",
                        border: "5px #E6C619",
                        borderRadius:"10px",
                        backgroundColor:"white",
                        left:"25%",
                        height:"60%",
                        width:"30%",
                        textAlign:"center",
                        fontWeight:"bolder",
                        fontSize:"120%"}}>
                    week 1 정수 덧셈 구현</div>
                <button
                    id={"settingButton"}
                    style={{
                        position:"relative",
                        left:"53%",
                        height:"100%",
                        backgroundColor:"#2E4E3F",
                        border:"#2E4E3F"}}>
                    <Gear/>
                </button>
            </header>

            {this.state.submit===0 ?
            <>
                <div
                    id={"problemComponent"}
                    style={{
                        height:"94.5%",
                        width:"29.5%",
                        float:"left"}}>
                    <Problem data1 = {pro1}
                             data2 = {pro2}
                             testcase1 = {testcase1}
                             testcase2 = {testcase2}/>
                </div>
                <div
                id={"condeEditComponent"}
                style={{
                    position:"relative",
                    height:"94.5%",
                    width: !(this.state.submit===1) ?"70.1%":"44.1%",
                    left: !(this.state.submit===1) ? "0%":"1%",
                    float:"left"}}>
                <CodeEdit api = {this.api} submit = {this.setSubmit} setCodeResult = {this.setCodeResult} visible={this.state.submit}/>
            </div>
            </>
                : <> </>}
            {this.state.submit===1 ?
                <>
                <div
                    style={{position:"relative",
                    top:"1%",
                    height:"85%",
                    width:"48%",
                    float:"left",
                    marginTop:"3%",
                    backgroundColor:"white"
                }}
                >
                <Diff/>
                </div>
                <div
                    id={"resultComponent"}
                    style={{
                        height:"80%",
                        width:"50%",
                        float:"left"}}>
                    <Result result = {this.state} backHome={this.backHome}/>
                </div>
                </>
                : <></>}
        </div>)
    }
}