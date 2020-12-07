import React, {Component} from 'react';
import WebView from 'react-native-webview';

// import { Container } from './styles';

class WebViewPage extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name,
  });

  state = {
    repository: this.props.navigation.getParam('repository').html_url,
  }

  render() {
    const { repository } = this.state
    console.tron.log(typeof(repository))
    return <WebView source={{uri: repository}} style={{flex: 1}} />;
  }
}

export default WebViewPage;
