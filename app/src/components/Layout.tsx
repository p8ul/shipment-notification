import React from 'react';
import Header from './Header';

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <div className='container'>
      <header>
        <Header />
      </header>

      <nav></nav>

      <main>
        <div className='main-content'>
          <div className='main-content__products'>{children}</div>
        </div>
      </main>

      <aside></aside>

      <footer></footer>
    </div>
  );
};

export default Layout;
