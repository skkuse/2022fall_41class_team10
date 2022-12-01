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
                
                    <>
                        <div
                            style={{
                                position:"relative",
                                width:"100%",
                                height:'7%',
                            }}
                        >
                            <div
                                style={{
                                    position : "absolute",
                                    width:"20%",
                                    lineHeight:"230%",
                                    fontSize:"150%",
                                    fontWeight:"bolder",
                                    left:"-80%"
                                }}
                                onClick={this.props.backHome}
                            >코드 보기</div>
                            <div
                                style = {{
                                    position : "relative",
                                    height:"6%",
                                    lineHeight:"220%",
                                    fontSize:"150%",
                                    fontWeight:"bolder",
                                    
                                }}
                            >
                                &nbsp;&nbsp;&nbsp;&nbsp;제출 결과
                            </div>
                        </div>   
                        <div
                            className={"text_body"}
                            style={{
                                position:"relative",
                                width:"100%",
                                height:'103%',
                                // backgroundColor:"white",
                                left:"3%"
                            }}
                        >
                            <br/>
                            <div
                                style={{
                                    position : "relative",
                                    textAlign:"center",
                                    Top:"65%",
                                    height:"4%",
                                    width:"33%",
                                    fontWeight:"bolder",
                                    float:"left",
                                    fontSize:"18px"
                                    
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
                                    fontWeight:"bolder",
                                    float:"left",
                                    fontSize:"18px"
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
                                    float:"left",
                                    fontWeight:"bolder",
                                    fontSize:"18px"
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
                                                <div style={{marginTop:"5%",position:"relative",width:"60%",height:"3%",float:"left",textAlign:"center",fontWeight:"bolder"}}>{word}</div> 
                                                <div style={{marginTop:"5%",position:"relative",width:"1%",height:"3%",float:"left",}}></div>
                                                <div  style={{marginTop:"5%",width:"10%",height:"3%",float:"left",textAlign:"right",fontWeight:"bolder"}}>{int}</div> 
                                            </>
                                    )
                                    :

                                    Object.entries(this.state.view).map(
                                        ([word, int]) => <                       
                                                        >
                                                            <div style={{marginTop:"5%",position:"relative",width:"40%",height:"2%",float:"left",textAlign:"center", borderRadius:"10px",fontWeight:"bolder"}}>{word}</div> 
                                                            <div style={{marginTop:"5%",position:"relative",width:"33%",height:"2%",border:"0.1px solid black",float:"left", borderRadius:"10px"}}>
                                                                <div style={{position:"relative",backgroundColor:"#FF7E7E", width:int.toString()+"%",height: "100%",borderRadius:"10px"}}>
                                                                </div>
                                                            </div>
                                                                <div  style={{marginTop:"5%",width:"10%",height:"3%",float:"left",textAlign:"right", fontWeight:"bolder"}}>{int}점 </div>
                                                            <br/>
                                                        </> 
                                    )
                                }
                            </>
                        </div>
                        </>
                    
                        
            </>
        )
    }
}