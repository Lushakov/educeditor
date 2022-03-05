import { useRouter } from "next/router"
import MaterialId from "../../features/materials/material-id"

const MaterialIdPage = () => {
    const router = useRouter()
    const { pid } = router.query

    return (
        <div style={{ background: '#f8f9fa', width: '100%', }}>
            <MaterialId pid={pid}/>
        </div>
    )
}
export default MaterialIdPage