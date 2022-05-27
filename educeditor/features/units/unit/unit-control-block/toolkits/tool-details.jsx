import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

const getTopPosition = (offsetTop, height) => {
    const halfHeight = height/2 
    let vh
    if (process.browser) vh = document.documentElement.clientHeight
    else vh = 756

    if (offsetTop < halfHeight) return 15
    if (offsetTop + halfHeight + 22 > vh) return vh - height - 22
    return offsetTop - halfHeight + 22
}

const ToolDetailsStyled = styled.div`
    position: fixed;
    top: calc(${props => getTopPosition(props?.offsetTop, props?.height) + 'px'});
    left: 330px;
    display: flex;
    flex-direction: column;
    max-width: 500px;
    max-height: 500px;
    /* width: 200px; */
    /* height:  200px; */
    background-color: #fbfbfb;
    box-shadow: 0px 0px 20px 7px rgba(34, 60, 80, 0.2);
    border-radius: 6px;
    border: 1px solid #ebebeb;
    z-index: 2;
    opacity: ${props => props.height ? '1' : '0'};

    img {
        max-width: 100%
    }
`

const Header = styled.div`
    width: 100%;
    border-bottom: 1px solid #ebebeb;
    padding: 5px 7px;
    text-align: center;
`


const ToolDetails = ({ dataDetails }) => {
    const { img, detailsImg,  title, offsetTop } = dataDetails
    const [height, setHeight] = useState(0);
    const ref = useRef(null)
    useEffect(() => setHeight(ref?.current?.offsetHeight))
    return (
        <ToolDetailsStyled ref={ref} height={height} offsetTop={offsetTop}>
            <Header>{title}</Header>
            <img src={detailsImg}/>
        </ToolDetailsStyled>
    )
}
export default ToolDetails