import React, { Component } from 'react';

export default function Card(props) {
    const chosen = props.chosen;
    return (
        <div className="ui three wide column rail" style={ props.loading ? {visibility: "hidden"} : null }> {/* this.props.loading && {visibility: "hidden"} <- this construction for some reason doesn't work*/}
            <div className="ui card sticky">
                <div className="content">
                        <a className="header name">{`${chosen[0]} ${chosen[1]}`}</a>
                    <div className="meta">
                        <span className="phone">{`${chosen[2]}`}</span>
                    </div>
                    <div className="meta">
                        <span className="email">{`${chosen[3]}`}</span>
                    </div>
                </div>
                <div className="extra content">
                    <div className="discription">{`${chosen[4]}`}</div>
                </div>
            </div>
        </div>
    );
}
