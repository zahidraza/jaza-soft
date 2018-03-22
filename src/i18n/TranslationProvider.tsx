import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Polyglot from 'node-polyglot';
import { connect, MapStateToProps } from "react-redux";
import { compose, withContext } from 'recompose';

import defaultMessages from './messages';
import { AppState } from '../reducer';
import { DataType } from '../types';
import locale from '../reducer/locale';

export interface PropsFromState {
  locale: string,
}

export interface OwnProps {
  messages?: object,
  children?: JSX.Element
}

export interface Context {
  translate: Function,
  locale: string
}

const withI18nContext = withContext<Context, OwnProps & PropsFromState>(
    {
        translate: PropTypes.func.isRequired,
        locale: PropTypes.string.isRequired,
    },
    ({ locale, messages = {} }: OwnProps & PropsFromState): Context => {
        const userMessages = (messages as any)[locale] || {};
        const polyglot = new Polyglot({
            locale,
            phrases: { ...defaultMessages, ...userMessages },
        });

        return {
            locale,
            translate: polyglot.t.bind(polyglot) as typeof polyglot.t,
        };
    }
);



const TranslationProvider = ({ children }: OwnProps & PropsFromState) => Children.only(children);

const mapStateToProps: MapStateToProps<PropsFromState, OwnProps, AppState<DataType>> = (
  state: AppState<DataType>,
  ownProps: OwnProps
): PropsFromState => ({
  locale: state.locale
});

export default connect(mapStateToProps)(withI18nContext(TranslationProvider));

// export default connect(mapStateToProps)(TranslationProvider);


