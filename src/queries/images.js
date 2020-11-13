import { graphql } from 'gatsby';

// eslint-disable-next-line import/prefer-default-export
export const seoImagesFragment = graphql`
    fragment SeoImages on File {
        childImageSharp {
            resize(width: 1200, height: 628) {
                src
            }
        }
    }
`;
