import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Image from '../components/Image';
import SEO from '../components/SEO';
import MainLayout from '../layouts/MainLayout';

const ProductItem = ({
    data,
    location,
    pageContext: { locale, postPath, translations },
}) => {
    const post = data.mdx;
    return (
        <MainLayout locale={locale} translationsPaths={translations}>
            <SEO
                title={post.frontmatter.title}
                location={location}
                translationsPaths={translations}
                description={post.frontmatter.description}
                pageType='product'
            />
            <div className='container'>
                {post.frontmatter.featuredImage !== null && (
                    <Image
                        fluid={
                            post.frontmatter.featuredImage.childImageSharp.fluid
                        }
                        // objectFit='cover'
                        // objectPosition='50% 50%'
                        alt={post.frontmatter.title}
                    />
                )}
                <h1>{post.frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </MainLayout>
    );
};

ProductItem.propTypes = {
    location: PropTypes.object.isRequired,
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        postPath: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProductItem;

export const query = graphql`
    query($postPath: String!) {
        mdx(frontmatter: { path: { eq: $postPath } }) {
            html
            frontmatter {
                title
                path
                description
                date
                tags
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
`;
