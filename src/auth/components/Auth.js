import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Card, CardActions } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import LockIcon from 'material-ui/svg-icons/action/lock-outline'
import { cyan500, pinkA200 } from 'material-ui/styles/colors'
import { Tabs, Tab } from 'material-ui/Tabs';

import RegistrationForm from './RegistrationForm'
import LoginForm from './LoginForm'

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    minWidth: 400
  },
  button: {
    padding: '4px 10px',
    display: 'block',
    marginTop: '20px'
  },
  avatar: {
    margin: '1em',
    textAlign: 'center ',
    display: 'block'
  },
  form: {
    padding: '0 1em 1em 1em'
  },
  input: {
    display: 'flex'
  },
  hint: {
    textAlign: 'center',
    marginTop: '1em',
    color: '#ccc'
  },
  colors: {
    primary1Color: cyan500,
    accent1Color: pinkA200
  }
}

class Auth extends Component {
  constructor() {
    super()
    this.state = {
      name: null,
      tab: "identification"
    }
  }

  changeTab = (value) => {
    this.setState({
      tab: value,
    });
  };

  render() {
    let error
    return (
      <div style={{ ...styles.main, backgroundColor: styles.colors.primary1Color }}>
        <Card style={styles.card} style={{ marginTop: '40px', padding: '10px' }}>
          <div style={styles.avatar}>
            <Avatar backgroundColor={styles.colors.accent1Color} icon={<LockIcon />} style={{ margin: '0 80px'}} size={60} />
          </div>
          <div style={styles.form}>
            <p style={styles.hint}>Fingopay</p>
          </div>
          {error &&
            <Snackbar
              open
              autoHideDuration={4000}
              message={error}
            />}
            <Tabs
               value={this.state.tab}
               onChange={this.changeTab}
            >
              <Tab label="Identification" value="identification">
                <form >
                  { this.props.session.name?
                    <h2>Hi {this.props.session.name}</h2> : (
                      <div>
                        <h2>Using login/ password</h2>
                        <LoginForm onSubmit={this.props.login} />
                        <hr />
                        <h2>Using a finger</h2>
                        <RaisedButton raised style={styles.button} onClick={() => {
                            this.props.indentifyUser()
                          }}
                        >
                          Indentify me
                        </RaisedButton>
                      </div>
                    )
                  }
                </form>
              </Tab>
              <Tab label="Registration" value="registration">
                <RegistrationForm getEnrolmentTemplate={this.props.getEnrolmentTemplate} onSubmit={this.props.registerUser} />
              </Tab>
            </Tabs>
          </Card>
        </div>
    );
  }
}

export default Auth;
