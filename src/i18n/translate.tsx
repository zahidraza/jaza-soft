import * as React from "react";
import * as PropTypes from "prop-types";

const translate = <TOriginalProps extends {}>(
  Component: React.ComponentClass<TOriginalProps> | React.StatelessComponent<TOriginalProps>
) => {
  const result = class TranslatedComponent extends React.Component<TOriginalProps, {}> {
    // Define how your HOC is shown in ReactDevTools
    static displayName = `TranslatedComponent(${Component.displayName || Component.name})`;

    static contextTypes = {
      translate: PropTypes.func.isRequired,
      locale: PropTypes.string.isRequired
    };

    // static defaultProps = Component.defaultProps || {};

    constructor(props: TOriginalProps) {
      super(props);
    }

    render(): JSX.Element {
      // Render all your added markup
      return (
        <div>
          {/* render the wrapped component like this, passing the props and state */}
          <Component {...this.props} {...this.context} />
        </div>
      );
    }
  };
  return result;
};

export default translate;
