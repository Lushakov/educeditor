import { Editor, Text, Transforms } from "slate"
import { CommandsController } from "./commands-controller/commands-controller"

export const handleKeyDown = ({ event, editor }) => {
  if (!event.ctrlKey) {
    return
  }

  // Replace the `onKeyDown` logic with our new commands.
  switch (event.key) {
    case '`': {
      event.preventDefault()
      CommandsController.toggleCodeBlock(editor)
      break
    }

    case 'b': {
      event.preventDefault()
      CommandsController.toggleBoldMark(editor)
      break
    }
  }
}