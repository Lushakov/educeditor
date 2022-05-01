import {
    DropletFillIcon,
    FilmIcon,
    // ImageIcon,
    ListOLIcon,
    ListULIcon,
    QuoteIcon,
    TextColorIcon,
    TypeBoldIcon,
    TypeH1Icon,
    TypeH2Icon,
    TypeItalicIcon,
    TypeStrikethroughIcon,
    TypeUnderlineIcon,
    ImageIcon
} from "./toolbar-icons"

export const ToolbarSwitchButtons = [
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

export const ToolbarMarkButtons = [
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
    //         CC.toggleBoldMark(editor)
    //     }
    // },
    // {
    //     icon: TypeH2Icon,
    //     action: event => {
    //         event.preventDefault()
    //         CC.toggleBoldMark(editor)
    //     }
    // },
    // {
    //     icon: QuoteIcon,
    //     action: event => {
    //         event.preventDefault()
    //         CC.toggleBoldMark(editor)
    //     }
    // },
    // {
    //     icon: ListULIcon,
    //     action: event => {
    //         event.preventDefault()
    //         CC.toggleBoldMark(editor)
    //     }
    // },
    // {
    //     icon: ListOLIcon,
    //     action: event => {
    //         event.preventDefault()
    //         CC.toggleBoldMark(editor)
    //     }
    // },
    // {
    //     icon: ImageIcon,
    //     action: event => {
    //         event.preventDefault()
    //         CC.toggleBoldMark(editor)
    //     }
    // },
    // {
    //     icon: FilmIcon,
    //     action: event => {
    //         event.preventDefault()
    //         CC.toggleBoldMark(editor)
    //     }
    // },

]