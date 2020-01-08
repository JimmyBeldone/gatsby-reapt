import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import {
    FacebookShareButton,
    TwitterShareButton,
    PinterestShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    PinterestIcon,
    LinkedinIcon,
} from 'react-share';

import './Share.styl';
import siteConfig from '../../../../config/siteConfig';

const ShareButtons = ({
    url,
    description,
    tags,
    media,
    intl: { formatMessage, locale },
}) => {
    // const formattedDescription = formatMessage({ id: description });
    const path = siteConfig.siteUrl + url;
    const pathMedia = siteConfig.siteUrl + media;

    return (
        <div className='post-social'>
            <FacebookShareButton
                url={path}
                className='button is-outlined is-rounded facebook'
            >
                <FacebookIcon
                    size={36}
                    round
                    bgStyle={{ fill: siteConfig.themeColor }}
                />
            </FacebookShareButton>

            <TwitterShareButton
                url={path}
                className='button is-outlined is-rounded twitter'
            >
                <TwitterIcon
                    size={36}
                    round
                    bgStyle={{ fill: siteConfig.themeColor }}
                />
            </TwitterShareButton>

            <PinterestShareButton
                url={path}
                media={pathMedia}
                description={description}
            >
                <PinterestIcon
                    size={36}
                    round
                    bgStyle={{ fill: siteConfig.themeColor }}
                />
            </PinterestShareButton>

            <LinkedinShareButton url={path}>
                <LinkedinIcon
                    size={36}
                    round
                    bgStyle={{ fill: siteConfig.themeColor }}
                />
            </LinkedinShareButton>
        </div>
    );
};

ShareButtons.propTypes = {
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    media: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
};
ShareButtons.defaultProps = {
    tags: [],
};

export default injectIntl(ShareButtons);
