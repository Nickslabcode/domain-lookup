import ViewContainer from '../hoc/ViewContainer';
import Footer from '../components/Footer';
import SearchForm from '../components/SearchForm';
import Logo from '../components/Logo';
import ShortKeys from '../components/ShortKeys';

const Home = () => {
  return (
    <>
      <ViewContainer>
        <Logo />
        <SearchForm />
      </ViewContainer>
      <ShortKeys />
      <Footer />
    </>
  );
};

export default Home;
