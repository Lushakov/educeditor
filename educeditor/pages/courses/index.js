import MaterialsTabsLayout from "../../components/layouts/materials-tabs-layout/materials-tabs-layout"
import Lessons from "../../features/lessons/lessons"
import Navbar from "../../features/navbar/navbar"

const CoursesPage = () => {
    return (
        <>
            <Navbar />
            <MaterialsTabsLayout>
                <Lessons />
            </MaterialsTabsLayout>
        </>
    )
}
export default CoursesPage