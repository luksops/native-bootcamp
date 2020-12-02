import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {Container, Input, SubmitButton, Form} from './styles';
import api from '../../services/api';

import Icon from 'react-native-vector-icons/MaterialIcons';

// import { Container } from './styles';

class Main extends Component {
  state = {
    newUser: '',
    users: [],
  };

  handleAddUser = async () => {
    console.tron.log(this.state);
    const {newUser, users} = this.state;

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
    });

    Keyboard.dismiss();
  };

  render() {
    const {newUser, user} = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCapitalize="none"
            placeholder="Add User"
            autoCorrect={false}
            value={newUser}
            onChangeText={(text) => this.setState({newUser: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#fff" />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}

Main.navigationOptions = {
  title: 'Main',
};

export default Main;
