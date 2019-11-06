import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';

import MainLayout from '../views/layouts/MainLayout';
import SEO from '../views/components/SEO';

const TagItem = ({
    pageContext: { locale, tag, translations, tagPath },
    data,
    location,
}) => {
    const post = data.allMarkdownRemark;
    return (
        <MainLayout
            locale={locale}
            originalPath={tagPath}
            blogPostTranslation={translations}
            isBlogPost
        >
            <SEO
                title={tag}
                location={location}
                originalPath={tagPath}
                // description={post.frontmatter.description}
                pageType='tag'
            />
            <div className='container'>
                <h1>Tag : {tag}</h1>
                {/* <div dangerouslySetInnerHTML={{ __html: post.html }} /> */}
            </div>
        </MainLayout>
    );
};

TagItem.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
        tagPath: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default TagItem;

export const query = graphql`
    query($tag: String!) {
        allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    frontmatter {
                        title
                        path
                        description
                        date
                        featuredImage {
                            childImageSharp {
                                fluid(maxWidth: 1200) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
