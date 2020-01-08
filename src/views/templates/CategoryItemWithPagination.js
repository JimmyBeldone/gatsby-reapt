import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { FormattedMessage } from 'react-intl';

import MainLayout from '../layouts/MainLayout';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const CategoryItemWithPagination = ({
    data,
    pageContext: { locale, numPages, currentPage, translations, category },
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
                <p>Category: {category}</p>
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
                    contextPage={`/category/${category}/`}
                    lang={locale}
                />
            </div>
        </MainLayout>
    );
};

CategoryItemWithPagination.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        translations: PropTypes.array.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default CategoryItemWithPagination;

export const query = graphql`
    query($skip: Int!, $limit: Int!, $locale: String!, $category: String!) {
        allMdx(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {
                frontmatter: {
                    featured: { eq: false }
                    lang: { eq: $locale }
                    category: { eq: $category }
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
