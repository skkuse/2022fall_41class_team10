import React, {useRef,useState} from "react";
import CodeEdit from "./CodeEdit";
import Problem from "./Problem"
import Result from "./Result"
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import axios from 'axios'
import reset from 'styled-reset';
import { darkTheme, lightTheme } from './themes/theme';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ReactComponent as Home_W} from "./icon/house_white.svg"
import {ReactComponent as Home_B} from "./icon/house_black.svg"
import {ReactComponent as Gear_W} from "./icon/gear_white.svg"
import {ReactComponent as Gear_B} from "./icon/gear_black.svg"
import Diff from "./Diff"
import Loading from './Loading'

// const pro1 = "두 수를 입력받아 더한 결과를 나타내십시오."
const pro1 = "For given 2 input, show the addition result"
// const pro2 = "입력받는 값은 정수로 처리해야 합니다."
const pro2 = "The number type is integer only."

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

// personal key
const googleKey = "AIzaSyDa_Vn4vLHuughW32fbM9fVbBBnLf_h2KU";

const GlobalStyle = createGlobalStyle`
    ${reset}
    // tag
    body{
      background-color:${(props) => props.theme.backgroundColor};
      color:${(props) => props.theme.textColor}
    }
    
    #top_navigationBar{
      background-color: ${(props) => props.theme.primaryColor};
    }
    
    header div.title{
      color:${(props) => props.theme.numButtonTextColor}
    }
    
    button{
      background-color: ${(props) => props.theme.backgroundColor};
      color:${(props) => props.theme.textColor}
    }
    
    // .class
    .numberButton{
      background-color: ${(props) => props.theme.primaryColor};
      color:${(props) => props.theme.numButtonTextColor}
    }
    
    .iconButton{
      background-color: ${(props) => props.theme.transparent};
    }
    
    .text_body{
      background-color: ${(props) => props.theme.bgsecondary};
    }
    
    // #id
    #total_container{
      background-color: ${(props) => props.theme.containerBg};
    }
    
    #weekTitle{
      background-color: ${(props) => props.theme.backgroundColor};
    }
    
    #submitButton{
      background-color: ${(props) => props.theme.secondaryColor};
    }
`


