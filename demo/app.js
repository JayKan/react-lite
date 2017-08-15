import ReactLite from '../lib';
import 'styles.scss';

class ColorWatch extends ReactLite.Component {
  render() {
    const { number } = this.props;
    const color = number % 256;
    return (
      <div
        class="color-watch"
        style={{
          backgroundColor: `rgb(${color}, 0, 0)`,
          height: '50px',
          width: '50px',
        }}
      />
    );
  }
}

class App extends ReactLite.Component {
  constructor(props) {
    console.log('1. constructor()');
    super(props);
    this.state = {
      count: 0,
    };
    setInterval(() => {
      this.setState({
        count: this.state.count + 1,
      });
    });
  }

  componentDidMount() {
    console.log('ComponentDidMount()');
  }

  render() {
    console.log('Render()');
    const { title } = this.props;
    return (
      <div class="main">
        <h1>{ title }</h1>
        <ColorWatch number={ this.state.count } />
        <div class="count">Count: <span>{ this.state.count  }</span></div>
      </div>
    );
  };
}

const AppRoot = document.getElementById('root');
window.addEventListener('click', () => {
  ReactLite.render(
    <App title="ReactLite Demo!!" />,
    AppRoot,
  );
});