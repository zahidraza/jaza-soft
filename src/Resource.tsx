import * as React  from 'react';

export interface Props {
  name: string,
  list?: React.ComponentType<any>,
  create?: React.ComponentType<any>,
  edit?: React.ComponentType<any>,
  view?: React.ComponentType<any>,
  delete?: React.ComponentType<any>,
  icon?: React.ComponentType<any>
}

const Resource = (props: Props) => {
  return (<span>&lt;Resource&gt; elements are for configuration only and should not berendered</span>);
}

export default Resource;
