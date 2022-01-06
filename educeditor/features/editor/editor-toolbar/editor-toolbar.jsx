import { CommandsController } from "../commands-controller/commands-controller"
// import { mdiFormatBold } from '@mdi/js';
// import Icon from '@mdi/react';

// import Icon, { Stack } from '@mdi/react';
// import { mdiAccount, mdiBlockHelper } from '@mdi/js';
// import YouTubeIcon from '@material-ui/icons/YouTube';
// import DeleteIcon from '@mui/icons-material/Delete';

const EditorToolbar = ({ editor }) => {
    return (

        <div
            // style={{ background: 'gray' }}
            className="border-bottom border-3 p-3"
        >
            <button
                onMouseDown={event => {
                    event.preventDefault()
                    CommandsController.toggleBoldMark(editor)
                }}
            >
                Bold
            </button>
            <button
                onMouseDown={event => {
                    event.preventDefault()
                    CommandsController.toggleCodeBlock(editor)
                }}
            >
                Code Block
            </button>
            <span>
                {/* <Icon path={mdiFormatBold}
                    size={1}
                    horizontal
                    vertical
                    rotate={90}
                    color="red" /> */}
                {/* <DeleteIcon/> */}
                    
            </span>
        </div>
    )
}
export default EditorToolbar