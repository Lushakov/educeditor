import { useState } from "react"
import styled from "styled-components"

const ToolkitStyled = styled.div`
    margin-top: 15px;
    
    /* background-color: #fff; */
    :first-child {
        margin-top: 0px;
    }
`
const Header = styled.div`
    display: flex;
    border: 1px solid #ebebeb;
    border-radius: 4px;
    padding: 5px 10px;
    background-color: #fff;
    div, p {
        margin: 0;
        font-size: 16px;
        padding-right: 5px;
        cursor: pointer;
    }
`
const Content = styled.div`
    display: ${props => props?.isVisible ? 'grid' : 'none'};
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    padding: 0 10px;
    padding-bottom: 10px;
    padding-top: 10px;

    border-bottom: 1px solid #ebebeb;
`
const ToolStyled = styled.div`
    background-color: #fff;
    border-bottom: 1px solid #ebebeb;
    border-radius: 4px;
    cursor: pointer;  
    img {
        width: 100%;
    }
`


const Toolkit = ({onChangeDetails = f=>f, data}) => {
    const [isVisible, setIsVisible] = useState(true)
    const toggleVisible = () => setIsVisible(value => !value)

    const getOffsetTop = (evt) => {
        const scrollTop = evt?.target?.parentElement?.parentElement?.parentElement?.scrollTop
        const offsetTop = evt?.target?.offsetTop
        return offsetTop - scrollTop
    }

    return (
        <ToolkitStyled>
            <Header>
                <div onClick={toggleVisible}>
                    {isVisible ? <span>&#8722;</span> : <span>&#43;</span>}
                </div>
                <p onClick={toggleVisible}>{data?.title}</p>
            </Header>
            <Content isVisible={isVisible}>
                {
                    data?.data?.map(data => (
                        <ToolStyled
                            key={data?.ID}
                            onMouseOver={(evt) => onChangeDetails({
                                ...data,
                                offsetTop: getOffsetTop(evt), 
                                isEmpty: false,
                                evt
                            })}
                            onMouseOut={(evt) => onChangeDetails({isEmpty: true})}
                        >
                            <img src={data?.img || '/img/tools/tool-img.png'}/>
                        </ToolStyled>
                    ))
                }
            </Content>
        </ToolkitStyled>
    )
}

export default Toolkit