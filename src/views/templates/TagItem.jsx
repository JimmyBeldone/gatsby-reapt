import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import PostList from '../components/PostList';
import SEO from '../components/SEO';
import MainLayout from '../layouts/MainLayout';

const TagItem = ({
    data,
    location,
    pageContext: { locale, tag, translations },
}) => {
    const { allMdx } = data;
    return (
        <MainLayout locale={locale} translationsPaths={translations}>
            <SEO
                title={tag}
                location={location}
                translationsPaths={translations}
                // description={post.frontmatter.description}
                pageType='tag'
            />
            <div className='container'>
                <h1>
                    <FormattedMessage id='demo.blog.title' />
                </h1>
                <p>Tag: {tag}</p>
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

TagItem.propTypes = {
    data: PropTypes.shape({
        allMdx: PropTypes.shape({
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            path: PropTypes.string.isRequired,
                            title: PropTypes.string.isRequired,
                        }),
                    }),
                }).isRequired,
            ),
            totalCount: PropTypes.number.isRequired,
        }),
    }).isRequired,
    location: PropTypes.object.isRequired,
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
        translations: PropTypes.array.isRequired,
    }).isRequired,
};

export default TagItem;

export const query = graphql`
    query($tag: String!) {
        allMdx(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
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
