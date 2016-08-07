/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import Card from 'material-ui/Card/Card'
import CardMedia from 'material-ui/Card/CardMedia'
import CardTitle from 'material-ui/Card/CardTitle'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PusherClient from 'pusher-js';


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
    backgroundColor: '#0ee851'
  },
  fullscreen: {
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    backgroundColor: '#0eb6e8'

},
  footer:{
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    height: '12.5%',
    left: 0,
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#054355'
  },
  footerText:{
  marginTop: 30,
    color: 'white'
},
  leftText: {
    textAlign: 'left'
  },
  leftCardDiv: {
    float: 'left',
    width: '47%',
  },
  centerText:{
    float: 'left',
    width: '6%',
    marginTop: '14%',
    color: 'white',
  },
  whiteText:{
  color: 'white',
    paddingTop: 425,
},
  rightCardDiv: {
    float: 'left',
    width: '47%',
  },
  leftCard: {
    marginLeft: 20,
    marginTop: 20,
    marginRight: 10,
    marginBottom: 20,

  },
  rightCard: {
    marginLeft: 10,
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  textContainer: {
    top: 500,
  }
,
  white:{
    color: 'white',
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const pusher = new PusherClient('0a77f43c6b61814e9d27', {
  encrypted: true
});


class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
      first: {title: "", subtitle: "", url:""},
      second: {title: "", subtitle: "", url:""},
      showHandshake: false,
      showLinkedin: false,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
      first: {title: "Emanuele", subtitle: "Di Vizio", url:"http://lorempixel.com/600/337/nature/"},
      second: {title: "Andrea", subtitle: "D'Olimpio", url:"http://lorempixel.com/600/337/nature/"},
      showHandshake: true,
      showLinkedin: false,
    })
  }

  handleTouchTap() {
    this.setState({
      open: false,
      first: {title: "", subtitle: "", url:""},
      second: {title: "", subtitle: "", url:""},
      showHandshake: false,
      showLinkedin: false,
    });
  }
  
  componentDidMount(){
    var top = this;
    var channel = pusher.subscribe('handshakechannel');
    channel.bind('first', function(data) {
      top.setState({
        open: false,
        first: {title: "Walter", subtitle: "White", url:"../www/walter.jpg"},
        second: {title: "", subtitle: "", url:""},
        showHandshake: false,
        showLinkedin: false,
      })
    });
    channel.bind('handshake', function(data){
      top.setState({
        open: false,
        first: {title: "Walter", subtitle: "White", url:"../www/walter.jpg"},
        second: {title: "Jessie", subtitle: "Pinkman", url:"http://lorempixel.com/600/337/nature/"},
        showHandshake: true,
        showLinkedin: false,
      })
    });
    channel.bind('follow', function(data){
      top.setState({
        open: false,
        first: {title: "Walter", subtitle: "White", url:"http://lorempixel.com/600/337/nature/"},
        second: {title: "Jessie", subtitle: "Pinkman", url:"http://lorempixel.com/600/337/nature/"},
        showHandshake: true,
        showLinkedin: true,
      })
    });
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
        <div style={styles.fullscreen}>
          <AppBar title="Pebbleshake" titleStyle={styles.leftText}></AppBar>
          <Dialog
            open={this.state.showLinkedin}
            title="And now..."
            actions={standardActions}
            onRequestClose={this.handleRequestClose}
          >
            They are connected on linkedin! ;)
          </Dialog>
          <div style={styles.leftCardDiv}>

            <Card style={styles.leftCard}>
              <CardMedia overlay={
                  <CardTitle title={this.state.first.title} subtitle={this.state.first.subtitle}/>
                }>
                <img src={this.state.first.url}/>
                
              </CardMedia></Card>
          </div>
          {this.state.second.title != "" ? <h1 style={styles.centerText}> & </h1> : <h1></h1>}
          <div style={styles.rightCardDiv}>

            <Card style={styles.rightCard}>
              <CardMedia overlay={
                  <CardTitle title={this.state.second.title} subtitle={this.state.second.subtitle}/>
                }>
                <img src={this.state.second.url}/>
               
              </CardMedia></Card>
          </div>
          <div style={styles.textContainer}>
            {this.state.showHandshake ? <h2 style={styles.whiteText}>Shook their hands!</h2> : <h2></h2>}

          </div>
        </div>
        <div style={styles.footer}>
          <h3 style={styles.footerText}>Made with ♥ by Pebbleshake team. Powered by <b>Pusher</b> and ReactJS (Learnt today, with an hour of sleep, we do apologize for any glitches...)</h3>
        </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;

