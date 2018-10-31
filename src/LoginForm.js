import React, {Component} from 'react';
import { Alert, TextInput } from 'react-native';
import firebase from 'firebase';
import Button from './Button';
import Card from './Card';
import CardSection from './CardSection';
import Spinner from './Spinner';


class LoginForm extends Component {
  state={ email: '', password: '', loading: false };
  clickLogin() {
    this.setState({ loading: true });
    const { email, password } = this.state;

    if(email === '' || password === ''){
      this.setState({ loading: false });
      Alert.alert(
        'Mesaj',
        'Her iki alanda dolu olmalıdır!',
        [
          { text: 'Tamam', onPress: () => null }
        ]
      );
    }else {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.loginSucces.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(this.loginSucces.bind(this))
        .catch(this.loginFail.bind(this))
      });
    }
    
    
  }
  loginSucces() {
    console.log('başarılı');
    this.setState({ loading: false });      
  }

  loginFail() {
    console.log('hatalı');
    this.setState({ loading: false });
    Alert.alert(
      'Mesaj',
      'Kullanıcı adı veya şifreniz hatalı!',
      [
        { text: 'Tamam', onPress: () => null }
      ]
    );
  }

  renderButton() {
    if(!this.state.loading) {
      return <Button onPress={this.clickLogin.bind(this)}>GİRİŞ </Button>;
    }
    return <Spinner size="small" />;
  }

  render() {
    const { inputStyle } = styles;
    return(
      <Card>
         <CardSection>
           <TextInput
            placeholder="E-mail"
            style={inputStyle}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
           />
         </CardSection>

         <CardSection>
           <TextInput
            secureTextEntry
            placeholder="Password"
            style={inputStyle}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
           />
         </CardSection>

         <CardSection>
           {this.renderButton()}
         </CardSection>
       </Card>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 1
  },
};

export default LoginForm;
