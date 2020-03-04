import PropTypes from 'prop-types';
import React, { Component, createContext, useContext } from 'react';

import { checkWebp } from './utils';

const WebpContext = createContext();

export class WebpProvider extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            initiated: false,
            hasWebp: null,
        };
    }

    componentDidMount() {
        checkWebp(result => {
            this.setState({
                initiated: true,
                hasWebp: result,
            });
        });
    }

    render() {
        const { children } = this.props;
        const { initiated, hasWebp } = this.state;
        return (
            <WebpContext.Provider value={{ initiated, hasWebp }}>
                {children}
            </WebpContext.Provider>
        );
    }
}

export const useWebp = () => useContext(WebpContext);
