import React, { Component } from "react";
import { Link,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button"
import { oauthsignin, logout } from "../../actions/auth";

class GoogleAuth extends Component {
  // reference to state has been removed

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          //client_id: process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID,
          client_id:'531378222581-ol1dfe609kc7juc2oe04tggqctub1egp.apps.googleusercontent.com',
          scope: 'email',
          
        })
        .then(() => {
          // create auth variable

          this.auth = window.gapi.auth2.getAuthInstance();
          //console.log(this.auth)
          // can now use logic of onAuthChange for initial render
          this.onAuthChange(this.auth.isSignedIn.get());
          // listen for changes to authentication status
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  

  // triggered when authentication status changes
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      const email=this.auth.currentUser.get().getBasicProfile().Wt
      const name=this.auth.currentUser.get().getBasicProfile().dV+" "+this.auth.currentUser.get().getBasicProfile().fT
      this.props.oauthsignin({email,name});
    } else {
      this.props.logout();
    }
  };

  // manually trigger GAPI auth change
  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
    logout()
  };

  authRedirection=()=>{
    if (this.props.gloginstatus) {
      return <Redirect to='/home' />
   }
  }

  // helper function
  renderAuthButton() {
    {this.authRedirection()}
    if (this.props.gloginstatus) {
      return (
        <Button className="bg-red" onClick={this.onSignOutClick} type='button' size="sm">
        <i className='fa fa-sign-out color-white' aria-hidden='true'></i> Sign Out
      </Button>
      );
   }
 else {
      return (
        <Button variant='primary' onClick={this.onSignInClick} type='button' >
        <i className='fa fa-google' aria-hidden='true'></i> Google
      </Button>
      );
    }
  }

  render() {
    return (
      <Link to="/" className="item">
        {this.renderAuthButton()}
      </Link>
    );
  }
}

const mapStateToProps = (state) => {
  return { gloginstatus: state.auth.gloginstatus };
}

export default connect(mapStateToProps, { oauthsignin, logout })(GoogleAuth);