import ViewContainer from '../hoc/ViewContainer';
import Footer from '../components/Footer';
import SearchForm from '../components/SearchForm';
import Logo from '../components/Logo';

const Home = () => {
  return (
    <>
      <ViewContainer>
        <Logo />
        <SearchForm />
      </ViewContainer>
      <Footer />
    </>
  );
};

export default Home;
