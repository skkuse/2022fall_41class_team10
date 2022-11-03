import React, {useRef, useState} from "react";
import styled from 'styled-components';



export default class Result extends React.Component{

    state = {
        view : this.props.result.case_correct,
        type : 0
    }
    functionality= ()=>{
        this.setState({
            view : this.props.result.case_correct,
            type : 0
        })  
    }
    efficency = () => {
        this.setState({
            view : this.props.result.efficency,
            type : 1
        })
    }   
    readability = ()=>{
        this.setState({
            view : this.props.result.readability,
            type : 1
        })
        console.log(this.view)
    }


    render(){
        return(
            <>
                {this.props.result.submit===1
                    ?   
                        <div
                            style={{
                                position:"relative",
                                width:"100%",
                                height:'100%'
                            }}
                        >
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
                                    position : "relative",
                                    height:"40%"
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
                            <br/>
                            <br/>
                            <br/>
                            <>
                                {
                                    
                                    this.state.type===0
                                    ?
                                    Object.entries(this.state.view).map(
                                        ([word, int]) => 
                                            <>
                                                <div style={{marginTop:"5%",position:"relative",width:"60%",height:"3%",float:"left",textAlign:"center"}}>{word}</div> 
                                                <div style={{marginTop:"5%",position:"relative",width:"1%",height:"3%",float:"left",}}></div>
                                                <div  style={{marginTop:"5%",width:"10%",height:"3%",float:"left",textAlign:"right"}}>{int}</div> 
                                            </>
                                    )
                                    :

                                    Object.entries(this.state.view).map(
                                        ([word, int]) => <                       
                                                        >
                                                            <div style={{marginTop:"5%",position:"relative",width:"40%",height:"3%",float:"left",textAlign:"center"}}>{word}</div> 
                                                            <div style={{marginTop:"5%",position:"relative",width:"33%",height:"3%",border:"1px solid black",float:"left",}}>
                                                                <div style={{position:"relative",backgroundColor:"red", width:int.toString()+"%",height: "100%"}}>
                                                                </div>
                                                            </div>
                                                                <div  style={{marginTop:"5%",width:"10%",height:"3%",float:"left",textAlign:"right"}}>{int}점 </div>
                                                            <br/>
                                                        </> 
                                    )
                                }
                            </>
                        </div>
                    :
                        <div> 
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
                        </div>}
            </>
        )
    }
}