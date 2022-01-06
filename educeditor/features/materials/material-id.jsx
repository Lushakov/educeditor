import EditorApp from "../editor/editor"
import Navbar from "../navbar/navbar"

const MaterialId = () => {
    return (
        <>
            <Navbar />
            <div className="container shadow p-0 mt-4">
                <EditorApp/>
            </div>
        </>
    )
}
export default MaterialId