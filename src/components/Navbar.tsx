import Logo from './Logo';
import SearchForm from './SearchForm';

const Navbar = () => {
  return (
    <div className="fixed left-0 right-0 w-full flex items-center gap-4 py-4 justify-center backdrop-blur-md z-10">
      <Logo />
      <SearchForm />
    </div>
  );
};

export default Navbar;
