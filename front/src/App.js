import React, {useRef} from "react";
import CodeEdit from "./CodeEdit";
import styled from 'styled-components';
impo





export default class App extends React.Component {
  
  
  api(){
    axios({
      method:"post",
      url:"",
      Headers:{}
    })
      .then((res)=>{dispatchEvent()})
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
              <CodeEdit/>
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
          </div>
        </div>
      )
    }
}