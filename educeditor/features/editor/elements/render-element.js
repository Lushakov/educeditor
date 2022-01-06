import CodeElement from './code-element/code-element' 
import DefaultElement from './default-element/default-element'

export const renderElement = props => {
    switch (props.element.type) {
        case 'code':
            return <CodeElement {...props} />
        default:
            return <DefaultElement {...props} />
    }
}