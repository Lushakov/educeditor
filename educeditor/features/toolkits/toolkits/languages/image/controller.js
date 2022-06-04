import { Editor, Text, Transforms } from "slate"

export const insertImage = (editor, url) => {
    const text = { text: '' }
    const image = {
        type: 'image',
        url,
        id: Math.random(),
        children: [text]
    }
    // Transforms.insertNodes(editor, image)
    Transforms.setNodes(editor, image)
}

export const changeNodeById = ({ editor, id, params }) => {
    Transforms.setNodes(
        editor,
        params,
        {
            match: n => n?.id === id
        }
    )
}