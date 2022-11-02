import React, {useRef} from "react";
import styled from 'styled-components';

export default class Result extends React.Component{



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
                    &nbsp;&nbsp;&nbsp;&nbsp;실행 결과
                </div>
            </>
        )
    }
}