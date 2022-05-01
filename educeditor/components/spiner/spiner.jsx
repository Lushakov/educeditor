import styled from "styled-components"

const Background = styled.div`
    display: fixed;
    width: 100vw;    
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    background: #ffffffc1;
    .explain-text-for-spiner {
        margin-left: 20px;
    }
`
const CloseBlock = styled.div`
    position: absolute; 
    top: 30px;
    right: 30px;
    justify-self: end;
    align-self: start;
    
`

const Spiner = ({ isSpinning, onClose, explainText }) => {
    return (
        <>
            {isSpinning && <Background>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                {explainText && <div className="explain-text-for-spiner">{explainText}</div>}
                {onClose && <CloseBlock>
                    <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={onClose}></button>
                </CloseBlock>}
            </Background>}
        </>
    )
}
export default Spiner