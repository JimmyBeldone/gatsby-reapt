import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash.kebabcase';

import MainLayout from '../views/layouts/MainLayout';
import SEO from '../views/components/SEO';

import Config from '../../config/siteConfig';

const TagsPage = ({
    data: {
        allMarkdownRemark: { group },
    },
    pageContext: { locale, originalPath },
    location,
}) => (
    <MainLayout locale={locale} originalPath={originalPath}>
        <SEO
            title='demo.blog.headerTitle'
            location={location}
            originalPath={originalPath}
            description='demo.blog.description'
        />
        <div className='container'>
            <h1>Tags</h1>
            <ul>
                {group.map(tag => (
                    <li key={tag.fieldValue}>
                        <Link
                            to={
                                Config.langs.default.lang === locale
                                    ? `/tags/${kebabCase(tag.fieldValue)}/`
                                    : `/${locale}/tags/${kebabCase(
                                          tag.fieldValue,
                                      )}/`
                            }
                        >
                            {tag.fieldValue} ({tag.totalCount})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </MainLayout>
);

TagsPage.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        originalPath: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            group: PropTypes.arrayOf(
                PropTypes.shape({
                    fieldValue: PropTypes.string.isRequired,
                    totalCount: PropTypes.number.isRequired,
                }).isRequired,
            ),
        }),
    }),
};

export default TagsPage;

export const pageQuery = graphql`
    query($locale: String!) {
        allMarkdownRemark(
            limit: 2000
            filter: { frontmatter: { lang: { eq: $locale } } }
        ) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`;
