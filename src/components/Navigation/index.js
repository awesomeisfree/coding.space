import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthUserContext, withAuthentication } from '../Session';
import LazyImage from '../LazyImage';
import logo from './logo.png'

class Navigation extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  render(){
    const {authUser} = this.props;
    const {pathname} = this.props.location;
    if(authUser)
      return (
        <>
        <Link className="logo" to={ROUTES.LANDING}><img src={logo} /></Link>
        <div className="nav">
            <Link to={ROUTES.NEW_PROJECT}>New Project</Link>
            <Link to={ROUTES.CLASSES}>My Classes</Link>       
            <Link to={ROUTES.JETFURL}>Jet Fuel</Link>      
            {!!authUser.roles[ROLES.ADMIN] && (
                <Link to={ROUTES.NEW_USER}>New User</Link>            
              )}
            {!!authUser&&(
            <div className="dropdown">
              <div id="menu" className={this.props.showNav ? "highlight" : null}> 
                {!!authUser.ThumbnailFilename &&(
                <LazyImage file={this.props.firebase.storage.ref('/public/' + authUser.key + '/' + authUser.ThumbnailFilename)}/>)}
                <div>{authUser.Username}</div>
            </div>
          </div>
            )} 
          <div className={this.props.showNav ? "showMenu" : "hideMenu"}> 
            <Link to={'/profile/' + authUser.uid}>My Account</Link>
            {(!!authUser.roles[ROLES.ADMIN] || !!authUser.roles[ROLES.TEACHER]) && (
              <Link to={ROUTES.RESOURCE_HOME}>Resources</Link>
            )}
            <Link to={'/launchpad'}>Launch Pad</Link>
            <SignOutButton />
          </div>
       
        </div>
        </>
      )
    return (
      <>
      <Link className="logo" to={ROUTES.LANDING}><img src={logo} /></Link>
      <div className="nav">
          {pathname != '/signin' && (
          <Link to={ROUTES.SIGN_IN}><span className="signIn">Sign In</span></Link>
          )}
        </div>
        </>
      )
  }
}




export default withAuthentication(Navigation);