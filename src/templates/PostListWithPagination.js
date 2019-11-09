import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';
import { FormattedMessage } from 'react-intl';

import MainLayout from '../views/layouts/MainLayout';
import SEO from '../views/components/SEO';

import Config from '../../config/siteConfig';
import FormattedDate from '../views/components/FormattedDate';

const PostListWithPagination = ({
    data,
    pageContext: { locale, numPages, currentPage, translations },
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
                <p>
                    <FormattedMessage
                        id='demo.blog.count'
                        values={{ count: allMarkdownRemark.totalCount }}
                    />
                </p>
                <ul>
                    {allMarkdownRemark.edges.map(({ node }) => {
                        return (
                            <li key={node.id}>
                                <Link
                                    to={
                                        Config.langs.default.lang === locale
                                            ? node.frontmatter.path
                                            : `/${locale}${node.frontmatter.path}`
                                    }
                                >
                                    {node.frontmatter.featuredImage !==
                                        null && (
                                        <Img
                                            fixed={
                                                node.frontmatter.featuredImage
                                                    .childImageSharp.fixed
                                            }
                                            objectFit='cover'
                                            objectPosition='50% 50%'
                                            alt={node.frontmatter.title}
                                        />
                                    )}
                                    <h2>
                                        {node.frontmatter.title}{' '}
                                        <span>
                                            —{' '}
                                            <FormattedDate
                                                date={node.frontmatter.date}
                                            />{' '}
                                        </span>
                                    </h2>
                                </Link>
                                <p>In: {node.frontmatter.category}</p>
                                <p>{node.excerpt}</p>
                            </li>
                        );
                    })}
                </ul>

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
        allMarkdownRemark(
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
