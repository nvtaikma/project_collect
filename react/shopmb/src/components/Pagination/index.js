import Button from '../Button';
import style from './pagination.module.css';
function Pagination({ payload, setPayload, maxItem }) {
    const { limit, page } = payload;
    const totalPage = Math.ceil(maxItem / limit);
    const arr = [];

    const prev = () => {
        if (page > 1) {
            setPayload({ ...payload, page: page - 1 });
        }
    };
    const next = () => {
        if (page < totalPage) {
            setPayload({ ...payload, page: page + 1 });
        }
    };
    const changePage = (newPage) => {
        if (page !== newPage) {
            setPayload({ ...payload, page: newPage });
        }
    };
    for (let index = 1; index <= totalPage; index++) {
        arr.push(index);
    }
    return (
        <div className={style.pagination}>
            <div className={style.pagination_waper}>
                <ul>
                    {page > 1 && (
                        <li>
                            <Button small1 black onClick={prev}>
                                <i className="fa-solid fa-angle-left"></i>
                            </Button>
                        </li>
                    )}
                    {page > 2 && (
                        <li>
                            <span>...</span>
                        </li>
                    )}

                    {arr.map((item) => {
                        if (page < item - 1 || page > item + 1) {
                            return;
                        }
                        return (
                            <li key={item} className={page == item ? style.active : ''}>
                                <Button
                                    small1
                                    black
                                    onClick={() => {
                                        changePage(item);
                                    }}
                                >
                                    {item}
                                </Button>
                            </li>
                        );
                    })}
                    {page < totalPage - 1 && (
                        <li>
                            <span>...</span>
                        </li>
                    )}

                    {page < totalPage && (
                        <li>
                            <Button small1 black onClick={next}>
                                <i className="fa-solid fa-angle-right"></i>
                            </Button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Pagination;
