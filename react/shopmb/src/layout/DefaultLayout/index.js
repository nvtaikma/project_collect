import Header from './Header';
import Footer from './Footer';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
