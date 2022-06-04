import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { createEditor, Editor, Transforms } from 'slate'

import { Slate, Editable, withReact, DefaultElement } from 'slate-react'
import { handleKeyDown } from './handle-key-down'
// import { renderElement } from './toolkits/render-element'
import { renderLeaf } from './render-leaf'
import Toolbar from '../toolbar/toolbar'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentSlice, changeCurrentSliceData, selectUnit } from '../units/_feature/units-slice'
import { withHistory } from 'slate-history'
import { withImages } from './hocs/with-images'
import { baseRenderElement, getRenderElement } from '../../features/toolkits/toolkits/render-element'
import Spiner from '../../components/spiner/spiner'




const EditorApp = ({ toolPathList, trigger }) => {
    const dispatch = useDispatch()
    const currentSlice = useSelector(selectCurrentSlice)
    // const editor = useMemo(() => withReact(createEditor()), [])
    // const [editor] = useState(() => withReact(createEditor()))
    const [editor] = useState(() => withImages(withHistory(withReact(createEditor()))))
    // const memoRenderElement = useCallback(renderElement, [])
    const memoRenderLeaf = useCallback(renderLeaf, [])

    const unit = useSelector(selectUnit)
    const [renderElement, setRenderElement] = useState(null)

    useEffect(async () => {
        if (!toolPathList) return
        try {
            const result = await getRenderElement(toolPathList)
            setRenderElement({ func: result })
        } catch (err) {
            console.log(err)
        }
    }, [toolPathList])

    useEffect(() => {
        console.log('смена слайса')
    }, [trigger])

    return (
        <>
            {currentSlice && renderElement
                ? <Slate
                    editor={editor}
                    value={currentSlice?.data}
                    onChange={value => {
                        dispatch(changeCurrentSliceData(value))
                    }}
                >
                    <Toolbar editor={editor} />
                    <Editable
                        className="p-3 bg-white shadow-sm"
                        renderElement={renderElement.func}
                        renderLeaf={memoRenderLeaf}
                        onKeyDown={(event) => handleKeyDown({ event, editor })}
                    />
                </Slate>

                : <Spiner
                    isSpinning={true}
                    explainText="Загрузка..."
                />
            }
        </>
    )
}

export default EditorApp