import React from 'react';
import { FormattedMessage } from 'react-intl';

import './Nav.styl';

import { routes } from '../../../constants/router';
import LocalizedLink from '../../components/LocalizedLink';

const Nav = () => (
    <div id='main-nav'>
        {routes
            .filter(route => route.nav !== false)
            .map((route, i) => (
                <LocalizedLink key={route.name + i} to={route.path} hasSlug>
                    <FormattedMessage id={route.name} />
                </LocalizedLink>
            ))}
    </div>
);

export default Nav;
