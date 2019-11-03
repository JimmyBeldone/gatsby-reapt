/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';
import { FormattedMessage } from 'react-intl';

import MainLayout from '../views/layouts/MainLayout';
import SEO from '../views/components/SEO';

import Config from '../../config/siteConfig';
import FormattedDate from '../views/components/FormattedDate';

const BlogPage = ({
    pageContext: { locale, originalPath },
    location,
    data,
}) => {
    return (
        <MainLayout locale={locale} originalPath={originalPath}>
            <SEO
                title='demo.blog.headerTitle'
                location={location}
                originalPath={originalPath}
                description='demo.blog.description'
            />
            <div className='container'>
                <h1>
                    <FormattedMessage id='demo.blog.title' />
                </h1>
                <p>
                    <FormattedMessage
                        id='demo.blog.count'
                        values={{ count: data.allMarkdownRemark.totalCount }}
                    />
                </p>
                <ul>
                    {data.allMarkdownRemark.edges.map(({ node }) => (
                        <li key={node.id}>
                            {/* <Link to={Utils.resolvePageUrl(node.frontmatter.path)}> */}
                            <Link
                                to={
                                    Config.langs.default.lang === locale
                                        ? node.frontmatter.path
                                        : `/${locale}${node.frontmatter.path}`
                                }
                            >
                                {node.frontmatter.featuredImage !== null && (
                                    <Img
                                        fixed={
                                            node.frontmatter.featuredImage
                                                .childImageSharp.fixed
                                        }
                                        objectFit='cover'
                                        objectPosition='50% 50%'
                                        alt=''
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
                            <p>{node.excerpt}</p>
                        </li>
                    ))}
                </ul>
                {/* <LocalizedLink to='/'>
                <FormattedMessage id='demo.blog.link' />
            </LocalizedLink> */}
            </div>
        </MainLayout>
    );
};

BlogPage.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        originalPath: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default BlogPage;

export const query = graphql`
    query($locale: String!) {
        allMarkdownRemark(
            filter: { frontmatter: { lang: { eq: $locale } } }
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
