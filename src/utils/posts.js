/**
 * Get an ordered list of suggested posts for a single post.
 * @param {Object} post The single post of which to find the related posts. It's the returned object from Graphql's query `mdx`
 * @param {Array} postList The list where find related posts. It's the returned object from Graphql's query `allMdx`
 * @param {number} limit The maximum number of suggested posts to get
 * @return {Array} The `postList` object sorted according to the best match with the `post` object
 */
const getSuggestedPosts = (post, postList, limit) => {
    // Get the number of common tags with provided post.
    const getTagScore = (edge) => {
        let commonTags = 0;
        edge.node.frontmatter.tags.forEach((tag) => {
            commonTags += post.frontmatter.tags.indexOf(tag) !== -1 ? 1 : 0;
        });
        return commonTags;
    };

    return postList.edges
        .filter(({ node }) => node.id !== post.id)
        .sort((edgeA, edgeB) => {
            return getTagScore(edgeB) - getTagScore(edgeA);
        })
        .slice(0, limit);
};

/**
 * Capitalize passed string
 * @param {string} str string to capitalize
 * @return {string} string with first letter to uppercase
 */
const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const getPostsFromQuery = (posts) => {
    if (posts) {
        return posts.edges
            .map((edge) => edge.node)
            .map((node) =>
                Object.assign({}, node.frontmatter, {
                    excerpt: node.excerpt,
                    id: node.id,
                    body: node.body,
                }),
            );
    }

    return [];
};

module.exports = { getSuggestedPosts, capitalize, getPostsFromQuery };
