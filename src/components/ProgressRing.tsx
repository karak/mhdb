import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RefreshIndicator from 'material-ui/RefreshIndicator';

/** ProgressRing Props */
interface ProgressRingProps {
  /** flag to show or hide */
  loading?: boolean;
}

// tslint:disable-next-line:function-name
export default function ProgressRing({ loading = true }: ProgressRingProps) {
  return (
    <RefreshIndicator left={0} top={0} status={loading ? 'loading' : 'hide'} />
  );
}
