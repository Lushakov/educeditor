import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import EditorApp from "../../editor/editor"
import UnitControlBlock from "./unit-control-block"
import { getUnitDetails, getMaterialDetails } from "../_feature/units-reqs"
import { selectCurrentSlice, selectSlateTrigget } from "../_feature/units-slice"


const Wrapper = styled.div`
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



const Unit = ({ pid }) => {
    const dispatch = useDispatch()

    const currentSlice = useSelector(selectCurrentSlice)
    const slateTrigget = useSelector(selectSlateTrigget)

    useEffect(() => {
        if (!pid) return
        // dispatch(getMaterialDetails({ ID: pid }))
        dispatch(getUnitDetails({ ID: +pid }))
    }, [pid])

    return (
        <Wrapper>
            <SlicesBlock className="border-end">
                <UnitControlBlock />
            </SlicesBlock>
            <div className="w-100" style={{ overflow: 'auto' }}>
                <EditorWrapper className="container shadow p-0" >
                    {currentSlice && <EditorApp key={slateTrigget}/>}
                </EditorWrapper>
            </div>
        </Wrapper>

    )
}
export default Unit