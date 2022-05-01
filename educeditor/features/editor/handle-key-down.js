import { Editor, Text, Transforms } from "slate"
import { CC } from "./commands-controller/commands-controller"

export const handleKeyDown = ({ event, editor }) => {
  if (!event.ctrlKey) {
    return
  }

  // Replace the `onKeyDown` logic with our new commands.
  switch (event.key) {
    case '`': {
      event.preventDefault()
      CC.toggleCodeBlock(editor)
      break
    }

    case 'b': {
      event.preventDefault()
      CC.toggleBoldMark(editor)
      break
    }
  }
}