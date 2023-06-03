import {Provider, useSelector, useDispatch} from 'react-redux'
import {dataSlice, popSlice} from './slice'
function Popup(props:any){
    const dispatch = useDispatch();
    const visible = useSelector((state:any)=>state.popup.visible)
    const content = useSelector((state:any)=>state.popup.content)
    return (
        <div className="popup">
            <div className="modal-bg" style={visible?{display:'block'}:{display:'none'}} onClick={
                ()=>{dispatch(popSlice.actions.hide_popup(undefined))}
            }></div>
            <div className="modal-wrap" style={visible?{display:'block'}:{display:'none'}}>
                {content}
            </div>
        </div>
    )
}

export {Popup}