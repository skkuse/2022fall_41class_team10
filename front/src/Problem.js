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
                    className={"text_body"}
                    style = {{
                        position:'relative',
                        left:"1%",
                        height:"65%",
                        width:"98%",
                        // backgroundColor:"#F8F8F8",
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
                    {/*&nbsp;&nbsp;&nbsp;&nbsp;문제*/}
                    &nbsp;&nbsp;&nbsp;&nbsp;Problem
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
                        {/*&nbsp;&nbsp;&nbsp;&nbsp;참조/제약사항*/}
                        &nbsp;&nbsp;&nbsp;&nbsp;Restrictions
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
                    <button
                        className={"numberButton"}
                        style={{
                            left:"20%",
                            height: "36px",
                            width: "36px",
                            // backgroundColor:"#2E4E3F",
                            // color:"white",
                            fontSize:"100%",
                            lineHeight: "100%",
                        }}
                        onClick={()=>{this.setState({testnum:1})}}
                    >
                        1
                    </button>
                    <button
                        className={"numberButton"}
                        style={{
                            left:"25%",
                            height: "36px",
                            width: "36px",
                            // backgroundColor:"#2E4E3F",
                            // color:"white",
                            fontSize:"100%",
                            lineHeight: "100%",
                        }}
                        onClick={()=>{this.setState({testnum:2})}}
                    >
                        2
                    </button>
                </div>
                <div
                    className={"text_body"}
                    style = {{
                        position:'relative',
                        left:"1%",
                        height:"22%",
                        width:"98%",
                        // backgroundColor:"#F8F8F8",
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