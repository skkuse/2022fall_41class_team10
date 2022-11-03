import React, {useRef} from "react";
import CodeEdit from "./CodeEdit";
import Problem from "./Problem"
import Result from "./Result"
import styled from 'styled-components';
import axios from 'axios'

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
    case_correct:[0,1,1,0,0],
    efficency:[20,20,30,30],
    readability: [20,18,20,20,15],
    code_result:" "
  }
  api = async (data)=>{
    await axios.post(
      "http://127.0.0.1:8000/submit/",
      {code: data}
    )
    .then(response => this.setState(current=>({
      code_result:response['data']}))
    )
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

  
  render(){
      return(
        <div
          style={{
            height:"1000px",
            width:"1500px"
          }}
        >
          <div
            style={{
              height:"5%",
              widht:"100%",
              borderColor:"black",
              borderStyle:"solid",
              borderWidth:"1px",
            }}
          >
            
          </div>
          <div
            style={{
              height:"80%",
              width:"29.5%",
              borderColor:"black",
              borderStyle:"solid",
              borderWidth:"1px",
              float:"left"
            }}>
              <Problem data1 = {pro1} 
                  data2 = {pro2}
                  testcase1 = {testcase1}
                  testcase2 = {testcase2}
              />
          </div>

          <div
            style={{
              height:"80%",
              width:"30%",
              borderColor:"black",
              borderStyle:"solid",
              borderWidth:"1px",
              float:"left"
            }}>
              <CodeEdit api = {this.api} submit = {this.setSubmit} setCodeResult = {this.setCodeResult}/>
          </div>
          <div
            style={{
              height:"80%",
              width:"40%",
              borderColor:"black",
              borderStyle:"solid",
              borderWidth:"1px",
              float:"left"
            }}>
              <Result result = {this.state}/>
          </div>
        </div>
      )
    }
}