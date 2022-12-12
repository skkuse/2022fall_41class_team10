import React, {useRef,useState} from "react";
import CodeEdit from "./CodeEdit";
import Problem from "./Problem"
import Result from "./Result"
import styled from 'styled-components';
import axios from 'axios'
import {ReactComponent as Home} from "./icon/house.svg"
import {ReactComponent as Gear} from "./icon/gear.svg"
import Diff from "./Diff"
import Loading from './Loading'
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
        submit: 0,
        pro1 : this.props.content,
        pro2 : this.props.restriction,
        testcase1:this.props.testcase1,
        testcase2:this.props.testcase2,
        skeleton_code:this.props.skeleton_code,
        classid:this.props.class,
        assignid:this.props.assign,
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
    
        isLoading:false,
            
        copy_detect:0,
        total_score:-1,
        code_explain:"",
        code_result:" ",
        data:"",
        code_diff:""
    }
    setLoading = ()=>{
        this.setState({
            isLoading:true
        })
    }
    offLoading = ()=>{
        this.setState({
            isLoading:false
        })
    }
    api = async (data)=>{
        //const [loading, setLoading] = useState(true);
        //setLoading(true);
        this.setState({
            isLoading:true
        })
        await axios.post(
            "http://127.0.0.1:8000/code_submit/",
            {"code": data,
            "class_id": this.state.classid,
            "assign_id": this.state.assignid,
            "user_id": 35520
            })
        .then(response=>{
            this.setReadability(JSON.parse(response["data"]))
            //console.log(JSON.parse(response["data"]))
            //setLoading(false)
            }
        )
    }
    grade_api = async (data)=>{
        //const [loading, setLoading] = useState(true);
        //setLoading(true);
        this.setState({
            isLoading:true
        })
        await axios.post(
            "http://127.0.0.1:8000/code_grade/",
            {"code": data,
            "class_id": this.state.classid,
            "assign_id": this.state.assignid,
            "user_id": 35520
            })
        .then(response=>{
            //this.setReadability(JSON.parse(response["data"]))
            console.log(JSON.parse(response["data"])["result"])
            }
        )
        this.offLoading()
    }
    setReadability = (data)=>{
        console.log(data)
        console.log(data["score"]["LOC"])
        this.setState({
            case_correct:{
                "테스트케이스-1":(data["result"][0] === false)?"실패":"통과",
                "테스트케이스-2":(data["result"][0] === false)?"실패":"통과",
                "히든 테스트케이스-3":(data["result"][0] === false)?"실패":"통과",
                "히든 테스트케이스-4":(data["result"][0] === false)?"실패":"통과",
                "히든 테스트케이스-5":(data["result"][0] === false)?"실패":"통과",
            },
            readability: {
                "mypy": data["score"]["code_readability"][0]*5,
                "pylint": data["score"]["code_readability"][1]*5,
                "eradicate" : data["score"]["code_readability"][2]*5,
                "radon": data["score"]["code_readability"][3]*5,
                "pycodestyle": data["score"]["code_readability"][4]*5
            },
            efficency:{
                "Line Of Codes":data["score"]["code_efficiency"]["LOC"]*4,
                "Resevation Words": data["score"]["code_efficiency"]["Halstead"]*4,
                "Data Flow Compliexity": data["score"]["code_efficiency"]["Data flow"]*4,
                "control Flow Complexity":  data["score"]["code_efficiency"]["Control_flow"]*4
            },
            copy_detect:data["score"]['copy_detect'],
            total_score:data["score"]["total"],
            code_diff:data["score"]["code_diff_str"],
            code_explain:data["score"]["code_explain"].slice(1),
            submit:1,
            isLoading:false
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
                        border:"#2E4E3F"}}
                    onClick={this.props.returnHome}        
                >
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
                    <Problem data1 = {this.state.pro1}
                             data2 = {this.state.pro2}
                             testcase1 = {this.state.testcase1}
                             testcase2 = {this.state.testcase2}/>
                </div>
                <div
                id={"condeEditComponent"}
                style={{
                    position:"relative",
                    height:"94.5%",
                    width: !(this.state.submit===1) ?"70.1%":"44.1%",
                    left: !(this.state.submit===1) ? "0%":"1%",
                    float:"left"}}>
                <CodeEdit 
                    skeleton_code = {this.state.skeleton_code}
                    grade_api = {this.grade_api}
                    api = {this.api} submit = {this.setSubmit} setCodeResult = {this.setCodeResult} visible={this.state.submit}/>
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
                <Diff  code_diff={this.state.code_diff}/>
                </div>
                <div
                    id={"resultComponent"}
                    style={{
                        height:"80%",
                        width:"50%",
                        float:"left"}}>
                    <Result result = {this.state} backHome={this.backHome}
                        code_explain={this.state.code_explain}
                        copy_detect={this.state.copy_detect}
                        total_score={this.state.total_score}
                    />
                </div>
                </>
                : <></>}
                {
                    this.state.isLoading
                    ?
                <Loading
                />
                :<></>
                }
        </div>)
    }
}