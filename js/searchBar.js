import React, { Component } from 'react';

export default function searchBar(props) {
        return (
            <div className="ui container search center aligned">
                <div className="ui fluid icon input">
                    <input className="prompt" value={props.filterText} placeholder="Search..." name="filterText" onChange={props.handleFilter}/>
                    <i className="search icon"></i>
                </div>
            </div>
        );
}
