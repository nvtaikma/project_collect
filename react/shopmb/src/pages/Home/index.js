import Slider from './components/Slider';
import Service from './components/Service';
import Category from './components/Category';
import FeaturedProducts from './components/FeaturedProducts';
import FeaturedComments from './components/FeaturedComments';
import Blog from './components/Blog';
import Partners from './components/Partners';
function Home() {
    return (
        <>
            <Slider />
            <Service />
            <Category />
            <FeaturedProducts />
            <FeaturedComments />
            <Blog />
            <Partners />
        </>
    );
}

export default Home;
