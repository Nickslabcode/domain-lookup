import ViewContainer from '../hoc/ViewContainer';
import Footer from '../components/Footer';
import SearchForm from '../components/SearchForm';
import Logo from '../components/Logo';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Meta from '../hoc/Meta';

const Home = () => {
  const [_searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return (
    <>
      <Meta />
      <ViewContainer>
        <Logo />
        <SearchForm />
      </ViewContainer>
      <Footer />
    </>
  );
};

export default Home;
