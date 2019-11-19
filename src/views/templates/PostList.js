import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { FormattedMessage } from 'react-intl';

import MainLayout from '../layouts/MainLayout';
import PostList from '../components/PostList';
import SEO from '../components/SEO';

const BlogPage = ({
    pageContext: { locale, translations },
    location,
    data,
}) => {
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
                        values={{ count: data.allMdx.totalCount }}
                    />
                </p>
                <PostList posts={data.allMdx.edges} />
            </div>
        </MainLayout>
    );
};

BlogPage.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        translations: PropTypes.array.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default BlogPage;

export const query = graphql`
    query blogPostsList($locale: String!) {
        allMdx(
            filter: {
                frontmatter: { featured: { eq: false }, lang: { eq: $locale } }
            }
            sort: { fields: [frontmatter___date], order: DESC }
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