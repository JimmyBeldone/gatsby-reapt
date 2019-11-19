import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { FormattedMessage } from 'react-intl';

import MainLayout from '../layouts/MainLayout';
import PostList from '../components/PostList';
import SEO from '../components/SEO';

const CategoryItem = ({
    pageContext: { locale, category, translations },
    data,
    location,
}) => {
    const { allMdx } = data;
    return (
        <MainLayout locale={locale} translationsPaths={translations}>
            <SEO
                title={category}
                location={location}
                translationsPaths={translations}
                // description={post.frontmatter.description}
                pageType='tag'
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
            </div>
        </MainLayout>
    );
};

CategoryItem.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
        translations: PropTypes.array.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    data: PropTypes.shape({
        allMdx: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            title: PropTypes.string.isRequired,
                            path: PropTypes.string.isRequired,
                        }),
                    }),
                }).isRequired,
            ),
        }),
    }),
};

export default CategoryItem;

export const query = graphql`
    query($category: String!) {
        allMdx(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { category: { eq: $category } } }
        ) {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        path
                        category
                        tags
                        date
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