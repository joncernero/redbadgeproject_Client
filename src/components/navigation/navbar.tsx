import React, { Component } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import {
  NavbarDiv,
  MenuBars,
  NavMenuItems,
  NavbarToggle,
  Span,
} from '../../styled/Nav';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface State {
  sidebarOpen: boolean;
}

interface Props extends RouteComponentProps {
  SessionToken: string;
  clearToken: () => void;
}

class Navbar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
  }

  private toggleSidebar = () =>
    this.setState((prevState) => ({
      ...prevState,
      sidebarOpen: !prevState.sidebarOpen,
    }));

  render() {
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <NavbarDiv>
            <Link to='#'>
              <MenuBars>
                <FaIcons.FaBars onClick={this.toggleSidebar} />
              </MenuBars>
            </Link>
            <Link to='/dashboard'>
              <h1>diligence</h1>
            </Link>
            {localStorage.getItem('token') ? (
              <button
                onClick={() => {
                  this.props.clearToken();
                  this.props.history.push('/');
                }}>
                Logout
              </button>
            ) : (
              <button>
                <Link to='/login'>Login</Link>
              </button>
            )}
          </NavbarDiv>
          <nav
            className={this.state.sidebarOpen ? 'nav-menu active' : 'nav-menu'}>
            <NavMenuItems onClick={this.toggleSidebar}>
              <NavbarToggle>
                <MenuBars>
                  <Link to='#'>
                    <AiIcons.AiOutlineClose />
                  </Link>
                </MenuBars>
              </NavbarToggle>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <Span>{item.title}</Span>
                    </Link>
                  </li>
                );
              })}
            </NavMenuItems>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
}

export default withRouter(Navbar);
