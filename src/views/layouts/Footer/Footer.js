import React from 'react';
import { FormattedMessage } from 'react-intl';

import { name } from '../../../../config/siteConfig';
import { copyright, business, author } from '../../../../config/socialConfig';

import './Footer.styl';

const Footer = () => (
    <footer>
        <div className='container'>
            <span>Footer</span>
            <div>
                {copyright}
                {` `}
                <a
                    href={business.networks.github}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    {name}
                </a>
                , by
                <a
                    href={author.networks.github}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    {author.username}>
                </a>
            </div>
            <div>
                <FormattedMessage id='demo.footer.built' />

                <a
                    href='https://www.gatsbyjs.org'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Gatsby
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;
