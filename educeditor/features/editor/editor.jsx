import React, { useCallback, useMemo, useState } from 'react'

import { createEditor, Editor, Transforms } from 'slate'

import { Slate, Editable, withReact, DefaultElement } from 'slate-react'
import { handleKeyDown } from './handle-key-down'
import { renderElement } from './elements/render-element'
import { renderLeaf } from './render-leaf'
import Toolbar from '../toolbar/toolbar'



const EditorApp = () => {
    // const editor = useMemo(() => withReact(createEditor()), [])
    const [editor] = useState(() => withReact(createEditor()))

    const [value, setValue] = useState(
        process.browser && JSON.parse((localStorage.getItem('content')))
        || [
            {
                type: 'paragraph',
                children: [{ text: 'A line of text in a paragraph.' }],
            },
        ])

    const memoRenderElement = useCallback(renderElement, [])
    const memoRenderLeaf = useCallback(renderLeaf, [])

    return (
        <>

            <Slate
                editor={editor}
                value={value}
                onChange={value => {
                    setValue(value)

                    const isAstChange = editor.operations.some(
                        op => 'set_selection' !== op.type
                    )
                    if (isAstChange) {
                        const content = JSON.stringify(value)
                        localStorage.setItem('content', content)
                    }
                }}
            >
                <Toolbar/>
                <Editable
                    className="p-3 bg-white shadow-sm"
                    renderElement={memoRenderElement}
                    renderLeaf={memoRenderLeaf}
                    onKeyDown={(event) => handleKeyDown({ event, editor })}
                />
            </Slate>
        </>
    )
}

export default EditorApp