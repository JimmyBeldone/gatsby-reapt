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
    const { title, description, featuredImage } = post.frontmatter;
    return (
        <MainLayout locale={locale} translationsPaths={translations}>
            <SEO
                title={title}
                location={location}
                translationsPaths={translations}
                description={description}
                pageType='article'
                image={
                    featuredImage !== null
                        ? {
                              url: featuredImage.childImageSharp.fluid.src,
                              alt: title,
                          }
                        : null
                }
                post={post.frontmatter}
            />
            <div className='container'>
                {featuredImage !== null && (
                    <Image
                        fluid={featuredImage.childImageSharp.fluid}
                        alt={title}
                    />
                )}
                <h1>{title}</h1>
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
                category
                date
                publishedAt: date(formatString: "YYYY-MM-DD")
                updatedAt: date(formatString: "YYYY-MM-DD")
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
