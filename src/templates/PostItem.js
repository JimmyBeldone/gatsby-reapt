import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';

import MainLayout from '../views/layouts/MainLayout';
import SEO from '../views/components/SEO';

const BlogPost = ({
    pageContext: { locale, postPath, translations },
    data,
    location,
}) => {
    const post = data.markdownRemark;
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
                    <Img
                        fluid={
                            post.frontmatter.featuredImage.childImageSharp.fluid
                        }
                        // objectFit='cover'
                        // objectPosition='50% 50%'
                        // alt=''
                    />
                )}
                <h1>{post.frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
        markdownRemark(frontmatter: { path: { eq: $postPath } }) {
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
