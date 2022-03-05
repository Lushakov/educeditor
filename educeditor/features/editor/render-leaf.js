import styled from "styled-components"

// export const renderLeaf = props => {
//     return (
//         <span
//             {...props.attributes}
//             style={{ 
//                 fontWeight: props.leaf.bold ? 'bold' : 'normal',
//                 fontStyle: props.leaf.italic ? 'italic' : 'normal'
//             }}
//         >
//             {props.children}
//         </span>
//     )
// }


const Leaf = styled.span.attrs(props => ({ ...props.attributes }))
    `
    font-weight: ${props => props.leaf.bold ? 'bold' : 'normal'};
    font-style:  ${props => props.leaf.italic ? 'italic' : 'normal'};
    /* text-decoration: ${props => props.leaf.underline ? 'underline' : 'none'}; */
    text-decoration: ${props => props.leaf.strikethrough ? 'line-through' : 'none'};
    background: ${props => {
        if(props.leaf.marker) {
            switch (props.leaf.marker) {
                case 'redmark': return '#ff5959'
                case 'yellowmark': return '#ffe359'
                case 'greenmark': return '#59ff75'
                default: return 'none'
            }
        } else {
            return 'none'
        }
    }};
`

export const renderLeaf = props => <Leaf
    leaf={props.leaf}
    attributes={props.attributes}>
    {props.children}
</Leaf> 