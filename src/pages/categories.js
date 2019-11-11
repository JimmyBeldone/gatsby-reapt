import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash.kebabcase';

import MainLayout from '../views/layouts/MainLayout';
import SEO from '../views/components/SEO';

import Config from '../../config/siteConfig';

const CategoriesPage = ({
    data: {
        allMdx: { group },
    },
    pageContext: { locale, translations },
    location,
}) => (
    <MainLayout locale={locale} translationsPaths={translations}>
        <SEO
            title='demo.blog.headerTitle'
            location={location}
            translationsPaths={translations}
            description='demo.blog.description'
        />
        <div className='container'>
            <h1>Categories</h1>
            <ul>
                {group.map(cat => (
                    <li key={cat.fieldValue}>
                        <Link
                            to={
                                Config.langs.default.lang === locale
                                    ? `/category/${kebabCase(cat.fieldValue)}/`
                                    : `/${locale}/category/${kebabCase(
                                          cat.fieldValue,
                                      )}/`
                            }
                        >
                            {cat.fieldValue} ({cat.totalCount})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </MainLayout>
);

CategoriesPage.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        translations: PropTypes.array.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
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
};

export default CategoriesPage;

export const pageQuery = graphql`
    query($locale: String!) {
        allMdx(
            limit: 2000
            filter: { frontmatter: { lang: { eq: $locale } } }
        ) {
            group(field: frontmatter___category) {
                fieldValue
                totalCount
            }
        }
    }
`;
