import React, {useRef,useState} from "react";
import styled from 'styled-components';


export default class Problem extends React.Component{
    state = {
        testnum:1
    }
    render(){
        return(
            <>
                <div
                    style = {{
                        height:"6%",
                        fontWeight:"bolder",
                        lineHeight: "300%",
                        fontSize:"25px"
                    }}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;Problem
                </div>
                <div
                    style = {{
                        position:'relative',
                        left:"1%",
                        height:"65%",
                        width:"98%",
                        backgroundColor:"#F8F8F8",
                        //borderRadius:"10px",
                        lineHeight: "200%",
                        //boxShadow: "1px 1px 1px black"
                    }}
                >
                    <span
                        style = {{
                            fontWeight:"bolder"
                        }}
                    >
                    &nbsp;&nbsp;&nbsp;&nbsp;문제
                    </span>
                    <br/>
                    <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;{this.props.data1}
                    </span>
                    <br/>
                    <br/>
                    <span
                        style = {{
                            fontWeight:"bolder"
                        }}
                    >
                        &nbsp;&nbsp;&nbsp;&nbsp;참조/제약사항
                    </span>
                    <br/>
                    <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;{this.props.data2}
                    </span>
                </div>
                
                <div
                    style = {{
                        position:"relative",
                        height:"6%",
                        lineHeight: "300%",
                        fontSize:"25px",
                        fontWeight:"bolder"
                    }}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;Test Case
                    <div
                        style={{
                            position:"absolute",
                            textAlign:"center",
                            top:"25%",
                            right:"20%",
                            height:"70%",
                            width:"10%",
                            backgroundColor:"#2E4E3F",
                            color:"white",
                            fontSize:"100%",
                            borderRadius:"100%",
                            lineHeight: "200%",
                        }}
                        onClick={()=>{this.setState({testnum:1})}}
                    >
                        1
                    </div>
                    <div
                        style={{
                            position:"absolute",
                            textAlign:"center",
                            top:"25%",
                            right:"5%",
                            height:"70%",
                            width:"10%",
                            backgroundColor:"#2E4E3F",
                            color:"white",
                            fontSize:"100%",
                            borderRadius:"100%",
                            lineHeight: "200%",
                        }}
                        onClick={()=>{this.setState({testnum:2})}}
                    >
                        2
                    </div>
                </div>
                <div
                    style = {{
                        position:'relative',
                        left:"1%",
                        height:"22%",
                        width:"98%",
                        backgroundColor:"#F8F8F8",
                        lineHeight: "200%",
                    }}
                >
                    {
                    (this.state.testnum===1)
                    ?
                        <>
                            &nbsp;&nbsp;&nbsp;&nbsp;input: {this.props.testcase1['input']}
                            <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;output: {this.props.testcase1['output']}
                        </>
                    :
                        <>
                            &nbsp;&nbsp;&nbsp;&nbsp;input: {this.props.testcase2['input']}
                            <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;output: {this.props.testcase2['output']}
                        </>
                    }
                </div>
            </>
        )
    }
}