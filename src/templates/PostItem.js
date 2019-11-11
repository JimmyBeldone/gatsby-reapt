import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import MainLayout from '../views/layouts/MainLayout';
import SEO from '../views/components/SEO';
import Image from '../views/components/Image';

const BlogPost = ({
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
                pageType='post'
            />
            <div className='container'>
                {post.frontmatter.featuredImage !== null && (
                    <Image
                        fluid={
                            post.frontmatter.featuredImage.childImageSharp.fluid
                        }
                        alt={post.frontmatter.title}
                    />
                )}
                <h1>{post.frontmatter.title}</h1>
                <MDXRenderer>{post.body}</MDXRenderer>
            </div>
        </MainLayout>
    );
};

BlogPost.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        postPath: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default BlogPost;

export const query = graphql`
    query($postPath: String!) {
        mdx(frontmatter: { path: { eq: $postPath } }) {
            body
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
