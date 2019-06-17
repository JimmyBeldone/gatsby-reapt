import React from 'react';
import { FormattedMessage } from 'react-intl';

import './Footer.styl';

const Footer = () => (
    <footer>
        <div className='container'>
            <h1>Footer</h1>© {new Date().getFullYear()},{` `}
            <FormattedMessage id='demo.footer.built' />
            {` `}
            <a href='https://www.gatsbyjs.org'>Gatsby</a>
        </div>
    </footer>
);

export default Footer;
