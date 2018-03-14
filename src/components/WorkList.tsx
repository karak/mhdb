import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { List, ListItem } from 'material-ui/List';
import Work from '../api/Work';

export interface WorkListProps {
  items?: ReadonlyArray<Work>;
}

// tslint:disable-next-line:function-name
export default function WorkList(props: WorkListProps) {
  return (
    <List>
      {(props.items || []).map(x => (
        <ListItem
          key={x.id}
          primaryText={x.body}
          secondaryText={x.author}
          secondaryTextLines={1}
        />
      ))}
    </List>
  );
}
