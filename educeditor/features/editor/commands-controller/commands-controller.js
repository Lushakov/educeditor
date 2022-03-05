import { Editor, Text, Transforms } from "slate"

const LIST_TYPES = ['numbered-list', 'bulleted-list']  //Типы блока вида "Список"

export const CommandsController = { 

// ===================================== Работа с текстом ===========================================================

    // Проверка Mark на true/false
    isMarkActive(editor, format) {
      const marks = Editor.marks(editor)
      return marks ? marks[format] === true : false
    },

    // Проверка равенстава mark значению value
    isValueMark(editor, format, value) {
      const marks = Editor.marks(editor)
      return marks ? marks[format] === value : false
    },

    // Проверка наличия mark
    hasMark(editor, format) {
      const marks = Editor.marks(editor)
      if(marks) return marks[format] !== undefined
      else return false
    },

    // Для переключения значения mark
    switchMark({editor, format, value}) {
      const hasMark = CommandsController.hasMark(editor, format)
      console.log('hasMark', hasMark)
      if(hasMark) {
        const isEquals = CommandsController.isValueMark(editor, format, value)
        console.log('isEquals', isEquals)
        console.log('value', value)
        if (isEquals) {
          Editor.removeMark(editor, format)
        } else {
          Editor.addMark(editor, format, value)
        }
      } else {
        Editor.addMark(editor, format, value)
      }
    },

    // Для переключения mark true/false
    toggleMark(editor, format) {
      const isActive = CommandsController.isMarkActive(editor, format)
    
      if (isActive) {
        Editor.removeMark(editor, format)
      } else {
        Editor.addMark(editor, format, true)
      }
    },




// ===================================== Работа с блоками ===========================================================

    isBlockActive(editor, format) {
      const [match] = Editor.nodes(editor, {
        match: n => n.type === format,
      })
    
      return !!match
    },


    toggleBlock({editor, format}){
      const isActive = CommandsController.isBlockActive(editor, format)
      const isList = LIST_TYPES.includes(format)
      console.log('toggleBlock, isActive, isList', isActive, isList, format)
      Transforms.unwrapNodes(editor, {
        match: n => {console.log('n.type', n.type); return  LIST_TYPES.includes(n.type)},
        split: true,
      })
      
      Transforms.setNodes(editor, {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
      })
    
      if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
      }
    },


  
  
    // toggleCodeBlock(editor) {
    //   const isActive = CommandsController.isCodeBlockActive(editor)
    //   Transforms.setNodes(
    //     editor,
    //     { type: isActive ? null : 'code' },
    //     { match: n => Editor.isBlock(editor, n) }
    //   )
    // },
  }