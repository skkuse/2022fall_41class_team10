import React, {useRef} from "react";
import CodeEdit from "./CodeEdit";
import Problem from "./Problem"
import Result from "./Result"
import styled from 'styled-components';
import axios from 'axios'
import Home from "./icon/House.png"
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
  
  state  = {
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
      {code: data}
    )
    .then(response=>
        this.setReadability(JSON.parse(response["data"]))
    )
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
        this.setState(current=>({
          code_result:code}))
  }
  setSubmit = (tf)=>{
        this.setState(current=>({
          submit:tf}))

  }
  backHome = ()=>{
    this.setState(current=>({
      submit:0
    }))
  }

  
  render(){
      return(
        <div
          style={{
            height:"1000px",
            width:"1200px",
            backgroundColor:"#F0F0F0",
          }}
        >
          <div
            style={{
              position:"relative",
              height:"5%",
              widht:"100%",
              backgroundColor:"#2E4E3F"
            }}
          >
            <img
              style={{
                position:"relative",
                left:"1%",
                height:"70%",
                width:"3%",
                top:"15%"

              }}
              src = {Home}
            >
            </img>
            <span
              style={{
                position:"relative",
                color:"white",
                fontSize:"25px",
                fontWeight:"bolder",
                top:"4%",
                width:"10%",
                left:"4%"
              }}
            >강의 1</span>
            <div
              style={{
                position:"relative",
                borderRadius:"10px",
                backgroundColor:"white",
                top:"-60%",
                left:"35%",
                height:"60%",
                width:"30%",
                textAlign:"center",
                fontWeight:"bolder",
                fontSize:"120%",
              }}
            >
                week 1 정수 덧셈 구현
            </div>
          </div>
          {
            this.state.submit===0
          ?
          <div
            style={{
              height:"94.5%",
              width:"29.5%",
              
              float:"left"
            }}>
              <Problem data1 = {pro1} 
                  data2 = {pro2}
                  testcase1 = {testcase1}
                  testcase2 = {testcase2}
              />
          </div>
          :
          <>
          </>
          }
          <div
            style={{
              position:"relative",
              height:"94.5%",
              width: !(this.state.submit===1) ?"70.1%":"44.1%",
              left: !(this.state.submit===1) ? "0%":"1%",
              float:"left"
            }}>
              <CodeEdit api = {this.api} submit = {this.setSubmit} setCodeResult = {this.setCodeResult} visible={this.state.submit}/>
          </div>
          {
            this.state.submit===1
            ?
          <div
            style={{
              height:"80%",
              width:"50%",
              float:"left"
              
            }}>
              <Result result = {this.state} backHome={this.backHome}/>
          </div>
            :
            <></>
          }
        </div>
      )
    }
}