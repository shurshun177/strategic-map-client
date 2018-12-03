import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import ContainedButtons from '../components/ContainedButtons';
import ListViewTable from '../components/ListViewTable'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import RestAPI from '../api';


const styles = {
    'myTextStyle':{
        textDecoration: 'underline'
    }
};

class MeasureList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        let url = `measures/`;
        const measuresList = RestAPI().get(url, {withCredentials: true});
        measuresList.then(result => {
            let data = result;
            this.setState((prevState, props) => {
                return {
                    data: data
                };
            });

        }).catch((error) => {

        });
    }

    render() {
        const {classes} = this.props;
        let buttons = [
            {text:'יצירת מדד חדש', type: 'primary', 'url': '/measure-details' },
            {text:'עדכון מדד', type: 'primary', 'url': '/measure-details' },
            {text:'העתקת מדד', type: 'primary', 'url':'/measure-details' },
            {text:'מחיקת מדד', type: 'secondary', 'url': '/measure-details' }
        ];
        return (
            <div>
                <Toolbar>
                    <Typography variant="h4"
                                color="inherit"
                                align="center"
                                className={classes.myTextStyle}>
                        מסך רשימת מדדים
                    </Typography>
                </Toolbar>
                <ContainedButtons buttons={buttons}/>
                <ListViewTable/>
            </div>
        );
    }
}

export default withStyles(styles)(MeasureList);