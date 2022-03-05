import Navbar from "../navbar/navbar"

const Lessons = () => {
    return (
        <>
        <Navbar />
        <div className="container pt-5">
            <h2 className="mb-3">Список Уроков</h2>

            <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action active" aria-current="true" onClick={() => router.push(Path.MATERIALS + `/${1}`)}>
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small>3 days ago</small>
                    </div>
                    <p className="mb-1">Some placeholder content in a paragraph.</p>
                    <small>And some small print.</small>
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small className="text-muted">3 days ago</small>
                    </div>
                    <p className="mb-1">Some placeholder content in a paragraph.</p>
                    <small className="text-muted">And some muted small print.</small>
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small className="text-muted">3 days ago</small>
                    </div>
                    <p className="mb-1">Some placeholder content in a paragraph.</p>
                    <small className="text-muted">And some muted small print.</small>
                </a>
            </div>
        </div>
    </>
    )
}
export default Lessons