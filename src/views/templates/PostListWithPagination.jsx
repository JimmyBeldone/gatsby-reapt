import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { articlePrefix } from '../../../config/siteConfig';
import Pagination from '../components/Pagination';
import PostList from '../components/PostList';
import SEO from '../components/SEO';
import MainLayout from '../layouts/MainLayout';

const PostListWithPagination = ({
    data,
    location,
    pageContext: { currentPage, locale, numPages, translations },
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
    data: PropTypes.shape({
        allMdx: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    pageContext: PropTypes.shape({
        currentPage: PropTypes.number.isRequired,
        locale: PropTypes.string.isRequired,
        numPages: PropTypes.number.isRequired,
        translations: PropTypes.array.isRequired,
    }).isRequired,
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
