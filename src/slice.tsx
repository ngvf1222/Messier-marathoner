import {createSlice} from '@reduxjs/toolkit';
const dataSlice=createSlice({
  name: 'datas',
  initialState:{
    no_view:JSON.parse(localStorage.getItem('nocheck') ?? `[${Array.from({length: 110}, (v, i) => i)}]`),
    view:JSON.parse(localStorage.getItem('check') ?? '[]')
  },
  reducers:{
    look:(state,action)=>{
      state.view.push([action.payload,new Date().getTime()])//action.payload=메시에 번호
      state.no_view=state.no_view.filter((e:number)=>e!==action.payload)
      state.view.sort((a:number[], b:number[]) => a[0] - b[0])
      state.no_view.sort((a:number, b:number) => a - b)
      localStorage.setItem('check', JSON.stringify(state.view))
      localStorage.setItem('nocheck', JSON.stringify(state.no_view))
    },
    no_look:(state,action)=>{
      state.no_view.push(action.payload)
      state.view=state.view.filter((e:number[])=>e[0]!==action.payload)
      state.view.sort((a:number[], b:number[]) => a[0] - b[0])
      state.no_view.sort((a:number, b:number) => a - b)
      localStorage.setItem('check', JSON.stringify(state.view))
      localStorage.setItem('nocheck', JSON.stringify(state.no_view))
    },
    reset:(state,action?)=>{
      state.no_view=Array.from({length: 110}, (v, i) => i)
      state.view=[]
      localStorage.setItem('check', JSON.stringify(state.view))
      localStorage.setItem('nocheck', JSON.stringify(state.no_view))
    }
  }
});
const modeSlice = createSlice({
  name:'mode',
  initialState:{mode:'no_view'},
  reducers:{
    setmode:(state,action)=>{
      state.mode=action.payload
    }
  }
})
const popSlice = createSlice({
    name:'popup',
    initialState:{
        content:<p>null</p>,
        visible:false
    },
    reducers:{
      show_popup:(state,action)=>{
        state.visible=true
      },
      hide_popup:(state,action)=>{
        state.visible=false
      },
      set_content:(state,action)=>{
        state.content=(<table className='info_table'>
          <tr>
            <td>NGC/IC number</td>
            <td>{action.payload[0].replaceAll('\n','')}</td>
          </tr>
          <tr>
            <td>name</td>
            <td>{action.payload[1].replaceAll('\n','')}</td>
          </tr>
          <tr>
            <td>type</td>
            <td>{action.payload[2].replaceAll('\n','')}</td>
          </tr>
          <tr>
            <td>Distance(kly)</td>
            <td>{action.payload[3].replaceAll('\n','')}</td>
          </tr>
          <tr>
            <td>Constellation</td>
            <td>{action.payload[4].replaceAll('\n','')}</td>
          </tr>
          <tr>
            <td>Apparent magnitude</td>
            <td>{action.payload[5].replaceAll('\n','')}</td>
          </tr>
          <tr>
            <td>Right ascension</td>
            <td>{action.payload[6].replaceAll('\n','')}</td>
          </tr>
          <tr>
            <td>Declination</td>
            <td>{action.payload[7].replaceAll('\n','')}</td>
          </tr>
        </table>)

      }
    }
})

export {dataSlice,modeSlice,popSlice}