import Navbar from "../navbar/navbar"
import Modal from "../../components/modal/modal"
import { useRouter } from 'next/router'
import { Path } from "../../libs/const-path"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { createMaterials, deleteMaterial, fetchMaterials } from "./materials-reqs"
import { useSelector } from "react-redux"
import { selectList, unitDataTemplate } from "./materials-slice"
import { dateOption } from "../../libs/consts"
import styled from "styled-components"


const DeleteButton = styled.div`
    display: inline-block;
    cursor: pointer;
    :hover {
        color: black;
    }
`


const Materials = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [isModalCreate, setIsModalCreate] = useState(false)
    const [isModalDelete, setIsModalDelete] = useState(false)
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [currentMaterialID, setCurrentMaterialID] = useState(null)

    const materialList = useSelector(selectList)

    const handleCreateButton = async () => {
        try {
            setIsLoading(true)
            const result = await dispatch(createMaterials({ name, data: [...unitDataTemplate] })).unwrap()
            setIsLoading(false)
            setName('')
            setErrMsg('')
            setIsModalCreate(false)
            dispatch(fetchMaterials())
        } catch (err) {
            setErrMsg(err.message || 'Ошибка создания')
        }
    }

    const handleDeleteButton = async () => {
        try {
            setIsLoading(true)
            const result = await dispatch(deleteMaterial({ID: currentMaterialID})).unwrap()
            setIsLoading(false)
            setErrMsg('')
            setIsModalDelete(false)
            dispatch(fetchMaterials())
        } catch (err) {
            setErrMsg(err.message || 'Ошибка удаления')
        }
    }

    useEffect(() => {
        dispatch(fetchMaterials())
    }, [])

    return (
        <>
            <Navbar />
            <div className="container pt-5">
                <h2>Список материалов</h2>

                <button
                    type="button"
                    class="btn btn-primary mt-3"
                    onClick={() => setIsModalCreate(true)}
                >
                    Создать материал
                </button>

                <div className="list-group mt-3">
                    {materialList?.data?.map((item) => (
                        <a
                            className="list-group-item list-group-item-action"
                            aria-current="true" onClick={() => router.push(Path.MATERIALS + `/${item._id}`)}
                        >
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{item.name}</h5>
                                <small>{new Date(item.updatedAt * 1000).toLocaleString("ru", dateOption)}</small>
                            </div>
                            <p className="mb-1">Some placeholder content in a paragraph.</p>
                            <dev>
                                <DeleteButton
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        setIsModalDelete(true)
                                        setCurrentMaterialID(item._id)
                                    }}
                                >
                                    Удалить
                                </DeleteButton>
                            </dev>
                        </a>
                    ))}
                </div>
            </div>

            {/* Modal create*/}
            {isModalCreate
                && <Modal
                    onCloseModal={() => {
                        setIsModalCreate(false)
                        setErrMsg('')
                    }}
                    title="Создать материал"
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
                        Создать
                    </button>
                </Modal>}

            {/* Modal delete*/}
            {isModalDelete
                && <Modal
                    onCloseModal={() => {
                        setIsModalDelete(false)
                        setErrMsg('')
                    }}
                    title="Удалить материал?"
                >
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">
                            {materialList?.data?.find(item => item._id === currentMaterialID).name}
                        </label>
                        {errMsg && <div id="emailHelp" class="form-text">{errMsg}</div>}
                    </div>

                    <button
                        type="button"
                        class="btn btn-primary mt-3"
                        onClick={handleDeleteButton}
                    >
                        Удалить
                    </button>
                </Modal>}
        </>
    )
}
export default Materials