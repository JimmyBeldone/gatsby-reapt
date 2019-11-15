import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import MainLayout from '../views/layouts/MainLayout';
import SEO from '../views/components/SEO';
import Image from '../views/components/Image';
import SimilarPosts from '../views/components/SimilarPost';

const BlogPost = ({
    pageContext: { locale, postPath, translations },
    data,
    location,
}) => {
    const post = data.mdx;
    const allPosts = data.allMdx;
    const {
        title,
        description,
        featuredImage,
        category,
        tags,
    } = post.frontmatter;
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
                post={{ ...post.frontmatter, body: post.excerpt }}
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
                <SimilarPosts
                    category={category}
                    tags={tags}
                    postId={post.id}
                    allPosts={allPosts}
                />
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
    query($postPath: String!, $locale: String!) {
        mdx(frontmatter: { path: { eq: $postPath } }) {
            id
            body
            excerpt
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
        allMdx(
            filter: {
                frontmatter: { lang: { eq: $locale }, path: { ne: $postPath } }
            }
        ) {
            edges {
                node {
                    id
                    body
                    excerpt
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
        }
    }
`;
