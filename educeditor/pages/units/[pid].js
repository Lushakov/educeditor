import { useRouter } from "next/router"
import Unit from "../../features/units/unit/unit"

const UnitPage = () => {
    const router = useRouter()
    const { pid } = router.query

    return (
        <div style={{ background: '#f8f9fa', width: '100%', }}>
            <Unit pid={pid}/>
        </div>
    )
}
export default UnitPage