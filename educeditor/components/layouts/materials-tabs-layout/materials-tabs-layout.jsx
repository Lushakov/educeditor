import { useRouter } from "next/router"
import { MaterialsPath } from "../../../libs/const-path"


const TabList = [
    {
        path: MaterialsPath.UNITS,
        name: 'Темы уроков'
    },
    {
        path: MaterialsPath.COURSES,
        name: 'Курсы'
    },
    {
        path: MaterialsPath.TOOLS,
        name: 'Инструменты'
    },

]

const MaterialsTabsLayout = ({ children }) => {
    const router = useRouter()
    return (
        <div className="container pt-5">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                {
                    TabList.map(({ path, name }) => (
                        <li class="nav-item" role="presentation">
                            <button
                                className={`nav-link ${router.asPath.includes(path) ? 'active' : ''}`}
                                onClick={() => router.push(path)}
                                id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                                role="tab" aria-controls="home" aria-selected="true"
                            >
                                {name}
                            </button>
                        </li>
                    ))
                }
            </ul>
            <div>
                {children}
            </div>
        </div>
    )
}
export default MaterialsTabsLayout