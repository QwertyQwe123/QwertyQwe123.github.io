import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import sticky from './sticky';
import SearchBar from './searchBar';
import Card from './card';
import Table from './table';
import ChooseScreen from './chooseScreen';
import Tesseract from 'tesseract.js';

export default class mainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            reverse: false,
            filterText: '',
            choosen: null,
            loading: true,
            chosenFN: '',
            chosenLN: '',
            chosenPhone: '',
            chosenEmail: '',
            chosenDescription: '',
            chosenLength: null
        }
        this.handleSort = this.handleSort.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleShowMore = this.handleShowMore.bind(this);
        this.dataFilter = this.dataFilter.bind(this);
        this.chooseLength = this.chooseLength.bind(this);
    }

    chooseLength = (length) => {
        this.setState({chosenLength: length});
        return (
            fetch(`http://www.filltext.com/?rows=${length == 'Small' ? 30 : 156}&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`)
            .then((res) => res.json())
            .then((resJson) => {
                this.setState({ data: resJson });
            })
            .then(() => {
                this.setState({ loading: false });
                let data = this.state.data.sort((a, b) => b.id - a.id)[0];

                this.setState({ chosenFN: data.firstName, chosenLN: data.lastName, chosenPhone: data.phone, chosenEmail: data.email, chosenDescription: data.description });

                this.stickyScroll();
            })
            .catch((err) => console.error(err))
        );
    }

    componentWillUpdate = () => {
        this.stickyScroll();
    }

    handleSort = () => {
        this.setState ({ reverse: !this.state.reverse });
    }

    handleFilter = (e) => {
        this.setState (
            { [e.target.name]: e.target.value }
        );
    }

    handleShowMore = (e) => {
        const target = e.target.parentElement;
        const idWhichShow = target.getAttribute('data-table');
        const { choosen, data } = this.state;

        console.log(target.getAttribute('data-table'));

        function whatToShow(db) {
            return db.id === Number(idWhichShow);
        }

        const chosenData = data.find(whatToShow);

        this.setState({ choosen: idWhichShow });
        this.setState({ chosenFN: chosenData.firstName, chosenLN: chosenData.lastName}) 
        
    }

    stickyScroll = (e) => {
        $('.ui.sticky')
            .sticky({
                context: "#context"
            }, 'refresh');
    }

    dataFilter = (el) => {
        const { filterText } = this.state;
        return (
            JSON.stringify(el).toLowerCase().includes(filterText)
        )
    }

    paginator = () => {
        const { data } = this.state;
        const filteredData = data.filter(this.dataFilter);
        let pageLength = null;
        
        for(var i = 1; (filteredData.length - i * 50) > -50; i++) {
            pageLength = i;
        }
        const linksItems = new Array(pageLength).fill(null).map((page, index) => {
            return (
                <NavLink exact to={`/page${Number(index + 1)}`} key={index + 1} className="item">{index + 1}</NavLink>
            );
        });
        return linksItems;
    }

    chevron = (direction) => {
        const { params } = this.props.match;
        const { data } = this.state;
        let page = Number(params.page);

        const filteredData = data.filter(this.dataFilter);

        return (
          <NavLink 
            to={
              (direction === "left")
                ? ((page - 1) > 0) && `/page${page - 1}`
                : ((filteredData.length - page * 50) > 0) && `/page${page + 1}`
            }
            className={classnames(
                "ui item", { disabledBtn: 
                    ((direction == "left") && page - 1 == 0) ||
                    ((direction == "right") && filteredData.length - page * 50 < 0)
                } 
            )}
          >
              <i 
                className={
                  classnames(
                    (direction === "left")
                      ? "icon chevron left"
                      : "icon chevron right"
                  )
                } 
              />
          </NavLink>
        );
    }

    table = () => {
        const Line = (props) => {
          const { id, showMore, firstName, lastName, email, phone, address } = props;
          const inlineStyle = { cursor: 'pointer' };
      
          return (
            <tr
              data-table={id}
              onClick={showMore}
              style={inlineStyle}
              className={classnames("tableLine", {active: id == this.state.choosen})}
            >
              <td>{id}</td>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{email}</td>
              <td>{phone}</td>
              <td>{address.streetAddress} <strong>{address.city}</strong> {address.state}</td>
            </tr>
          );
        };

        const { params } = this.props.match;
        const { data, reverse } = this.state;
        const page = (params.page) ? parseInt(params.page, 10) : 1;

        const filteredData = data.filter(this.dataFilter);
        const sortedData = (reverse)
          ? filteredData.sort((a, b) => a.id - b.id)
          : filteredData.sort((a, b) => b.id - a.id);
        const slicedData = sortedData.slice((page * 50) - 50, page * 50);
        const tableLines = slicedData.map((line,index) => {
            return (
                <Line
                  key={(line.id).toString()+(line.firstName).toString()}
                  showMore={this.handleShowMore}
                  {...line}
                />
            );
        });

        return tableLines;
    }

    render = () => {
        const { data, reverse, loading, filterText, chosenFN, chosenLN, chosenPhone, chosenEmail, chosenDescription, chosenLength } = this.state;
        console.log(chosenLength);
        return (
          <div>
            { chosenLength != null ? null : <ChooseScreen chooseLength={this.chooseLength} /> }
            <div className="ui divider" />
            <SearchBar 
                filterText={filterText} 
                handleFilter={this.handleFilter} 
            />
            <div className="ui divider" />
            <div className={classnames("ui", "grid internally celled", { active: loading, loader: loading })} >
                <Card loading={loading} chosen={[chosenFN, chosenLN, chosenPhone, chosenEmail, chosenDescription]}/>
                <div style={{ width: "75%" }}>
                    <div className="ui" style={ loading ? { visibility: "hidden" } : { marginBottom: "5px" }}>
                      <div className="ui right floated">
                        <div className="ui pagination menu">
                          {this.paginator()}
                        </div>
                        <div className="ui right floated pagination menu">
                          {this.chevron('left')}
                          {this.chevron('right')}
                        </div>
                      </div>
                    </div>
                    <Table 
                        loading = {loading} 
                        handleSort = {this.handleSort}
                        dataLength = {data.length}
                        reverse = {reverse}
                        table = {this.table()}
                        paginator = {this.paginator()}
                    />
                </div>
            </div>
          </div>
        );
    }
}