export default class App extends React.Component {
    state = {
        theme: 0,
        submit: 0,
        title: "Integer add/subtract",
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
            "pylint": 20,
            "eradicate" : 20,
            "radon": 20,
            "pycodestyle": 16
        },
        copy_detect:0,
        total_score:-1,
        code_explain:"",
        code_result:" ",
        data:"",
        searchResult: "",
        code_diff:""
    }

    api = async (data)=>{
        //const [loading, setLoading] = useState(true);
        //setLoading(true);
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
            }
        )
    }
    grade_api = async (data)=>{
        //const [loading, setLoading] = useState(true);
        //setLoading(true);
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
                "Line Of Codes":data["score"]["code_efficiency"]["LOC"],
                "Resevation Words": data["score"]["code_efficiency"]["Halstead"],
                "Data Flow Compliexity": data["score"]["code_efficiency"]["Data flow"],
                "control Flow Complexity":  data["score"]["code_efficiency"]["Control_flow"]
            },
            copy_detect:data["score"]['copy_detect'],
            total_score:data["score"]["total"],
            code_diff:data["score"]["code_diff_str"],
            code_explain:data["score"]["code_explain"],
            submit:1
        })
    }

    setCodeResult = (code)=>{
        console.log(code)
        this.setState(current=>({code_result:code}))
    }

    setSubmit = (tf)=>{
        this.setState(current=>({submit:tf}))
    }

    handleOptionChange = changeEvent => {
        this.setState({
            theme: (changeEvent.target.value === "Light")? 0 : 1
        });
    };

    backHome = ()=>{
        this.setState(current=>({submit:0}))
    }

    googleSearch = ()=>{
        fetch("https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyDa_Vn4vLHuughW32fbM9fVbBBnLf_h2KU&num=3&q=python " + this.state.title)
            .then(response => response.json())
            .then(response => {
                this.setState({ searchResult: response });
                console.log(response);
            });
    }

    render(){
        if (this.state.searchResult ==="")
            this.googleSearch();

        return(
            <ThemeProvider theme={(this.state.theme === 1) ? darkTheme : lightTheme}>
                <GlobalStyle />
                <div id={"total_container"}>

                    <div id={"top_navigationBar"} className={"border-bottom"}>
                        <header
                            className={"container flex-wrap d-flex py-3 align-items-center"}
                            style={{
                                width:"100%"}}>
                            <button
                                id={"homeButton"}
                                className={'iconButton border-0 me-md-5'}
                                onClick={this.props.returnHome}>
                                {this.state.theme === 1 ?  <Home_B/>  :<Home_W/>}
                            </button>
                            <div
                                className={'title me-md-auto'}
                                style={{
                                    fontSize:"25px",
                                    fontWeight:"bolder"}}>
                                Lecture 1</div>
                            <div
                                id={'weekTitle'}
                                className={'me-md-auto'}
                                style={{
                                    border: "solid 2px",
                                    borderColor: "#E6C619",
                                    borderRadius:"10px",
                                    height:"60%",
                                    lineHeight:"140%",
                                    width:"30%",
                                    textAlign:"center",
                                    fontWeight:"bolder",
                                    fontSize:"120%"}}>
                                week 1 {this.state.title}</div>

                            <div
                                id={"themeRadio"}
                                className={'me-md-5'}
                                style={{
                                }}>
                                <form className={'d-flex'}>
                                    <div className={"form-check title"}>
                                        <label style={{
                                            fontWeight:"bold",
                                            display:"flex",
                                            alignItems:"center",
                                            padding:"0"}}>
                                            <input
                                                style={{
                                                    marginRight:"5px"
                                                }}
                                                type="radio"
                                                name="react-tips"
                                                value="Light"
                                                checked={this.state.theme === 0}
                                                onChange={this.handleOptionChange}
                                                className="form-check-input"
                                            />
                                            Light
                                        </label>
                                    </div>

                                    <div className={"form-check title"}
                                         style={{position:"relative",
                                             left:"10px"}}>
                                        <label style={{
                                            fontWeight:"bold",
                                            display:"flex",
                                            alignItems:"center",
                                            padding:"0"}}>
                                            <input
                                                style={{
                                                    marginRight:"5px"
                                                }}
                                                type="radio"
                                                name="react-tips"
                                                value="Dark"
                                                checked={this.state.theme === 1}
                                                onChange={this.handleOptionChange}
                                                className="form-check-input"
                                            />
                                            Dark
                                        </label>
                                    </div>
                                </form>
                            </div>

                            <button
                                id={"settingButton"}
                                className={'iconButton'}
                                style={{
                                    // backgroundColor:"#2E4E3F"
                                    border:"0"
                                }}>
                                {this.state.theme === 1 ?  <Gear_B/> :<Gear_W/>}
                            </button>
                        </header>
                    </div>

                    {this.state.submit===0 ?
                        <>
                            <div
                                id={"problemComponent"}
                                style={{
                                    height:"960px",
                                    width:"35%",
                                    float:"left"}}>
                                <Problem data1 = {this.state.pro1}
                                         data2 = {this.state.pro2}
                                         testcase1 = {this.state.testcase1}
                                         testcase2 = {this.state.testcase2}/>
                            </div>
                        </>
                        : <> </>}
                    <div
                        id={"condeEditComponent"}
                        style={{
                            visibility: (this.state.submit===1) ? "hidden" : "visible",
                            position:"relative",
                            height:"960px",
                            width: !(this.state.submit===1) ?"65%":"0%",
                            left: !(this.state.submit===1) ? "0%":"1%",
                            float:"left"}}>
                        <CodeEdit api = {this.api} googleSearch = {this.googleSearch} submit = {this.setSubmit} setCodeResult = {this.setCodeResult} visible={this.state.submit} theme = {this.state.theme}/>
                    </div>

                    {this.state.submit===1 ?
                        <>
                            <div
                                id={"diffComponent"}
                                style={{position:"relative",
                                    height:"960px",
                                    top:"2%",
                                    width:"43%",
                                    float:"left",
                                    marginLeft:"5%",
                                    marginTop:"5%",
                                    // backgroundColor:"white"
                                }}>
                                <Diff code_diff={this.state.code_diff}/>
                            </div>
                            <div
                                id={"resultComponent"}
                                style={{
                                    height:"960px",
                                    width:"50%",
                                    float:"left"}}>
                                <Result result = {this.state} backHome={this.backHome}
                                        code_explain={this.state.code_explain}
                                        copy_detect={this.state.copy_detect}
                                        total_score={this.state.total_score}/>
                            </div>
                        </>
                        : <></>}
                </div>
            </ThemeProvider>
        )
    }
}