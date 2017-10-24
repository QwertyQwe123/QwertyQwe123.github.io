import React, { Component } from 'react';

export default class Card extends Component {
    render() {
        return (
            <div className="ui three wide column rail" style={ this.props.loading && {visibility: "hidden"} }>
                <div className="ui card sticky">
                  <div className="content">
                    <a className="header name"></a>
                    <div className="meta">
                      <span className="phone"></span>
                    </div>
                    <div className="meta">
                      <span className="email"></span>
                    </div>
                  </div>
                  <div className="extra content">
                    <div className="discription">
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}
