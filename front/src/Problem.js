import React, {useRef} from "react";
import styled from 'styled-components';

export default class Problem extends React.Component{



    render(){
        return(
            <>
                <div
                    style = {{
                        height:"6%",
                        borderColor:"black",
                        borderStyle:"solid",
                        borderWidth:"1px",
                        lineHeight: "300%",
                    }}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;문제&참조/제약사항
                </div>
                <div
                    style = {{
                        height:"4%",
                        borderColor:"black",
                        borderStyle:"solid",
                        borderWidth:"1px",
                        lineHeight: "200%",
                    }}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;문제
                </div>
                <div
                    style = {{
                        height:"30%",
                        borderColor:"black",
                        borderStyle:"solid",
                        borderWidth:"1px",
                        lineHeight: "400%",
                    }}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;{this.props.data1}
                </div>
                <div
                    style = {{
                        height:"5%",
                        borderColor:"black",
                        borderStyle:"solid",
                        borderWidth:"1px",
                        lineHeight: "250%",
                    }}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;참조/제약사항
                </div>
                <div
                    style = {{
                        height:"20%",
                        borderColor:"black",
                        borderStyle:"solid",
                        borderWidth:"1px",
                        lineHeight: "400%",
                    }}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;{this.props.data2}
                </div>
                <div
                    style = {{
                        height:"6%",
                        borderColor:"black",
                        borderStyle:"solid",
                        borderWidth:"1px",
                        lineHeight: "300%",
                    }}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;테스트 케이스
                </div>
                <div
                    style = {{
                        height:"3%",
                        borderColor:"black",
                        borderStyle:"solid",
                        borderWidth:"1px",
                        lineHeight: "150%",
                    }}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;테 스 트 케 이 스 1
                </div>
                <div
                    style = {{
                        height:"10%",
                        borderColor:"black",
                        borderStyle:"solid",
                        borderWidth:"1px",
                        lineHeight: "150%",
                    }}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;input: {this.props.testcase1['input']}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;output: {this.props.testcase1['output']}
                </div>
                <div
                    style = {{
                        height:"3%",
                        borderColor:"black",
                        borderStyle:"solid",
                        borderWidth:"1px",
                        lineHeight: "150%",
                    }}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;테 스 트 케 이 스 2
                </div>
                <div
                    style = {{
                        height:"10%",
                        borderColor:"black",
                        borderStyle:"solid",
                        borderWidth:"1px",
                        lineHeight: "150%",
                    }}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;input:{this.props.testcase2['input']}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;output: {this.props.testcase2['output']}
                </div>
            </>
        )
    }
}