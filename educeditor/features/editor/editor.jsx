// Import React dependencies.
import React, { useCallback, useMemo, useState } from 'react'
// Import the Slate editor factory.
import { createEditor, Editor, Transforms } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, DefaultElement } from 'slate-react'
import CodeElement from './elements/code-element/code-element'
import { handleKeyDown } from './handle-key-down'
import { renderElement } from './elements/render-element'
import { renderLeaf } from './render-leaf'
import { CommandsController } from './commands-controller/commands-controller'
import EditorToolbar from './editor-toolbar/editor-toolbar'
// import { renderElement } from './elements/renderElement'




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
            <EditorToolbar
                editor={editor}
            />
            <Slate
                editor={editor}
                value={value}
                onChange={value => {
                    setValue(value)

                    const isAstChange = editor.operations.some(
                        op => 'set_selection' !== op.type
                    )
                    if (isAstChange) {
                        // Save the value to Local Storage.
                        const content = JSON.stringify(value)
                        localStorage.setItem('content', content)
                    }
                }}
            >
                <Editable
                    className="p-3"
                    renderElement={memoRenderElement}
                    renderLeaf={memoRenderLeaf}
                    onKeyDown={(event) => handleKeyDown({ event, editor })}
                />
            </Slate>
        </>
    )
}

export default EditorApp