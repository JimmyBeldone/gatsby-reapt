const Utils = {
    /**
     * Join provided url paths.
     * @param {...string} paths Provided paths. It doesn't matter if they have trailing slash.
     * @return {string} Resolved url without trailing slash.
     */
    resolveUrl: (...paths) => {
        return paths.reduce((resolvedUrl, path) => {
            let urlPath = path.toString().trim();
            if (urlPath)
                resolvedUrl +=
                    (resolvedUrl === '' ? '' : '/') +
                    urlPath.replace(/^\/|\/$/g, '');
            return resolvedUrl;
        }, '');
    },
    /**
     * Resolve a page url adding a trailing slash.
     * Needed to prevent 301 redirects cause of Gatsby.js' folder structure.
     * @param {...string} path Provided paths. It doesn't matter if they have trailing slash.
     * @return {string} Resolved url with trailing slash.
     */
    resolvePageUrl: (...path) => {
        let resolvedUrl = Utils.resolveUrl(...path);
        return resolvedUrl + '/';
    },
    /**
     * Get an ordered list of suggested posts for a single post.
     * @param {Object} post The single post of which to find the related posts. It's the returned object from Graphql's query `mdx`
     * @param {Array} postList The list where find related posts. It's the returned object from Graphql's query `allMdx`
     * @param {number} limit The maximum number of suggested posts to get
     * @return {Array} The `postList` object sorted according to the best match with the `post` object
     */
    getSuggestedPosts: (post, postList, limit) => {
        // Get the number of common tags with provided post.
        let getTagScore = edge => {
            let commonTags = 0;
            edge.node.frontmatter.tags.forEach(tag => {
                commonTags += post.frontmatter.tags.indexOf(tag) !== -1 ? 1 : 0;
            });
            return commonTags;
        };

        return postList.edges
            .sort((edgeA, edgeB) => {
                return getTagScore(edgeB) - getTagScore(edgeA);
            })
            .slice(0, limit);
    },
    /**
     * Capitalize passed string
     * @param {string} str string to capitalize
     * @return {string} string with first letter to uppercase
     */
    capitalize: str => str[0].toUpperCase() + str.slice(1),
};

module.exports = Utils;
