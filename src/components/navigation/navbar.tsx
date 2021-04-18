import React, { Component } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebardata';
import { IconContext } from 'react-icons';

interface State {
  sidebarOpen: boolean;
}

export class Navbar extends Component<{}, State> {
  state = {
    sidebarOpen: false,
  };
  private toggleSidebar = () =>
    this.setState((prevState) => ({
      ...prevState,
      sidebarOpen: !prevState.sidebarOpen,
    }));

  render() {
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={this.toggleSidebar} />
            </Link>
          </div>
          <nav
            className={this.state.sidebarOpen ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={this.toggleSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
}

export default Navbar;
