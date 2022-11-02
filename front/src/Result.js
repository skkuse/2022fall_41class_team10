import React, {useRef, useState} from "react";
import styled from 'styled-components';



export default class Result extends React.Component{

    state = {
        view : this.props.result.case_correct
    }
    functionality= ()=>{
        this.setState({
            view : this.props.result.case_correct})
    }
    efficency = () => {
        this.setState({
            view : this.props.result.efficency})
    }   
    readability = ()=>{
        this.setState({
            view : this.props.result.readability})
        console.log(this.view)
    }


    render(){
        return(
            <>
                {this.props.result.submit===1
                    ?   
                        <>
                            <div
                                style = {{
                                    position : "relative",
                                    height:"6%",
                                    borderColor:"black",
                                    borderStyle:"solid",
                                    borderWidth:"1px",
                                    lineHeight: "300%",
                                }}
                            >
                                &nbsp;&nbsp;&nbsp;&nbsp;제출 결과
                            </div>
                            <div
                                style={{
                                    height:"30%"
                                }}
                            >

                            </div>
                            <div
                                style={{
                                    position : "relative",
                                    textAlign:"center",
                                    Top:"65%",
                                    height:"4%",
                                    width:"33%",
                                    border:"3px solid black",
                                    float:"left",
                                    
                                }}  
                                onClick={this.functionality}  
                            >
                                기능 점수 확인
                            </div>
                            <div
                                style={{
                                    position : "relative",
                                    textAlign:"center",
                                    Top:"65%",
                                    height:"4%",
                                    width:"32%",
                                    border:"3px solid black",
                                    float:"left"
                                }}    
                                onClick={this.efficency}
                            >
                                효율 점수 확인
                            </div>
                            <div
                                style={{
                                    position : "relative",
                                    textAlign:"center",
                                    Top:"65%",
                                    height:"4%",
                                    width:"32%",
                                    border:"3px solid black",
                                    float:"left"
                                }}   
                                onClick={this.readability} 
                            >
                                가독성 점수 확인
                            </div>
                            <div>
                                {
                                    this.state.view.map(word =>{
                                        return (<div>&nbsp;&nbsp;&nbsp;&nbsp; {word} </div>)
                                    })
                                }
                            </div>
                        </>
                    :
                        <> 
                            <div
                                style = {{
                                    position : "relative",
                                    height:"6%",
                                    borderColor:"black",
                                    borderStyle:"solid",
                                    borderWidth:"1px",
                                    lineHeight: "300%",
                                }}
                            >
                                &nbsp;&nbsp;&nbsp;&nbsp;실행 결과
                            </div>
                            <div style = {{lineHeight:"180%"}}>
                                    {this.props.result.code_result.split('\n').map(word => {
                                        return (<span>&nbsp;&nbsp;&nbsp;&nbsp;{ word }<br/></span>)
                                    })}
                            </div>
                        </>}
            </>
        )
    }
}