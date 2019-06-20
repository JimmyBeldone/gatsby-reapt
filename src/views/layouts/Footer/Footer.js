import React from 'react';
import { FormattedMessage } from 'react-intl';
import siteConfig from '../../../../config/siteConfig';

import './Footer.styl';

const Footer = () => (
    <footer>
        <div className='container'>
            <h1>Footer</h1>
            <div>
                {siteConfig.copyright}
                {` `}
                <a
                    href={siteConfig.social.github}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    {siteConfig.name}
                </a>
                , by{` `}
                <a
                    href={siteConfig.authorGithub}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    {siteConfig.authorName}>
                </a>
            </div>
            <div>
                <FormattedMessage id='demo.footer.built' />
                {` `}
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
