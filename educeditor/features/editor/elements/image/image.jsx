import { Editor, Text, Transforms } from "slate"
import { useEffect } from "react"
import styled from "styled-components"

import {
    Slate,
    Editable,
    useSlateStatic,
    useSelected,
    useFocused,
    withReact,
} from 'slate-react'
import { CC } from "../../commands-controller/commands-controller"

const Img = styled.img`
    display: block;
    max-width: 100%;
    max-height: 20em;
    box-shadow: ${({ selected, focused }) => selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
`

const ImageWeapper = styled.div`
    display: flex;
    justify-content: ${({justifyContent}) => justifyContent || 'flex-start'};
`
// const ImageWeapper = styled.div`
//     display: flex;
//     justify-content: ${({justifyContent}) => justifyContent || 'flex-start'};
// `


const Image = ({ attributes, children, element }) => {
    const selected = useSelected()
    const focused = useFocused()
    const editor = useSlateStatic()

    const {
        id,
        justifyContent
    } = element

    useEffect(() => console.log('element', element), [justifyContent])

    const chengeParams = params => CC.changeNodeById({ editor, id: element?.id,  params})
    return (
        <div {...attributes}>
            <ImageWeapper
                key={id}
                contentEditable={false}
                style={{ userSelect: "none" }}
                justifyContent={justifyContent}
            >
                
                <Img
                    src={element.url}
                    selected={selected}
                    focused={focused}
                    onClick={() => chengeParams({justifyContent: justifyContent === 'flex-start' ? 'center' : 'flex-start'})}
                />
            </ImageWeapper>
            {children}
        </div>
    )
}
export default Image