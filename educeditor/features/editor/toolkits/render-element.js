import CodeElement from './base/code-element/code-element'
import DefaultElement from './base/default-element/default-element'
import Image from './base/image/image'

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

const PathList = [
    'languages/image'
]

// const getRenderElement = async({ PathList }) => {
//     const tools = []



//     for (let i = 0; i < PathList.length; i++) {
//         try {
//             const result = await import(path);
//             tools.push(result)
//         } catch (err) {

//         }
//     }

//     return (props) => {

//     }

// }