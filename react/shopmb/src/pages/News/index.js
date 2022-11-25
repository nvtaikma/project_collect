import { useState } from 'react';
import Path from '../../components/Path';
import MenuTop from './components/MenuTop';
import MainConTent from './components/MainContent';
function News() {
    const [payload, setPayload] = useState({
        status: '0',
        limit: 6,
        page: 1,
    });
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

export default News;
