import React from 'react';

const Search = (props) => {
    return (
        <div className="filter">
            <input
                id="search-bar"
                type="text"
                placeholder="Search Notes"
                onChange={props.handleSearch}
                value={props.searchTerm}
            />
        </div>
    );
}

export default Search;
