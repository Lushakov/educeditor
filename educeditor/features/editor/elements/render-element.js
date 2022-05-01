import CodeElement from './code-element/code-element'
import DefaultElement from './default-element/default-element'
import Image from './image/image'

export const renderElement = props => {
    switch (props.element.type) {
        case 'code':
            return <CodeElement {...props} />
        case 'bulleted-list':
            return <ul {...props.attributes}>{props.children}</ul>
        case 'numbered-list':
            return <ol {...props.attributes}>{props.children}</ol>
        case 'list-item':
            return <li {...props.attributes}>{props.children}</li>
        case 'image':
            return <Image {...props} />
        default:
            return <DefaultElement {...props} />
    }
}