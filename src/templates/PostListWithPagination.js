import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { FormattedMessage } from 'react-intl';

import MainLayout from '../views/layouts/MainLayout';
import PostList from '../views/components/PostList';
import Pagination from '../views/components/Pagination';
import SEO from '../views/components/SEO';

import { articlePrefix } from '../../config/siteConfig';

const PostListWithPagination = ({
    data,
    pageContext: { locale, numPages, currentPage, translations },
    location,
}) => {
    const { allMdx } = data;
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
                <p>
                    <FormattedMessage
                        id='demo.blog.count'
                        values={{ count: allMdx.totalCount }}
                    />
                </p>
                <PostList posts={allMdx.edges} />

                <Pagination
                    numPages={numPages}
                    currentPage={currentPage}
                    contextPage={articlePrefix}
                    lang={locale}
                />
            </div>
        </MainLayout>
    );
};

PostListWithPagination.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        translations: PropTypes.array.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default PostListWithPagination;

export const query = graphql`
    query blogPostsListPagination($skip: Int!, $limit: Int!, $locale: String!) {
        allMdx(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {
                frontmatter: { featured: { eq: false }, lang: { eq: $locale } }
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
