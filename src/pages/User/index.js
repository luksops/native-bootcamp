import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Header,
  Avatar,
  Bio,
  Name,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';
import {Pressable} from 'react-native';
import api from '../../services/api';
import {ActivityIndicator} from 'react-native';

// import { Container } from './styles';

class User extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    user: null,
    star: [],
    page: 1,
    loading: false,
    loadingNewPages: false,
    refreshing: false,
  };

  componentDidMount() {
    this.loadFirstPage();
  }

  loadFirstPage = async () => {
    this.setState({
      loading: true,
    });

    const {page} = this.state;
    const {navigation} = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred?page=${page}`);

    this.setState({
      user: user,
      star: response.data,
      loading: false,
      refreshing: false,
    });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
        page: 1,
        star: [],
      },
      this.loadFirstPage,
    );
  };

  handleEndReached = async () => {
    this.setState({
      loadingNewPages: true,
    });
    const {user, page, star} = this.state;

    let newPage = page + 1;
    const response = await api.get(
      `/users/${user.login}/starred?page=${newPage}`,
    );

    this.setState({
      page: newPage,
      star: [...star, ...response.data],
      loadingNewPages: false,
    });
  };

  handleNavigate = (repository) => {
    const {navigation} = this.props;

    navigation.navigate('WebViewPage', {repository});
  };

  render() {
    const {navigation} = this.props;
    const user = navigation.getParam('user');

    const {star, loading, loadingNewPages, refreshing} = this.state;

    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Container>
            <ActivityIndicator color="#7159c1" size={60} />
          </Container>
        ) : (
          <Stars
            onRefresh={this.handleRefresh}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.handleEndReached}
            data={star}
            keyExtractor={(star) => String(star.id)}
            renderItem={({item}) => (
              <Pressable onPress={() => this.handleNavigate(item)}>
                <Starred>
                  <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                  <Info>
                    <Title> {item.name} </Title>
                    <Author> {item.owner.login} </Author>
                  </Info>
                </Starred>
              </Pressable>
            )}
          />
        )}

        {loadingNewPages ? <ActivityIndicator color="#7159c1" /> : <></>}
      </Container>
    );
  }
}

export default User;
