import React from 'react';
import { Link } from 'react-router-dom';
import { routesPaths } from '../constants';

interface IProps {}

const Header: React.FC<IProps> = () => {
  return (
    <div className={'header'}>
      <div>
        <Link to={routesPaths.dashboard.base}>
          <img
            src='https://www.postscript.io/wp-content/uploads/2019/01/ps-logo2.png'
            alt='postscript'
          />
        </Link>{' '}
      </div>
    </div>
  );
};

export default Header;
