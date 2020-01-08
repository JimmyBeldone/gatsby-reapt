import { graphql } from 'gatsby';

export const seoImagesFragment = graphql`
    fragment SeoImages on File {
        childImageSharp {
            resize(width: 1200, height: 628) {
                src
            }
        }
    }
`;
