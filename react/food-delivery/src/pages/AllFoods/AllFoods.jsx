import React, { useEffect, useState } from 'react';
import './AllFoods.scss';
import Helmet from '../../component/Helmet/Helmet';
import SectionFoods from '../../component/UI/sectionFoods/SectionFoods';

import SearchIcon from '@mui/icons-material/Search';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import products from '../../assets/fake-data/products';
import ProductCard from '../../component/UI/productCard/ProductCard';
import { useRef } from 'react';
import useDebounce from '../../component/hooks/useDebounce';
import ReactPaginate from 'react-paginate';

const AllFoods = () => {
  const [select, setSelect] = useState('');
  const [allProducts, setAllProducts] = useState(products);

  const [searchValue, setSearchValue] = useState('');
  const [pageNumber, setPageNumber] = useState(0);

  const focusRef = useRef();
  const debounce = useDebounce(searchValue, 500);

  // filter price
  useEffect(() => {
    if (select === 'default') {
      setAllProducts(products);
    }
    if (select === 'hight-price') {
      const filterPriceHight = products.filter((item) => item.price >= 50);
      setAllProducts(filterPriceHight);
    }
    if (select === 'low-price') {
      const filterPriceLow = products.filter((item) => item.price <= 50);
      setAllProducts(filterPriceLow);
    }
  }, [select]);

  // Paginnate
  const productPerPage = 8;
  const visitedPage = pageNumber * productPerPage;

  // filter value input
  const searchProduct = allProducts.filter((item) => {
    if (debounce.value === '') {
      return item;
    }
    if (item.title.toLowerCase().includes(debounce.toLowerCase())) {
      return item;
    } else {
      return console.log('not find');
    }
  });

  const displayPage = searchProduct.slice(visitedPage, visitedPage + productPerPage);
  const pageCount = Math.ceil(searchProduct.length / productPerPage);

  const changedPages = ({ selected }) => {
    setPageNumber(selected);
  };

  // Handle
  const HandleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
    return;
  };

  const HandleCloseValue = () => {
    setSearchValue('');
    focusRef.current.focus();
  };

  return (
    <Helmet title="All-Foods">
      {/* IMG background */}
      <SectionFoods title="All Foods" />

      <section>
        <Container>
          <Row className="mb-5">
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="AllFoods__search d-flex align-items-center justify-content-between w-100 ">
                <div className="d-flex justify-content-between align-items-center">
                  <input
                    type="text"
                    placeholder="I'm looking for...."
                    ref={focusRef}
                    value={searchValue}
                    onChange={HandleChange}
                  />
                  {!!searchValue && <CloseOutlinedIcon className="icon__close mx-3" onClick={HandleCloseValue} />}
                </div>

                <span>
                  <SearchIcon className="icon__search" />
                </span>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="sorting__widgets">
                <Form.Select value={select} onChange={(e) => setSelect(e.target.value)}>
                  <option value="default">Default</option>
                  <option value="hight-price">Hight-Price</option>
                  <option value="low-price">Low-Price</option>
                </Form.Select>
              </div>
            </Col>
          </Row>

          <Row>
            {displayPage.map((item, index) => (
              <Col key={index} lg={3} md={4} sm={6} xs={12} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))}

            {/* PAGINATE */}
            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changedPages}
                previousLabel="Prev"
                nextLabel="Next"
                containerClassName="paginate-btns"
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
