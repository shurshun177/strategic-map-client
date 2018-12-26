import React, { Component } from 'react';
import Form from '../components/Form'
import RestAPI from '../api';
import { Route, Redirect } from 'react-router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


class ListBox extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
    let list = this.props.measureNamesList

    }

    render() {
//    let list = this.props.measureNamesList
//        return (
//            <div>
////             {list.map((item, index) => (
////             <Item key={index} item={item} />
////                )}
//            </div>
//        );
    }
}

export default ListBox;