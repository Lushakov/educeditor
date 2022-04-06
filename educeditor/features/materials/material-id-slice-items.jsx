import { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Modal from "../../components/modal/modal"
import { addNewSlice, saveCurrentScliceToUnit, selectCurrentSlice, selectUnit, sliceDataTemplate, switchCurrentSlice } from "./materials-slice"
import cloneDeep from "lodash/cloneDeep";
import { getMaterialDetails, updateMaterial } from "./materials-reqs"
import { scrollbarHideMixin, scrollbarMixin } from "../../styles/mixins"
import { useSaveMaterial } from "./hooks/useSaveMaterial"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 7px;
    height: 100%;
`

const SlicesBlock = styled.div`
    max-height: calc(100vh - 140px);
    overflow-x: auto;
    padding-right: 5px;
    background-color: rgba(0,0,0,0);
    -webkit-background-clip: text;
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

const MaterialIdSliceItems = () => {
    const dispatch = useDispatch()

    const { handleSaveUnit } = useSaveMaterial()

    const unit = useSelector(selectUnit)

    const currentSlice = useSelector(selectCurrentSlice)

    const [isModalCreate, setIsModalCreate] = useState(false)
    const [name, setName] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const handleCreateButton = async () => {
        if (!name) { setErrMsg('Введите название сайса'); return; }
        const index = unit.data.findIndex(item => item.name === name)
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

    return (
        <>
            <Wrapper>
                <SlicesBlock>
                    <h4>{unit?.name}</h4>
                    {unit?.data?.map(({ name }) => (
                        <SlicesItem 
                            class=""
                            active={name === currentSlice?.name}
                            onClick={() => {
                                dispatch(saveCurrentScliceToUnit())
                                dispatch(switchCurrentSlice(name))
                                handleSaveUnit()
                            }}
                        >
                            <div class="fw-bold">{name}</div>
                            <div>Здесь управление слайсом</div>
                        </SlicesItem>
                    ))}

                </SlicesBlock>
                <div className="text-center">
                    <button type="button" class="btn btn-primary" onClick={() => setIsModalCreate(true)}>Добавить</button>
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
                </Modal>}
        </>
    )
}
export default MaterialIdSliceItems 