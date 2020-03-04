import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { getPostsFromQuery } from '../../../utils/posts';
import { SimilarArticlesFactory } from './SimilarArticlesFactory';

const SimilarPosts = ({ category, tags, postId, nbPosts, allPosts }) => {
    // (2.) Marshall the response into articles
    const articles = getPostsFromQuery(allPosts);

    // (3.) Use a SimilarArticlesFactory to get my similar articles
    const similarArticles = new SimilarArticlesFactory(articles, postId)
        .setMaxArticles(nbPosts)
        .setCategory(category)
        .setTags(tags)
        .getArticles();

    // (4.) Render it
    return (
        <section className='similar-articles'>
            <FormattedMessage id='posts.related.title' tagName='h2' />
            {similarArticles.map(({ article }, i) => (
                <div className='post-item' key={`similar-post-${article.id}`}>
                    <div className='post-title'>{article.title}</div>
                    <div className='post-excerpt'>{article.excerpt}</div>
                </div>
            ))}
        </section>
    );
};

SimilarPosts.defaultProps = {
    nbPosts: 3,
};

SimilarPosts.propTypes = {
    category: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired,
    nbPosts: PropTypes.number,
    allPosts: PropTypes.object.isRequired,
};

export default SimilarPosts;
