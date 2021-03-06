import * as React from "react";

export interface Props {
  name: string;
  reducerReq?: boolean;
  referenceResource?: string;
  children?: React.ReactElement<Props>[] | React.ReactElement<Props>;
  list?: React.ComponentType<any>;
  create?: React.ComponentType<any>;
  edit?: React.ComponentType<any>;
  view?: React.ComponentType<any>;
  remove?: React.ComponentType<any>;
  icon?: JSX.Element;
}

const Resource = (props: Props) => {
  return (
    <span>&lt;Resource&gt; elements are for configuration only and should not berendered</span>
  );
};

export default Resource;
