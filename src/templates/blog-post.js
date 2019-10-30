import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import MainLayout from '../views/layouts/MainLayout';
import SEO from '../views/components/SEO';

const BlogPost = ({
    pageContext: { locale, postPath, translations },
    data,
    location,
}) => {
    const post = data.markdownRemark;
    return (
        <MainLayout
            locale={locale}
            originalPath={postPath}
            blogPostTranslation={translations}
            isBlogPost
        >
            <SEO
                title='demo.blog.headerTitle'
                location={location}
                originalPath={postPath}
                description='demo.blog.description'
            />
            <div className='container'>
                <h1>{post.frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </MainLayout>
    );
};

BlogPost.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        postPath: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default BlogPost;

export const query = graphql`
    query($postPath: String!) {
        markdownRemark(frontmatter: { path: { eq: $postPath } }) {
            html
            frontmatter {
                title
                path
            }
        }
    }
`;
