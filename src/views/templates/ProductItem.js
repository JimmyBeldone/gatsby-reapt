import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import MainLayout from '../layouts/MainLayout';
import SEO from '../components/SEO';
import Image from '../components/Image';

const ProductItem = ({
    pageContext: { locale, postPath, translations },
    data,
    location,
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
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        postPath: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
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
