import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { FormattedMessage } from 'react-intl';

import MainLayout from '../views/layouts/MainLayout';
import PostList from '../views/components/PostList';
import SEO from '../views/components/SEO';

const TagItemWithPagination = ({
    data,
    pageContext: { locale, numPages, currentPage, translations, tag },
    location,
}) => {
    const { allMarkdownRemark } = data;
    return (
        <MainLayout locale={locale} translationsPaths={translations}>
            <SEO
                title='demo.blog.headerTitle'
                location={location}
                translationsPaths={translations}
                description='demo.blog.description'
            />
            <div className='container'>
                <h1>
                    <FormattedMessage id='demo.blog.title' />
                </h1>
                <p>Tag: {tag}</p>
                <p>
                    <FormattedMessage
                        id='demo.blog.count'
                        values={{ count: allMarkdownRemark.totalCount }}
                    />
                </p>
                <PostList posts={allMarkdownRemark.edges} />

                <ul>
                    {Array.from({ length: numPages }).map((item, i) => {
                        const index = i + 1;
                        const link =
                            index === 1 ? '/blog' : `/blog/page/${index}`;

                        return (
                            <li key={`post-pagination-${i}`}>
                                {currentPage === index ? (
                                    <span>{index}</span>
                                ) : (
                                    <a href={link}>{index}</a>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </MainLayout>
    );
};

TagItemWithPagination.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        translations: PropTypes.array.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default TagItemWithPagination;

export const query = graphql`
    query($skip: Int!, $limit: Int!, $locale: String!, $tag: String!) {
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {
                frontmatter: {
                    featured: { eq: false }
                    lang: { eq: $locale }
                    tags: { in: [$tag] }
                }
            }
            limit: $limit
            skip: $skip
        ) {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date
                        path
                        category
                        tags
                        featuredImage {
                            childImageSharp {
                                fixed(height: 150) {
                                    ...GatsbyImageSharpFixed_withWebp
                                }
                            }
                        }
                    }
                    excerpt
                }
            }
        }
    }
`;
