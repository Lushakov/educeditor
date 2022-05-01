import { useDispatch } from "react-redux";
import { useSlate } from "slate-react";
import styled from "styled-components"
import { CC } from "../editor/commands-controller/commands-controller"
import { CDN_UploadByFile, editorReqAborting } from "../editor/slice/editor-req";
import { useSaveMaterial } from "../units/hooks/useSaveMaterial";
import { ToolbarSwitchButtons, ToolbarMarkButtons } from "./toolbar-const";
import {
    ImageIcon,
    WordSpase,
    ListOLIcon,
    ListULIcon,
} from "./toolbar-icons"
import store from '../_store'
import Spiner from "../../components/spiner/spiner";
import { useRef, useState } from "react";



const Button = styled.div`
    color: ${props => props.active ? props.activeColor : props.color}; 
    width: 24px;
    display: inline-block;
    cursor: pointer;
    margin-left: 10px;
    :hover {
        color: ${props => props.hoverColor ? props.hoverColor : props.color}; 
    }
`;

const MarkButton = ({ format, icon, color, activeColor, value }) => {
    const editor = useSlate()
    return (
        <Button
            active={CC.isMarkActive(editor, format)}
            onClick={event => {
                event.preventDefault()
                CC.toggleMark(editor, format)
            }}
            color={color}
            activeColor={activeColor}
        >
            {icon}
        </Button>
    )
}

const SwitchMarkButton = ({ format, icon, color, activeColor, value }) => {
    const editor = useSlate()
    return (
        <Button
            active={CC.isValueMark(editor, format, value)}
            onClick={event => {
                event.preventDefault()
                CC.switchMark({ editor, format, value })
            }}
            color={color}
            activeColor={activeColor}
        >
            {icon}
        </Button>
    )
}

const BlockButton = ({ format, icon, color, activeColor, value }) => {
    const editor = useSlate()
    return (
        <Button
            active={CC.isBlockActive(editor, format)}
            onClick={event => {
                event.preventDefault()
                CC.toggleBlock({ editor, format })
            }}
            color={color}
            activeColor={activeColor}
        >
            {icon}
        </Button>
    )
}



const InsertBlockButton = ({ format, icon, color, hoverColor, value }) => {
    const editor = useSlate()
    return (
        <Button
            // active={CC.isBlockActive(editor, format)}
            onClick={event => {
                event.preventDefault()
                handleInsertBlock({ editor, format })
            }}
            color={color}
            hoverColor={hoverColor}
        >
            {icon}
        </Button>
    )
}

const handleInsertBlock = ({ editor, format }) => {
    switch (format) {
        case 'image':
            const input = document.getElementById("file-toolbar-input")
            input.click()
            break
        default:
            new Error('Format not found')
    }
}





const Wrapper = styled.div`
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100vw;
        z-index: 1;
        background: #fff;
    `

const Toolbar = styled.div`
        padding: 12px;
    `

const Menu = styled.div`
        width: 100%;
        height: 25px;
        padding-top: 3px;
        /* background-color: #424242; */
        background-color: #ffffff;
        /* color: #ddd; */
        color: #313131;
        /* border-bottom: 2px solid #f1f1f1; */
        font-size: 12px;

        span {
            margin-left: 15px;
            cursor: pointer;
        }
    `


const EditorToolbar = ({ editor }) => {
    const dispatch = useDispatch()
    const { handleSaveUnit } = useSaveMaterial()

    const [isSpinning, setIsSpinning] = useState(false)
    const abortControllerRef = useRef(null);
    // const [abortFunc, setAbortFunc] = useState(f=>f)

    const onAbortReq = () => {
        // abortFunc()
        abortControllerRef.current.abort()
        setIsSpinning(false)
    }

    const clearFileInput = () => document.getElementById("file-toolbar-input").value = "";

    const handleLoadFile = async ({ target, editor }) => {
        const file = target.files[0]

        if (file) {
            setIsSpinning(true)

            const abortController = new AbortController();
            const signal = abortController.signal
            // setAbortFunc(abortController.abort)
            abortControllerRef.current = abortController

            console.log('file', file)
            const data = new FormData()
            data.append('file', file)

            let result
            try {
                result = await dispatch(CDN_UploadByFile({file: data, signal})).unwrap()
                console.log('handleLoadFile', result)
                const url = 'http://45.135.134.152:8080/cdn/download?type=images&filename=' + result.filename
                CC.insertImage(editor, url)
                setIsSpinning(false)
                clearFileInput()
            } catch (err) {
                console.log('CDN_UploadByFile', err)
                clearFileInput()
                setIsSpinning(false)
                if(err?.name === 'ReferenceError') return
                alert('Ошибка загрузки картинки')
            }
        }

    }


//     const get
//     export const editorReqAborting = new AbortController();
// editorReqAborting.signal

    return (
        <Wrapper
            className="border-bottom border-3 mb-3"
        >
            <input
                type="file"
                id="file-toolbar-input"
                style={{ display: "none" }}
                onChange={({ target }) => {
                    handleLoadFile({ target, editor })
                }}
            />
            <Spiner
                isSpinning={isSpinning}
                explainText="Загрузка изображения"
                onClose={onAbortReq}
            />
            <Menu>
                <span>Файл</span>
                <span>Инструменты</span>
                <span>Вид</span>
                <span>Что-то там</span>
            </Menu>
            <Toolbar>
                {ToolbarMarkButtons.map(({ icon, format, color }, index) => (
                    <MarkButton
                        format={format}
                        icon={icon}
                        color={color}
                        key={index}
                    />
                ))}
                {ToolbarSwitchButtons.map(({ icon, format, color, activeColor, value }, index) => (
                    <SwitchMarkButton
                        format={format}
                        value={value}
                        icon={icon}
                        color={color}
                        activeColor={activeColor}
                        key={index}
                    />
                ))}
                <BlockButton
                    format="bulleted-list"
                    icon={ListULIcon}
                    color="#9d9d9d"
                    activeColor="#111"
                    key="bulleted-list"
                />
                <BlockButton
                    format="numbered-list"
                    icon={ListOLIcon}
                    color="#9d9d9d"
                    activeColor="#111"
                    key="numbered-list"
                />
                <InsertBlockButton
                    format="image"
                    icon={ImageIcon}
                    color="#9d9d9d"
                    hoverColor="#111"
                    key="image"
                />
                <InsertBlockButton
                    format="word-space"
                    icon={WordSpase}
                    color="#9d9d9d"
                    hoverColor="#111"
                    key="image"
                />
                <Button
                    style={{ marginLeft: '30px' }}
                    onClick={handleSaveUnit}
                >
                    Сохранить
                </Button>
            </Toolbar>
        </Wrapper>

    )
}
export default EditorToolbar