import { useRouter } from "next/router"
import { useState } from "react"
import { Path } from "../../libs/const-path"



const Navbar = () => {
    const router = useRouter()

    // const [currentBasePath, setCurrentBasePath] = useState(router.asPath.split("/")[1])
    const [currentBasePath, setCurrentBasePath] = useState(router.asPath)



    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Synopbook</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className={`nav-link ${currentBasePath.includes(Path.LESSONS) ? 'active' : ''}`}
                                aria-current="page"
                                href="#"
                                onClick={() => router.push(Path.LESSONS)}
                            >Мои уроки</a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${currentBasePath.includes(Path.MATERIALS) ? 'active' : ''}`}
                                aria-current="page"
                                href="#"
                                onClick={() => router.push(Path.MATERIALS)}
                            >Мои материалы</a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${currentBasePath.includes(Path.STUDENTS) ? 'active' : ''}`}
                                aria-current="page"
                                href="#"
                                onClick={() => router.push(Path.STUDENTS)}
                            >Студенты</a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${currentBasePath.includes(Path.PROFILE) ? 'active' : ''}`}
                                href="#"
                                onClick={() => router.push(Path.PROFILE)}
                            >Личный кабинет</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar