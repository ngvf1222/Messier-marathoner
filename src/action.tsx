import {Provider, useSelector, useDispatch} from 'react-redux'
import {dataSlice, popSlice} from './slice'
import Messier_data from './messier_data'
import { Popup } from 'popup';
function Elements(props:any){
    const dispatch = useDispatch();
    const mode = useSelector((state:any)=>state.mode.mode)
    const data = useSelector((state:any)=>state.data.view)
    return (
        <td className={`M${props.number}`}>
            <div id="elementdiv">
                <img src={`poster/M${props.number}.jpg`} width="100" height="100" alt={`M${props.number}
${mode==='view'?`관측시기:${new Date(data.filter((e:number[])=>e[0]===props.number-1)[0][1])}`:''}`} title={`M${props.number}
${mode==='view'?`관측시기:${new Date(data.filter((e:number[])=>e[0]===props.number-1)[0][1])}`:''}`} id="pic-tag"></img>
                <div id="number-div">{`M${props.number}`}</div>
                <div className="tab">
                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828885.png" width="20" height="20" alt="Information" title="Information" className="info_button" onClick={()=>{
                        dispatch(popSlice.actions.set_content(Messier_data[props.number-1]))
                        dispatch(popSlice.actions.show_popup(undefined))
                    }} id={props.number}></img>
                    <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" width="20" height="20" alt="delete" title="delete" className="delete-tag" onClick={()=>{
                        if(mode==='no_view'){
                            dispatch(dataSlice.actions.look(props.number-1))
                        }else if(mode==='view'){
                            dispatch(dataSlice.actions.no_look(props.number-1))
                        }
                    }}></img>
                </div>
            </div>
        </td>
    )
}

function MakeTable(props:any){
    const data = useSelector((state:any)=>{
        console.log(state.data[state.mode.mode],state.data,state.mode.mode)
        const d = state.data[state.mode.mode];
        return state.mode.mode==='view'?d.map((e:number[])=>e[0]):d
    })//mode==='nocheck'?nocheck:check
    const r:number=(data.length)%props.data_width
    const n:number=Math.floor((data.length-r)/props.data_width)
    let table_list:any[]=[]
    for(let i:number=0;i<n;i++){
        let tr_list:any[]=[]
        for(let j:number=0;j<props.data_width;j++){
            tr_list.push(<Elements number={data[props.data_width*i+j]+1}></Elements>)
        }
        table_list.push(<tr>
            {tr_list}
        </tr>)
    }
    let tr_list:any[]=[]
    for(let j:number=0;j<r;j++){
        tr_list.push(<Elements number={data[props.data_width*n+j]+1}></Elements>)
    }
    table_list.push(<tr>
        {tr_list}
    </tr>)
    return (
        <table className="table">
            <tbody id="Messier list">
                {table_list}
            </tbody>
        </table>
    )
}

export {Elements,MakeTable};
