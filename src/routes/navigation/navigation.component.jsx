import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './navigation.styles.scss';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';

const Navigation = () => {

  const isCartOpen = useSelector(selectIsCartOpen);

  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  const handleSigOutUser = async () => {
    dispatch(signOutStart());
  }

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className="logo" />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {
            currentUser ? 
              <span className='nav-link' onClick={handleSigOutUser}>SIGN OUT</span> :
              <Link className='nav-link' to='/auth'>SIGN IN</Link>
          }
          <Link className='nav-link' to='/about'>
            ABOUT
          </Link>
          <CartIcon />
        </div>
        { isCartOpen && <CartDropdown /> }
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
