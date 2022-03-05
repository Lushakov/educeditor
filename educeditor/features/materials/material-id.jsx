import { useEffect } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import EditorApp from "../editor/editor"
import MaterialIdSliceItems from "./material-id-slice-items"
import { getMaterialDetails } from "./materials-reqs"


const MaterialIdWrapper = styled.div`
    display: flex;
    overflow: hidden;
    height: 100vh;
    margin-top: 60px;
    height: calc(100vh - 60px);
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
                    <EditorApp />
                </EditorWrapper>
            </div>
        </MaterialIdWrapper>

    )
}
export default MaterialId