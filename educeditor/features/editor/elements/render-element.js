import CodeElement from './code-element/code-element'
import DefaultElement from './default-element/default-element'

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
        default:
            return <DefaultElement {...props} />
    }
}