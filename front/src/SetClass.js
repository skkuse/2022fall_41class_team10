import React, {useRef,useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import App from './App';


export default class Result extends React.Component{
    state={
        class_name:"",
        assign_name:"",
        select:-1,
        class:-1,
        assign:-1,
        ClassList:[],
        AssignList:[],
        Content:"",
        skeleton_code:"",
        Restriction:"",
        due_date:"",
        testcase1:{
            'input': '',
            'output': '',
        },
        testcase2:{
            'input':'',
            'output':''
        }
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
    returnHome=()=>{
        this.setState({
            select:-1,
            class:-1,
            assign:-1,
        })
    }
    getAssign = async (index,name)=>{
        //const [loading, setLoading] = useState(true);
        //setLoading(true);
        var url = "http://127.0.0.1:8000/lecture/".concat(String(index))
        this.setState({class:index})
        await axios.get(
            url,
        )
        .then(response=>{
            this.setState({
                class_name:name,
                AssignList:JSON.parse(response['data'])['Assignments']
            })
            }
        )
    }
    setCode(index,name){
        this.setState({assign:index})
        var url = "http://127.0.0.1:8000/lecture/".concat(String(this.state.class),'/',index,'/testcase')

        axios.get(
            url,
        ).then(response=>{
            this.setState({
                assign_name:name,
                testcase1:{
                    'input': JSON.parse(response['data'])["Tests"][0][1],
                    'output': JSON.parse(response['data'])["Tests"][0][2]
                },
                testcase2:{
                    'input': JSON.parse(response['data'])["Tests"][1][1],
                    'output': JSON.parse(response['data'])["Tests"][1][2]
                }
            })
        })

        

        var url = "http://127.0.0.1:8000/lecture/".concat(String(this.state.class),'/',index)
        axios.get(
            url,
        ).then(response=>{
            console.log(JSON.parse(response['data']))
            this.setState({
                Content:JSON.parse(response['data'])['Content'],
                Restriction:JSON.parse(response['data'])['Restriction'],
                due_date:JSON.parse(response['data'])['due_date'],
                skeleton_code:JSON.parse(response['data'])['skeleton_code'],
                select:0
            })
        })

    }
    componentDidMount(){
        this.api()
    }
    render(){
        return(
            <>
                {this.state.select ===-1 ?
                    <>
                    {this.state.class===-1 ?
                        <div className={'container'}>
                            <div className={'d-flex align-items-center justify-content-center border-bottom mb-3'}
                            style={{height:"60px"}}>
                                <span className={'text-center fw-bold fs-3'}>
                                    과목 선택
                                </span>
                            </div>
                            <ul className={'nav nav-pills flex-column '}>
                                {this.state.ClassList.map(u=>(
                                    <li className={'card nav-item'}
                                        style={{height:"45px"}}
                                         onClick={()=>this.getAssign(Object.entries(u)[0][1],Object.entries(u)[1][1])}>
                                        <div className={'nav-link active fs-5 w-100  text-center'} style={{backgroundColor:"#2E4E3F"}}>{Object.entries(u)[0][1]} - {Object.entries(u)[1][1]}</div>
                                    </li>))
                                }
                            </ul>
                        </div>
                        :
                        <div className={'container'}>
                            <div className={'d-flex align-items-center justify-content-center border-bottom mb-3'}
                                 style={{height:"60px"}}>
                                <span className={'text-center fw-bold fs-3'}>
                                    과제 선택
                                </span>
                            </div>
                            <ul className={'nav nav-pills flex-column mb-auto'}>
                                {this.state.AssignList.map(u=>(
                                    <li className={'card nav-item'}
                                        style={{height:"45px"}}
                                        onClick={()=>this.setCode(Object.entries(u)[0][1],Object.entries(u)[1][1])}>
                                        <div className={'nav-link active fs-5 w-100 text-center'} style={{backgroundColor:"#2E4E3F"}}>{Object.entries(u)[0][1]} - {Object.entries(u)[1][1]}</div>
                                    </li>))
                                }
                            </ul>
                        </div>
                    }
                    </>
                    :
                    <App 
                        returnHome = {this.returnHome}
                        class_name={this.state.class_name}
                        assign_name={this.state.assign_name}
                        class={this.state.class}
                        assign={this.state.assign}
                        content={this.state.Content} 
                        testcase1={this.state.testcase1}
                        testcase2={this.state.testcase2}
                        restriction={this.state.Restriction} skeleton_code={this.state.skeleton_code}/>
                }
            </>
        )
    }
}