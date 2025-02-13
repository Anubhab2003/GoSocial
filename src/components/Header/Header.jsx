import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  
  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
    { name: 'Your Profile', slug: '/userdashboard', active: authStatus },
  ];

  return (
    <>
      <header className="py-4 fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/10 shadow-lg border-b border-white/20">
        <Container>
          <nav className="flex items-center justify-between px-6">
            <div className="flex items-center">
              <Link to="/">
                <Logo width="70px" />
              </Link>
            </div>
            <ul className="flex space-x-6">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-6 py-2 text-white bg-gray-700 backdrop-blur-md rounded-full transition duration-300 hover:bg-gray-600 hover:shadow-lg"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
      <div className="mt-20"></div>
    </>
  );
}

export default Header;
