import Navbar from "../navbar/navbar"
import Modal from "../../components/modal/modal"
import { useRouter } from 'next/router'
import { Path } from "../../libs/const-path"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { createMaterials, deleteMaterial, fetchMaterials, fetchUnits } from "./_feature/units-reqs"
import { useSelector } from "react-redux"
import { selectList, selectUnitsList, selectUnitsListReq, setUnitsListReq, unitDataTemplate } from "./_feature/units-slice"
import { dateOption } from "../../libs/consts"
import styled from "styled-components"
import Pagination from '../../components/pagination/pagination'
import MaterialsTabsLayout from "../../components/layouts/materials-tabs-layout/materials-tabs-layout"
import Spiner from "../../components/spiner/spiner"
import { set } from "lodash"
import { getOffsetByPage, getPageAmount } from "../../libs/utils"



const DeleteButton = styled.div`
    display: inline-block;
    cursor: pointer;
    :hover {
        color: black;
    }
`


const Units = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [page, setPage] = useState(1)

    const [isModalCreate, setIsModalCreate] = useState(false)
    const [isModalDelete, setIsModalDelete] = useState(false)
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [currentMaterialID, setCurrentMaterialID] = useState(null)

    // const materialList = useSelector(selectUnitsList)
    const unitsListReq = useSelector(selectUnitsListReq)
    const unitsList = useSelector(selectUnitsList)

    const handleCreateButton = async () => {
        try {
            setIsLoading(true)
            const result = await dispatch(createMaterials({ name, data: [...unitDataTemplate] })).unwrap()
            setIsLoading(false)
            setName('')
            setErrMsg('')
            setIsModalCreate(false)
            dispatch(fetchUnits())
        } catch (err) {
            setErrMsg(err.message || 'Ошибка создания')
        }
    }

    const handleDeleteButton = async () => {
        try {
            setIsLoading(true)
            const result = await dispatch(deleteMaterial({ ID: currentMaterialID })).unwrap()
            setIsLoading(false)
            setErrMsg('')
            setIsModalDelete(false)
            dispatch(fetchUnits())
        } catch (err) {
            setErrMsg(err.message || 'Ошибка удаления')
        }
    }

    useEffect(() => {
        if (!unitsListReq) return
        dispatch(fetchUnits())
    }, [unitsListReq])

    return (
        <>
            <div className="text-end">
                <button
                    type="button"
                    class="btn btn-primary mt-3"
                    onClick={() => setIsModalCreate(true)}
                >
                    Создать материал
                </button>
            </div>

            <div className="list-group mt-3">
                {unitsList?.data?.map((item) => (
                    <a
                        className="list-group-item list-group-item-action"
                        aria-current="true" onClick={() => router.push(Path.UNITS + `/${item.ID}`)}
                    >
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{item.title}</h5>
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

            <div className="d-flex justify-content-center mt-4 mb-5">
                <Pagination
                    page={page}
                    count={getPageAmount(unitsList.totalLen, unitsListReq.limit)}
                    onChange={(event, value) => {
                        dispatch(setUnitsListReq({
                            offset: getOffsetByPage(value, unitsListReq.limit)
                        }))
                        setPage(value)
                    }}
                />
            </div>




            {/* Modal create*/}
            {isModalCreate &&
                <Modal
                    title="Создать материал"
                    onCloseModal={() => {
                        setIsModalCreate(false)
                        setErrMsg('')
                    }}
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
            {isModalDelete &&
                <Modal
                    title="Удалить материал?"
                    onCloseModal={() => {
                        setIsModalDelete(false)
                        setErrMsg('')
                    }}
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
export default Units