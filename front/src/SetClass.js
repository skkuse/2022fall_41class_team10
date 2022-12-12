import React, {useRef,useEffect, useState} from "react";
import styled from 'styled-components';
import axios from 'axios'

export default class Result extends React.Component{
    state={
        ClassList:[]
    }
    api = async (data)=>{
        //const [loading, setLoading] = useState(true);
        //setLoading(true);
        await axios.get(
            "http://127.0.0.1:8000/lecture/",
        )
        .then(response=>{
            this.setState({
                ClassList:JSON.parse(response['data'])['Classes']
            })
            }
        )
    }
    
    componentDidMount(){
        this.api()
    }
    render(){
        return(
            <div>
                
                {
                    this.state.ClassList.map(u=>(
                        <div
                            style={{
                                width:"50%",
                                height:"50%",
                                border:"1px solid black"
                            }}
                        >
                            {Object.entries(u)[0][1]} : {Object.entries(u)[1][1]}
                        </div>
                    ))
                }
                
            </div>
        )
    }
}