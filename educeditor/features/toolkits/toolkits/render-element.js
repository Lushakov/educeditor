import CodeElement from './base/code-element/code-element'
import DefaultElement from './base/default-element/default-element'
import Image from './base/image/image'

// export const renderElement = props => {
//     switch (props.element.type) {
//         case 'code':
//             return <CodeElement {...props} />
//         case 'bulleted-list':
//             return <ul {...props.attributes}>{props.children}</ul>
//         case 'numbered-list':
//             return <ol {...props.attributes}>{props.children}</ol>
//         case 'list-item':
//             return <li {...props.attributes}>{props.children}</li>
//         case 'image':
//             return <Image {...props} />
//         default:
//             return <DefaultElement {...props} />
//     }
// }

//return renderElement with base modules only
export const baseRenderElement = props => {
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


//return renderElement with base modules and dynamic loaded modules
export const getRenderElement = async (PathList) => {
    const tools = {}

    if (PathList?.length) {
        for (let i = 0; i < PathList.length; i++) {
            try {
                const result = await import(`./${PathList[i]}`);
                tools[PathList[i]] = result
            } catch (err) {
                console.log('Ошибка загрузки модуля', err)
            }
        }
    }

    return props => {
        const Module = tools[props.element.type]
        if (Module)
            return <Module {...props}>{props.children || null}</Module>

        return baseRenderElement(props)
    }
}