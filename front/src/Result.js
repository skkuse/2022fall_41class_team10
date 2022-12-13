import React, {useRef,useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "diff2html/bundles/css/diff2html.min.css";


export default class Result extends React.Component{

    state = {
        view : this.props.result.case_correct,
        type : 0,
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
            type : 2
        })
        console.log(this.view)
    }


    render(){
        return(
            <>
                <>
                    <div
                        id={"resultTitle"}
                        style={{
                            width:"100%",
                            height:'7%',
                        }}>
                        <span
                            style = {{
                                height:"6%",
                                lineHeight:"300%",
                                fontSize:"150%",
                                fontWeight:"bolder",
                            }}>
                            제출 결과
                        </span>
                        <span>
                            총점: {this.props.total_score}
                        </span>
                        <span
                            style = {{
                                height:"6%",
                                lineHeight:"400%",
                                fontSize:"100%",
                                fontWeight:"bolder",
                                left:"85%"
                            }}>
                            표절율 : {this.props.copy_detect}%
                        </span>
                    </div>
                    <div
                        className={"text_body ms-3"}
                        style={{
                            position:"relative",
                            width:"100%",
                            height:'103%',
                        }}>
                        <br/>
                        <div
                            style={{
                                position : "relative",
                                textAlign:"center",
                                Top:"65%",
                                height:"2%",
                                width:"33%",
                                fontWeight:"bolder",
                                float:"left",
                                fontSize:"18px",
                                color: (this.state.type===0)? "red":"black"
                            }}
                            onClick={this.functionality}>
                            기능 점수 확인
                        </div>
                        <div
                            style={{
                                position : "relative",
                                textAlign:"center",
                                Top:"65%",
                                height:"2%",
                                width:"32%",
                                fontWeight:"bolder",
                                float:"left",
                                fontSize:"18px",
                                color: (this.state.type===1)? "red":"black"
                            }}
                            onClick={this.efficency}>
                            효율 점수 확인
                        </div>
                        <div
                            style={{
                                position : "relative",
                                textAlign:"center",
                                Top:"65%",
                                height:"2%",
                                width:"32%",
                                float:"left",
                                fontWeight:"bolder",
                                fontSize:"18px",
                                color: (this.state.type===2)? "red":"black"
                            }}
                            onClick={this.readability}>
                            가독성 점수 확인
                        </div>

                        <div
                            style={{
                                position:"absolute",
                                backgroundColor:"black",
                                width:"94%",
                                height:"0.1%",
                                left:"3%",
                                top:"8%",
                            }}
                        />
                        <div
                            style={{
                                position:"absolute",
                                backgroundColor:"black",
                                width:"94%",
                                height:"0.1%",
                                left:"3%",
                                top:"40%",
                            }}
                        />
                        <div
                            style={{
                                position:"absolute",
                                backgroundColor:"black",
                                width:"94%",
                                height:"0.1%",
                                left:"3%",
                                top:"46%",
                            }}
                        />
                        <div
                            style={{
                                position:"absolute",
                                backgroundColor:"black",
                                width:"94%",
                                height:"0.1%",
                                left:"3%",
                                top:"67%",
                            }}
                        />
                        <div
                            style={{
                                position:"absolute",
                                backgroundColor:"black",
                                width:"94%",
                                height:"0.1%",
                                left:"3%",
                                top:"73%",
                            }}
                        />
                        <br/>
                        <br/>
                        <>
                            {

                                this.state.type===0 ?
                                <>
                                {
                                Object.entries(this.state.view).map(
                                    ([word, int]) =>
                                        <>
                                            <div style={{marginTop:"3%",position:"relative",width:"60%",height:"3%",float:"left",textAlign:"center",fontWeight:"bolder"}}>{word}</div>
                                            <div style={{marginTop:"3%",position:"relative",width:"1%",height:"3%",float:"left",}}></div>
                                            <div  style={{marginTop:"3%",width:"10%",height:"3%",float:"left",textAlign:"right",fontWeight:"bolder",color:(int==="통과")? "blue":"red"}}>{int}</div>
                                        </>
                                )}
                                </>
                                : this.state.type===1?

                                Object.entries(this.state.view).map(
                                    ([word, int]) =>
                                        <>
                                            <div style={{marginTop:"3%",position:"relative",width:"40%",height:"2%",float:"left",textAlign:"center", borderRadius:"10px",fontWeight:"bolder"}}>{word}</div>
                                            <div style={{marginTop:"3%",position:"relative",width:"33%",height:"2%",border:"0.1px solid black",float:"left", borderRadius:"10px"}}>
                                                <div style={{position:"relative",backgroundColor:"#FF7E7E", width:(int).toString()+"%",height: "100%",borderRadius:"10px"}}>
                                                </div>
                                            </div>
                                                <div  style={{marginTop:"3%",width:"15%",height:"3%",float:"left",textAlign:"right", fontWeight:"bolder"}}>{int}/100점 </div>
                                            <br/>
                                        </>
                                )
                                        :this.state.type===2?
                                        <>
                                            {Object.entries(this.state.view).map(
                                                ([word, int]) => <
                                                        >
                                                    <div style={{marginTop:"3%",position:"relative",width:"40%",height:"2%",float:"left",textAlign:"center", borderRadius:"10px",fontWeight:"bolder"}}>{word}</div>
                                                    <div style={{marginTop:"3%",position:"relative",width:"33%",height:"2%",border:"0.1px solid black",float:"left", borderRadius:"10px"}}>
                                                        <div style={{position:"relative",backgroundColor:"#FF7E7E", width:(int*5).toString()+"%",height: "100%",borderRadius:"10px"}}>
                                                        </div>
                                                    </div>
                                                    <div  style={{marginTop:"3%",width:"15%",height:"3%",float:"left",textAlign:"right", fontWeight:"bolder"}}>{int}/20점 </div>
                                                    <br/>
                                                </>
                                            )}

                                            <div
                                            style={{
                                                position:"absolute",
                                                top:"35%",
                                                width:"100%",
                                                left:"40%",
                                                fontSize:"13px"
                                            }}>
                                                {Object.entries(this.props.readability_why).map(
                                                    ([word,int])=><>{int}</>
                                                )}
                                                {console.log(this.props.readability_why)}
                                            </div>
                                        </>
                                        :<></>
                            }
                        </>
                        <div
                            style={{
                                position:"absolute",
                                top:"42%",
                                left:"65%",
                                width:"90%",
                                height:"20%",
                                lineHeight:"100%",
                            }}
                        >
                            <span
                                style={{
                                    position:"relative",
                                    left:"-65%",
                                    fontWeight:"bolder",
                                    fontSize:"20px"
                                }}
                            >코드 설명</span>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <span
                                style={{
                                    position:"relative",
                                    left:"-65%",
                                    fontWeight:"bolder",
                                    fontSize:"20px",
                                    lineHeight:"100%"
                                }}
                            >
                            {console.log(this.props.code_explain.split('\n'))}
                                {this.props.code_explain.split('\n').map( (word)=>
                                        <>
                                            {word}
                                            <br/>
                                        </>)}
                            </span>
                        </div>
                        <div
                        style={{
                            position:"absolute",
                            top:"69%",
                            left:"65%",
                            width:"90%",
                            height:"20%",
                            lineHeight:"100%",
                        }}
                        >
                            <span
                                style={{
                                    position:"relative",
                                    left:"-65%",
                                    fontWeight:"bolder",
                                    fontSize:"20px"
                                }}
                            >관련 자료</span>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <a
                                style={{
                                    position:"relative",
                                    left:"-65%",
                                    fontWeight:"bolder",
                                    fontSize:"17px"
                                }}
                                href={this.props.search_result['links'][0]}>
                                {this.props.search_result['titles'][0]}
                            </a>
                            <br/>
                            <br/>
                            <br/>
                            <a
                                style={{
                                    position:"relative",
                                    left:"-65%",
                                    fontWeight:"bolder",
                                    fontSize:"17px"
                                }}
                                href={this.props.search_result['links'][1]}>
                                {this.props.search_result['titles'][1]}
                            </a>
                            <br/>
                            <br/>
                            <br/>
                            <a
                                style={{
                                    position:"relative",
                                    left:"-65%",
                                    fontWeight:"bolder",
                                    fontSize:"17px"
                                }}
                                href={this.props.search_result['links'][2]}>
                                {this.props.search_result['titles'][2]}
                            </a>
                        </div>
                    </div>
                    </>
            </>
        )
    }
}