import React from 'react';
import { View, Text, Image } from 'react-native';
import firebase from 'firebase';
import Header from './src/Header';
import LoginForm from './src/LoginForm';
import CardSection from './src/CardSection';
import Spinner from './src/Spinner';
import Button from './src/Button';



export default class App extends React.Component {
  state={ loggedIn: null };
  componentWillMount() {
    firebase.initializeApp(
      {
        apiKey: 'AIzaSyCdT6Wy8J16v5I0bgiasY2-guXwj0_WYR0',
        authDomain: 'kimlikdogrulama-bd2de.firebaseapp.com',
        databaseURL: 'https://kimlikdogrulama-bd2de.firebaseio.com',
        projectId: 'kimlikdogrulama-bd2de',
        storageBucket: 'kimlikdogrulama-bd2de.appspot.com',
        messagingSenderId: '942580252245'
      }
    );
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      }else {
        this.setState({ loggedIn: false });
      }
    })
  }

  clickLogout() {
    firebase.auth().signOut();
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      return(
        <CardSection>
          <Image
          style={{width: 200, height: 200}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
          />
          <Text style={{ fontWeight:250, height:250}}>meraba</Text>
         <Button onPress={this.clickLogout.bind(this)}> ÇIKIŞ </Button>
         </CardSection>
      );
      case false:
      return(
        <LoginForm />
      ); 
    
      default:
      return(
        <View>
          <Spinner size="large" />
        </View>
      );
        break;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Giriş Ekranı" />
        {this.renderContent()}
      </View>
    );
  }
}
