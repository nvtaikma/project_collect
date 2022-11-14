import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Path from '../../../components/Path';
import MenuTop from '../components/MenuTop';
import MainConTent from '../components/MainContent';
function CategoryNewsCl() {
    const { id } = useParams();
    const [payload, setPayload] = useState({
        idCategory: id,
        limit: 4,
        page: 1,
        status: '0',
    });
    useEffect(() => {
        setPayload({ ...payload, idCategory: id });
    }, [id]);
    return (
        <>
            <Path list={[{ _name: 'Tin tức', path: '/tin_tuc' }]} />
            <div className="container">
                <MenuTop />
                <MainConTent payload={payload} setPayload={setPayload} />
            </div>
        </>
    );
}

export default CategoryNewsCl;
