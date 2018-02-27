import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  List,
  ListItem,
} from 'material-ui/List';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import FontIcon from 'material-ui/FontIcon';
import { red500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import search from './search';
import Work from './Work';

// tslint:disable-next-line:variable-name
const ErrorIcon = () => (
  <FontIcon className="material-icons" color={red500}>error</FontIcon>
);

interface WorkListProps {
  items?: ReadonlyArray<Work>;
}

// tslint:disable-next-line:variable-name
const WorkList = (props: WorkListProps) => (
  <List>
    {(props.items || []).map(x => (
      <ListItem
        key={x.id}
        primaryText={x.body}
        secondaryText={x.author}
        secondaryTextLines={1}
      />
    ))}
    />
  </List>
);

interface AppState {
  loading: boolean;
  items: ReadonlyArray<Work>;
  error?: 'LOAD_FAILURE';
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}, context: any) {
    super(props, context);
    this.state = {
      loading: true,
      items: [],
    };
  }

  async componentDidMount() {
    try {
      const result = await search({ kigo: '春の風邪' });
      const newItems = result.items;
      this.setState({
        loading: false,
        items: this.state.items.concat(newItems),
      });
    } catch {
      this.setState({
        loading: false,
        error: 'LOAD_FAILURE',
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <RefreshIndicator
            left={0}
            top={0}
            status={this.state.loading ? 'loading' : 'hide' } />
          <div style={{ display: this.doShowErrorIcon() ? 'auto' : 'none' }}>
            <ErrorIcon /><span>読み込みに失敗しました。</span>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  private doShowErrorIcon() {
    return this.state.error === 'LOAD_FAILURE';
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
