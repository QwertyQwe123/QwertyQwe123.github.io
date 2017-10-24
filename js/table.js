import React, { Component } from 'react';
import classnames from 'classnames';

export default function table(props) {
        return (
            <table id="context" className={classnames("ui", "celled", "fixed", "table")} style={props.loading ? {visibility: "hidden"} : {padding:"0"} } >
              <thead>
                <tr>
                    <th className="one wide" onClick={props.handleSort} style={{cursor:"pointer"}}>
                        id({props.dataLength})
                        <i className={ props.reverse ? "caret up icon" : "caret down icon" }></i>
                    </th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {props.table}
              </tbody>
              <tfoot>
                <tr>
                    <th colSpan="6">
                      <div className="ui right floated pagination menu">
                        {props.paginator}
                      </div>
                    </th>
                </tr>
              </tfoot>
            </table>
        );
}
