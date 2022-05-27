import { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Modal from "../../../../../components/modal/modal"
import { addNewSlice, saveCurrentScliceToUnit, selectCurrentSlice, selectUnit, sliceDataTemplate, switchCurrentSlice } from "../../../_feature/units-slice"
import cloneDeep from "lodash/cloneDeep";
import { getMaterialDetails, updateMaterial } from "../../../_feature/units-reqs"
import { scrollbarHideMixin, scrollbarMixin } from "../../../../../styles/mixins"
import { useSaveSlice } from "../../../_feature/hooks/useSaveSlice"
import Spiner from "../../../../../components/spiner/spiner"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 7px;
    /* height: 100%; */
    max-height: calc(100% - 28px);
`

const SlicesBlock = styled.div`
    max-height: calc(100vh - 140px);
    overflow-x: auto;
    padding-right: 5px;
    background-color: rgba(0,0,0,0);
    /* -webkit-background-clip: text; */
    transition: background-color .8s;
    ${scrollbarHideMixin}
    :hover {
        ${scrollbarMixin}   
    }
`

const SlicesItem = styled.div`
    padding: 10px;
    border-radius: 4px;
    ${props => props.active ? 'background-color: #f2f1fb;' : ''}
    :hover {
        background-color: #e8e7f0;
        cursor: pointer;
    }
    div:nth-child(2){
        color: grey;
    }
`

const Slices = ({isVisible}) => {
    const dispatch = useDispatch()

    const { handleSaveUnit, isSaving } = useSaveSlice()

    const unit = useSelector(selectUnit)
    const currentSlice = useSelector(selectCurrentSlice)

    const [isModalCreate, setIsModalCreate] = useState(false)
    const [name, setName] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const handleCreateButton = async () => {
        if (!name) { setErrMsg('Введите название сайса'); return; }
        const index = unit.sliceList.findIndex(item => item.name === name)
        if (index !== -1) { setErrMsg('Такое имя уже существует'); return; }

        dispatch(addNewSlice(name))

        try {
            await dispatch(updateMaterial()).unwrap()
            closeModal()
        } catch (err) {
            setErrMsg('Ошибка создания')
        }
    }


    const closeModal = () => {
        setErrMsg('')
        setName('')
        setIsModalCreate(false)
    }

    const goToSlice = async (title) => {
        try {
            await handleSaveUnit()
            dispatch(switchCurrentSlice(title))
        } catch (err) {
            alert('Ошибка сохранения, попробуйте ещё раз')
        }
    }

    return (
        isVisible && <>
            <Spiner
                isSpinning={isSaving}
                explainText="Сохранение..."
                // onClose={onAbortReq}
            />
            <Wrapper>
                <SlicesBlock>
                    <h4>{unit?.title}</h4>
                    {/* List of units */}
                    {
                        unit?.sliceList?.map(({ title }) => (
                            <SlicesItem
                                class=""
                                active={title === currentSlice?.title}
                                onClick={() => goToSlice(title)}
                            >
                                <div class="fw-bold">{title}</div>
                                <div>Здесь управление слайсом</div>
                            </SlicesItem>
                        ))
                    }

                </SlicesBlock>
                <div className="text-center mt-2">
                    <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        onClick={() => setIsModalCreate(true)}
                    >
                        Добавить &#10010;
                    </button>
                </div>
            </Wrapper>

            {/* Modal */}
            {isModalCreate
                && <Modal
                    onCloseModal={closeModal}
                    title="Добавить слайс"
                >
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Название</label>
                        <input type="text" class="form-control" onChange={({ target }) => setName(target.value)} />
                        {errMsg && <div id="emailHelp" class="form-text">{errMsg}</div>}
                    </div>

                    <button
                        type="button"
                        class="btn btn-primary mt-3"
                        onClick={handleCreateButton}
                    >
                        Добавить
                    </button>
                </Modal>
            }
        </>
    )
}
export default Slices 