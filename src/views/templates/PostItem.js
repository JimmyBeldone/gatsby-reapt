import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PropTypes from 'prop-types';
import React from 'react';

import Image from '../components/Image';
import SEO from '../components/SEO';
import ShareButtons from '../components/ShareButtons';
import SimilarPosts from '../components/SimilarPost';
import TagList from '../components/TagList';
import MainLayout from '../layouts/MainLayout';

const PostItem = ({
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
                <div className='post-item'>
                    {featuredImage !== null && (
                        <Image
                            fluid={featuredImage.childImageSharp.fluid}
                            alt={title}
                        />
                    )}
                    <h1>{title}</h1>
                    <TagList tags={tags} />
                    <MDXRenderer>{post.body}</MDXRenderer>
                    <ShareButtons
                        url={location.pathname}
                        description={description}
                        media={
                            featuredImage !== null
                                ? featuredImage.childImageSharp.original.src
                                : data.file.childImageSharp.fixed.src
                        }
                    />
                </div>
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

PostItem.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        postPath: PropTypes.string.isRequired,
        translations: PropTypes.array.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    data: PropTypes.shape({
        mdx: PropTypes.object.isRequired,
        allMdx: PropTypes.object.isRequired,
        file: PropTypes.object.isRequired,
    }),
};

export default PostItem;

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
                        fluid(maxWidth: 800) {
                            ...GatsbyImageSharpFluid
                        }
                        original {
                            src
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
                                fluid(maxWidth: 800) {
                                    ...GatsbyImageSharpFluid
                                }
                                original {
                                    src
                                }
                            }
                        }
                    }
                }
            }
        }
        file(name: { eq: "gatsby-icon" }) {
            childImageSharp {
                fixed(width: 500) {
                    ...GatsbyImageSharpFixed_noBase64
                }
            }
        }
    }
`;
