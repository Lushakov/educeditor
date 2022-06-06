import Lessons from "../../features/lessons/lessons"
import Navbar from "../../features/navbar/navbar"

const LessonsPage = () => {
    return (
        <>
            <Navbar />
            <div className="container pt-5">
                <Lessons />
            </div>
        </>
    )
}
export default LessonsPage