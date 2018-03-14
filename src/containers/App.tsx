import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import { red500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ProgressRing from '../components/ProgressRing';
import ErrorIcon from '../components/ErrorIcon';
import WorkList from '../components/WorkList';
import search from '../api/search';
import Work from '../api/Work';

interface AppState {
  loading: boolean;
  items: ReadonlyArray<Work>;
  error?: 'LOAD_FAILURE';
}

export default class App extends React.Component<{}, AppState> {
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
          <WorkList items={this.state.items} />
          <ProgressRing loading={this.state.loading} />
          <div style={{ display: this.doShowErrorIcon() ? 'auto' : 'none' }}>
            <ErrorIcon />
            <span>読み込みに失敗しました。</span>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  private doShowErrorIcon() {
    return this.state.error === 'LOAD_FAILURE';
  }
}
