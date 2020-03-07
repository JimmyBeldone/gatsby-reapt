import PropTypes from 'prop-types';
import React from 'react';

import FormattedDate from '../FormattedDate';
import Image from '../Image';
import LocalizedLink from '../LocalizedLink';
import TagList from '../TagList';

const PostList = ({ posts }) => (
    <div>
        {posts.map((post, index) => {
            const {
                title,
                date,
                path,
                tags,
                featuredImage,
            } = post.node.frontmatter;
            const { excerpt } = post.node;

            return (
                <div key={title}>
                    <div>
                        <LocalizedLink to={path}>
                            {featuredImage !== null && (
                                <Image
                                    fixed={featuredImage.childImageSharp.fixed}
                                    objectFit='cover'
                                    objectPosition='50% 50%'
                                    alt={title}
                                />
                            )}
                        </LocalizedLink>
                    </div>
                    <div>
                        <LocalizedLink to={path}>
                            <FormattedDate date={date} />
                            <h2>{title}</h2>
                            <p>{excerpt}</p>
                        </LocalizedLink>
                        <TagList tags={tags} />
                    </div>
                </div>
            );
        })}
    </div>
);

PostList.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            node: PropTypes.shape({
                frontmatter: PropTypes.shape({
                    title: PropTypes.string.isRequired,
                    date: PropTypes.string.isRequired,
                    path: PropTypes.string.isRequired,
                    category: PropTypes.string.isRequired,
                    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
                    featuredImage: PropTypes.oneOfType([
                        PropTypes.bool,
                        PropTypes.object,
                    ]),
                }),
            }),
        }),
    ),
};

export default PostList;
