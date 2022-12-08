import React, {useRef} from "react";
import CodeEdit from "./CodeEdit";
import Problem from "./Problem"
import Result from "./Result"
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import axios from 'axios'
import reset from 'styled-reset';
import { darkTheme, lightTheme } from './themes/theme';
import {ReactComponent as Home_W} from "./icon/house_white.svg"
import {ReactComponent as Home_B} from "./icon/house_black.svg"
import {ReactComponent as Gear_W} from "./icon/gear_white.svg"
import {ReactComponent as Gear_B} from "./icon/gear_black.svg"
import Diff from "./Diff"

// const pro1 = "두 수를 입력받아 더한 결과를 나타내십시오."
const pro1 = "For given 2 input, show the addition result"
// const pro2 = "입력받는 값은 정수로 처리해야 합니다."
const pro2 = "The number type is integer only."
const testcase1 ={
    'input': '1 3',
    'output': '4'
}
const testcase2 ={
    'input': '4 4',
    'output': '8'
}

const GlobalStyle = createGlobalStyle`
    ${reset}
    // tag
    body{
      background-color:${(props) => props.theme.backgroundColor};
      color:${(props) => props.theme.textColor}
    }
    
    header{
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

    handleOptionChange = changeEvent => {
        this.setState({
            theme: (changeEvent.target.value === "Light")? 0 : 1
        });
    };

    backHome = ()=>{
        this.setState(current=>({submit:0}))
    }

    render(){
        return(
            <ThemeProvider theme={(this.state.theme === 1) ? darkTheme : lightTheme}>
                <GlobalStyle />
                <div
                    id={"total_container"}
                    style={{
                        height:"1000px",
                        width:"1200px",
                        // backgroundColor:"#F0F0F0"
                    }}>

                    <header
                        style={{
                            display:"flex",
                            alignItems:"center",
                            height:"5%",
                            width:"100%",
                            // backgroundColor:"#2E4E3F",
                            borderBottom:"solid 1px #F0F0F0"}}>
                        <button
                            id={"homeButton"}
                            className={'iconButton'}
                            style={{
                                position:"relative",
                                left:"1%",
                                height:"100%",
                                // backgroundColor:"#2E4E3F",
                                border:"0"}}>
                            {this.state.theme === 1 ?  <Home_B/>  :<Home_W/>}
                        </button>
                        <div
                            className={'title'}
                            style={{
                                position:"relative",
                                // color:"white",
                                fontSize:"25px",
                                fontWeight:"bolder",
                                left:"3%"}}>
                            Lecture 1</div>
                        <div
                            id={'weekTitle'}
                            style={{
                                position:"relative",
                                border: "solid 2px #E6C619",
                                borderRadius:"10px",
                                // backgroundColor:"white",
                                left:"25%",
                                height:"60%",
                                lineHeight:"140%",
                                width:"30%",
                                textAlign:"center",
                                fontWeight:"bolder",
                                fontSize:"120%"}}>
                            week 1 Integer add/subtract</div>

                        <div
                            id={"themeRadio"}
                            style={{
                                position:"relative",
                                left:"42%"
                            }}>
                            <form
                                style={{display:"flex"}}>
                                <div className={"form-check title"}>
                                    <label style={{
                                        fontWeight:"bold",
                                        display:"flex",
                                        alignItems:"center",
                                        textAlign:"center",
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
                                        textAlign:"center",
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
                                position:"relative",
                                left:"43%",
                                height:"100%",
                                // backgroundColor:"#2E4E3F"
                                border:"0"
                                }}>
                            {this.state.theme === 1 ?  <Gear_B/> :<Gear_W/>}
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
                        </>
                        : <> </>}
                    <div
                        id={"condeEditComponent"}
                        style={{
                            visibility: (this.state.submit===1) ? "hidden" : "visible",
                            position:"relative",
                            height:"94.5%",
                            width: !(this.state.submit===1) ?"70.1%":"0%",
                            left: !(this.state.submit===1) ? "0%":"1%",
                            float:"left"}}>
                        <CodeEdit api = {this.api} submit = {this.setSubmit} setCodeResult = {this.setCodeResult} visible={this.state.submit} theme = {this.state.theme}/>
                    </div>

                    {this.state.submit===1 ?
                        <>
                            <div
                                style={{position:"relative",
                                top:"2%",
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
                </div>
            </ThemeProvider>
        )
    }
}