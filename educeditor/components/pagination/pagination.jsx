import usePagination from '@mui/material/usePagination';

const Pagination = ({
    className = '',
    page,
    count,
    onChange = f => f,
}) => {

    const { items } = usePagination({ count, page, onChange, });

    return (
        <nav className={className} aria-label="...">
            <ul className="pagination">
                {items.map(({ page, type, selected, onClick, disabled, ...item }, index) => {
                    let children = null;
                    let isDisabledNext = false;
                    let isDisabledPrevious = false;

                    if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                        children = '…';
                        onClick = f => f
                    } else if (type === 'page') {
                        children = page
                    } else {
                        children =
                            type === 'next' ? 'Вперед >'
                                : type === 'last' ? 'Последний'
                                    : type === 'previous' ? '< Назад'
                                        : type

                        if (page === count + 1) {
                            isDisabledNext = true
                            onClick = f => f
                        }

                        if (index === 0 && page === 0) {
                            isDisabledPrevious = true
                            onClick = f => f
                        }
                    }


                    return (
                        <li
                            onClick={onClick}
                            className={`page-item ${selected ? 'active' : ''} ${index === 0 && isDisabledPrevious || type === 'next' && isDisabledNext ? 'disabled' : ''}`}
                            key={index}
                            style={{ cursor: 'pointer' }}
                        >
                            <span className="page-link">{children}</span>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
export default Pagination 