import Logo from './Logo';
import SearchForm from './SearchForm';

const Navbar = () => {
  return (
    <div className="flex items-center gap-4 py-4 justify-center">
      <Logo />
      <SearchForm />
    </div>
  );
};

export default Navbar;
