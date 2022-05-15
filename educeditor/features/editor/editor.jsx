import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { createEditor, Editor, Transforms } from 'slate'

import { Slate, Editable, withReact, DefaultElement } from 'slate-react'
import { handleKeyDown } from './handle-key-down'
import { renderElement } from './elements/render-element'
import { renderLeaf } from './render-leaf'
import Toolbar from '../toolbar/toolbar'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentSlice, changeCurrentSliceData } from '../units/_feature/units-slice'
import { withHistory } from 'slate-history'
import { withImages } from './hocs/with-images'





const EditorApp = () => {
    const dispatch = useDispatch()

    const currentSlice = useSelector(selectCurrentSlice)

    // const editor = useMemo(() => withReact(createEditor()), [])
    // const [editor] = useState(() => withReact(createEditor()))
    const [editor] = useState(() => withImages(withHistory(withReact(createEditor()))))

    const memoRenderElement = useCallback(renderElement, [])
    const memoRenderLeaf = useCallback(renderLeaf, [])

    return (
        <>
            {/* TODO если не приходит никакая дата, показывать заглушку */}
            <Slate
                editor={editor}
                value={currentSlice?.data}
                onChange={value => {
                    dispatch(changeCurrentSliceData(value))
                }}
            >
                <Toolbar editor={editor}/>
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