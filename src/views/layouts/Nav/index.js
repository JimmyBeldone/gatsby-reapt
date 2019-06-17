import React from 'react';
import { FormattedMessage } from 'react-intl';

import './Nav.styl';

import LocalizedLink from '../../components/LocalizedLink';
import { routes } from '../../../constants/router';

const Nav = () => (
    <div id='main-nav'>
        {routes
            .filter(route => route.nav !== false)
            .map((route, i) => (
                <LocalizedLink key={route.name + i} to={route.path}>
                    <FormattedMessage id={route.name} />
                </LocalizedLink>
            ))}
    </div>
);

export default Nav;
