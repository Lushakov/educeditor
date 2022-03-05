import { useSlate } from "slate-react";
import styled from "styled-components"
import { CommandsController } from "../editor/commands-controller/commands-controller"
import {
    DropletFillIcon,
    FilmIcon,
    ImageIcon,
    ListOLIcon,
    ListULIcon,
    QuoteIcon,
    TextColorIcon,
    TypeBoldIcon,
    TypeH1Icon,
    TypeH2Icon,
    TypeItalicIcon,
    TypeStrikethroughIcon,
    TypeUnderlineIcon
} from "./toolbar-icons"



const Button = styled.div`
    color: ${props => props.active ? props.activeColor: props.color}; 
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
                CommandsController.switchMark({editor, format, value})
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
                CommandsController.toggleBlock({editor, format})
            }}
            color={color}
            activeColor={activeColor}
        >
            {icon}
        </Button>
    )
}


const EditorToolbar = ({ editor }) => {

    const ToolbarMarkButtons = [
        {
            icon: TypeBoldIcon,
            format: 'bold',
            activeColor: '#111111',
            color: '#9d9d9d',
        },
        {
            icon: TypeItalicIcon,
            format: 'italic',
            activeColor: '#111111',
            color: '#9d9d9d',
        },
        {
            icon: TypeStrikethroughIcon,
            format: 'strikethrough',
            activeColor: '#111111',
            color: '#9d9d9d',
        },
        {
            icon: TextColorIcon,
            format: '',
            activeColor: '#111111',
            color: '#9d9d9d',
        },

        // {
        //     icon: TypeH1Icon,
        //     action: event => {
        //         event.preventDefault()
        //         CommandsController.toggleBoldMark(editor)
        //     }
        // },
        // {
        //     icon: TypeH2Icon,
        //     action: event => {
        //         event.preventDefault()
        //         CommandsController.toggleBoldMark(editor)
        //     }
        // },
        // {
        //     icon: QuoteIcon,
        //     action: event => {
        //         event.preventDefault()
        //         CommandsController.toggleBoldMark(editor)
        //     }
        // },
        // {
        //     icon: ListULIcon,
        //     action: event => {
        //         event.preventDefault()
        //         CommandsController.toggleBoldMark(editor)
        //     }
        // },
        // {
        //     icon: ListOLIcon,
        //     action: event => {
        //         event.preventDefault()
        //         CommandsController.toggleBoldMark(editor)
        //     }
        // },
        // {
        //     icon: ImageIcon,
        //     action: event => {
        //         event.preventDefault()
        //         CommandsController.toggleBoldMark(editor)
        //     }
        // },
        // {
        //     icon: FilmIcon,
        //     action: event => {
        //         event.preventDefault()
        //         CommandsController.toggleBoldMark(editor)
        //     }
        // },

    ]

    const ToolbarSwitchButtons = [
        {
            icon: DropletFillIcon,
            format: 'marker',
            activeColor: '#ff5959',
            color: '#faa2a2',
            value: 'redmark'
        },
        {
            icon: DropletFillIcon,
            format: 'marker',
            activeColor: '#ffe359',
            color: '#faf7a2',
            value: 'yellowmark'
        },
        {
            icon: DropletFillIcon,
            format: 'marker',
            activeColor: '#59ff75',
            color: '#a4faa2',
            value: 'greenmark'
        },
    ]


    const ToolbarMarkWrapper = styled.div`
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100vw;
        z-index: 1;
        background: #fff;
    ` 


    return (
        <ToolbarMarkWrapper
            className="border-bottom border-3 p-3 mb-3"
        >
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

        </ToolbarMarkWrapper>

    )
}
export default EditorToolbar