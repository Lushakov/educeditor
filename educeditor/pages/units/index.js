import MaterialsTabsLayout from "../../components/layouts/materials-tabs-layout/materials-tabs-layout"
import Materials from "../../features/units/units"
import Navbar from "../../features/navbar/navbar"

const UnitsPage = () => {
    return (
        <>
            <Navbar />
            <MaterialsTabsLayout>
                <Materials />
            </MaterialsTabsLayout>
        </>
    )
}
export default UnitsPage