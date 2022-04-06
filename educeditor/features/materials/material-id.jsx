import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import EditorApp from "../editor/editor"
import MaterialIdSliceItems from "./material-id-slice-items"
import { getMaterialDetails } from "./materials-reqs"
import { selectCurrentSlice, selectSlateTrigget } from "./materials-slice"


const MaterialIdWrapper = styled.div`
    display: flex;
    overflow: hidden;
    height: 100vh;
    margin-top: 78px;
    height: calc(100vh - 78px);
`


const EditorWrapper = styled.div`
    @media (max-width: 1461px) {
        margin-top: 60px;
       
   }
`

const SlicesBlock = styled.div`
    width: 400px;
    background-color: #fbfbfb;
    transition: .2s;
`



const MaterialId = ({ pid }) => {
    const dispatch = useDispatch()

    const currentSlice = useSelector(selectCurrentSlice)
    const slateTrigget = useSelector(selectSlateTrigget)

    useEffect(() => {
        if (!pid) return
        dispatch(getMaterialDetails({ ID: pid }))
    }, [pid])

    return (
        <MaterialIdWrapper>
            <SlicesBlock className="border-end">
                <MaterialIdSliceItems />
            </SlicesBlock>
            <div className="w-100" style={{ overflow: 'auto' }}>
                <EditorWrapper className="container shadow p-0" >
                    {currentSlice && <EditorApp key={slateTrigget}/>}
                </EditorWrapper>
            </div>
        </MaterialIdWrapper>

    )
}
export default MaterialId