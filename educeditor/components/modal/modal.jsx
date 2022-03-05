import styled from "styled-components";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #00000065;
  z-index: 10000;
`;

const Wrapper = styled.div`
  margin: 0;
  position: absolute;
  top: 30%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1200px;
  padding-top: 150px;
`;

const Modal = ({
    children,
    onCloseModal,
    title,
}) => {
    return (
        <Background onClick={onCloseModal}>
            <Wrapper>
                <div class="modal-dialog" onClick={(event) => event.stopPropagation()}>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onCloseModal}></button>
                        </div>
                        <div class="modal-body">
                            {children}
                        </div>
                        {/* <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </Wrapper>
        </Background>
    )
}
export default Modal