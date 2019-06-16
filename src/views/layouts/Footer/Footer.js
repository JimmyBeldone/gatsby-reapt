import React from 'react';
import { FormattedMessage } from 'react-intl';

import './Footer.styl';

const Footer = () => (
    <footer>
        <h1>Footer</h1>© {new Date().getFullYear()},{` `}
        <FormattedMessage id='demo.footer.built' />
        {` `}
        <a href='https://www.gatsbyjs.org'>Gatsby</a>
    </footer>
);

export default Footer;
