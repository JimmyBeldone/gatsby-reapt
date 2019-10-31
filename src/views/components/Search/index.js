import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import './index.styl';
import { description } from '../../../../config/siteConfig';

const Search = ({ locale }) => {
    const [query, setQuery] = useState(``);
    const [results, setResults] = useState([]);
    console.log('TCL: Search -> results', results);

    useEffect(() => {
        if (!query || !window.__LUNR__) {
            setResults([]);
            return;
        }
        const lunrIndex = window.__LUNR__[locale];
        const searchResults = lunrIndex.index.search(query + '*');
        console.log('TCL: Search -> searchResults', searchResults);
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
                defaultValue={query}
                onChange={event => {
                    setQuery(event.target.value);
                }}
            />
            <ul className='search-result'>
                {results.map(({ url, title, description }, index) => {
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

export default Search;