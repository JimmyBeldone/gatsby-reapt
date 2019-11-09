import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import MainLayout from '../views/layouts/MainLayout';
import SEO from '../views/components/SEO';
import Image from '../views/components/Image';

import Config from '../../config/siteConfig';
import FormattedDate from '../views/components/FormattedDate';

const TagItem = ({
    pageContext: { locale, tag, translations, tagPath },
    data,
    location,
}) => {
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
                <h1>Tag : {tag}</h1>
                {/* <div dangerouslySetInnerHTML={{ __html: post.html }} /> */}
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
                                    <Image
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
                            <p>{node.excerpt}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    );
};

TagItem.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
        tagPath: PropTypes.string.isRequired,
        translations: PropTypes.array.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            title: PropTypes.string.isRequired,
                            path: PropTypes.string.isRequired,
                            description: PropTypes.string.isRequired,
                            featuredImage: PropTypes.object.isRequired,
                        }),
                    }),
                }).isRequired,
            ),
        }),
    }),
};

export default TagItem;

export const query = graphql`
    query($tag: String!) {
        allMarkdownRemark(
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
                        description
                        date
                        featuredImage {
                            childImageSharp {
                                fixed(height: 150) {
                                    ...GatsbyImageSharpFixed_withWebp
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
