import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import './index.styl';

const Search = ({ locale }) => {
    const [query, setQuery] = useState(``);
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (!query || !window.__LUNR__) {
            setResults([]);
            return;
        }
        const lunrIndex = window.__LUNR__[locale];
        const searchResults = lunrIndex.index.search(query + '*');

        setResults(
            searchResults.map(({ ref }) => {
                return lunrIndex.store[ref];
            }),
        );
    }, [locale, query]);

    return (
        <div className='search-box'>
            <input
                type='text'
                name='search-input'
                aria-label='search input'
                aria-required='true'
                defaultValue={query}
                onChange={(event) => {
                    setQuery(event.target.value);
                }}
            />
            <ul className='search-result'>
                {results.map(({ description, title, url }, index) => {
                    return (
                        <li key={index}>
                            <Link to={url}>
                                <div className='title'>{title}</div>
                                <div className='description'>{description}</div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

Search.propTypes = {
    locale: PropTypes.string.isRequired,
};

export default Search;
