import { useDispatch } from "react-redux";
import { useSlate } from "slate-react";
import styled from "styled-components"
import { CommandsController } from "../editor/commands-controller/commands-controller"
import { useSaveMaterial } from "../materials/hooks/useSaveMaterial";
import { ToolbarSwitchButtons, ToolbarMarkButtons } from "./toolbar-const";
import {
    ListOLIcon,
    ListULIcon,
} from "./toolbar-icons"



const Button = styled.div`
    color: ${props => props.active ? props.activeColor : props.color}; 
    width: 24px;
    display: inline-block;
    cursor: pointer;
    margin-left: 10px;
`;

const MarkButton = ({ format, icon, color, activeColor, value }) => {
    const editor = useSlate()
    return (
        <Button
            active={CommandsController.isMarkActive(editor, format)}
            onClick={event => {
                event.preventDefault()
                CommandsController.toggleMark(editor, format)
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
            active={CommandsController.isValueMark(editor, format, value)}
            onClick={event => {
                event.preventDefault()
                CommandsController.switchMark({ editor, format, value })
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
            active={CommandsController.isBlockActive(editor, format)}
            onClick={event => {
                event.preventDefault()
                CommandsController.toggleBlock({ editor, format })
            }}
            color={color}
            activeColor={activeColor}
        >
            {icon}
        </Button>
    )
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
 
    return (
        <Wrapper
            className="border-bottom border-3 mb-3"
        >
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