import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash.kebabcase';
import PropTypes from 'prop-types';
import React from 'react';

import Config from '../../config/siteConfig';
import SEO from '../views/components/SEO';
import MainLayout from '../views/layouts/MainLayout';

const TagsPage = ({
    data: {
        allMdx: { group },
    },
    location,
    pageContext: { locale, translations },
}) => (
    <MainLayout locale={locale} translationsPaths={translations}>
        <SEO
            title='demo.blog.headerTitle'
            location={location}
            translationsPaths={translations}
            description='demo.blog.description'
        />
        <div className='container'>
            <h1>Tags</h1>
            <ul>
                {group.map((tag) => (
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
    data: PropTypes.shape({
        allMdx: PropTypes.shape({
            group: PropTypes.arrayOf(
                PropTypes.shape({
                    fieldValue: PropTypes.string.isRequired,
                    totalCount: PropTypes.number.isRequired,
                }).isRequired,
            ),
        }),
    }),
    location: PropTypes.object.isRequired,
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        translations: PropTypes.array.isRequired,
    }).isRequired,
};

export default TagsPage;

export const pageQuery = graphql`
    query($locale: String!) {
        allMdx(
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
