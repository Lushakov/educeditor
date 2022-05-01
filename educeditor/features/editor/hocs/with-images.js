import { CC } from "../commands-controller/commands-controller"
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'

const isImageUrl = url => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split('.').pop()
    return imageExtensions.includes(ext)
}


export const withImages = editor => {
    const { insertData, isVoid } = editor

    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element)
    }

    editor.insertData = data => {
        const text = data.getData('text/plain')
        const { files } = data

        if (files && files.length > 0) {
            console.log('Just file')
            for (const file of files) {
                const reader = new FileReader()
                const [mime] = file.type.split('/')

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result
                        console.log('insert img from file. url', url)
                        CC.insertImage(editor, url)
                    })

                    reader.readAsDataURL(file)
                }
            }
        } else if (isImageUrl(text)) {
            console.log('image url')
            CC.insertImage(editor, text)
        } else {
            console.log('Just data')
            insertData(data)
        }
    }

    return editor
}