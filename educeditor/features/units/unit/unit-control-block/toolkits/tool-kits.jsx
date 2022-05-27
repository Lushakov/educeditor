import { imageConfigDefault } from "next/dist/server/image-config"
import { useState } from "react"
import styled from "styled-components"
import { scrollbarHideMixin, scrollbarMixin } from "../../../../../styles/mixins"
import { dataToolKit } from "./const"
import ToolDetails from "./tool-details"
import Toolkit from "./tool-kit"


const Wrapper = styled.div`
    display: ${props => props?.isVisible ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 7px;
    height: 100%;
    max-height: calc(100% - 28px);
`
const ToolkitsList = styled.div`
    /* max-height: calc(100% - 140px); */
    overflow-x: auto;
    padding-right: 5px;
    transition: background-color .8s;
    ${scrollbarHideMixin}
    :hover {
        ${scrollbarMixin}   
    }
`


const Toolkits = ({isVisible}) => {
    const [dataDetails, setDataDetails] = useState({isEmpty: true})
    const onChangeDetails = (obj) => {
        setDataDetails(obj)
        console.log(obj)
    }
    
    return (
        <Wrapper isVisible={isVisible}>
            <ToolkitsList>
                <Toolkit onChangeDetails={onChangeDetails} data={dataToolKit}/>
                <Toolkit onChangeDetails={onChangeDetails} data={dataToolKit}/>
            </ToolkitsList>
            <div className="text-center mt-2">
                <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    onClick={() => null}
                >
                    Добавить &#10010;
                </button>
            </div>
            {!dataDetails?.isEmpty && <ToolDetails dataDetails={dataDetails} />}
        </Wrapper>
    )
}
export default Toolkits