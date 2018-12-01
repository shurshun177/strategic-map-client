import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

import ContainedButtons from '../components/ContainedButtons';
import ListViewTable from '../components/ListViewTable'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import RestAPI from '../api';

const styles = {
    'myTextStyle': {
        textDecoration: 'underline'
    }
};

class VersionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        let url = `versions/`;
        const versionsList = RestAPI().get(url, {withCredentials: true});
        versionsList.then(result => {
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
            {text: 'צירת גרסה חדשה', type: 'primary'},
            {text: 'עדכון גרסה', type: 'primary'},
            {text: 'העתקת גרסה', type: 'primary'},
            {text: 'מחיקת גרסה', type: 'secondary'}
        ];


        let columns = [
            {title: 'תאריך יצירת גרסה', field: 'createDate'},
            {title: 'פעיל/לא פעיל', field: 'active'},
            {title: 'סוג בית חולים', field: 'hospitalType'},
            {
                title: 'שם גרסה',
                field: 'versionName',
            },
            {
                title: 'מספר גרסה',
                field: 'versionNumber',
            },
        ];


        let data = [
            {
                versionNumber: '1000',
                hospitalType: 'כללים',
                versionName: 'גרסה ינואר-אפריל 2018',

                active: 'פעיל'
            },
            {
                versionNumber: '1001',
                hospitalType: 'גריאטריים',
                versionName: 'גרסה ינואר-ספטמבר 2017',

                active: 'פעיל'
            },
            {
                versionNumber: '1002',
                hospitalType: 'כללים',
                versionName: 'שם',

                active: 'פעיל'
            },
            {
                versionNumber: '1003',
                hospitalType: 'כללים',
                versionName: 'שם',

                active: 'פעיל'
            },
        ];

        let title = "גרסאות";
        return (
            <div>
                <Toolbar>
                    <Typography variant="h4"
                                color="inherit"
                                align="center"
                                className={classes.myTextStyle}>
                        מסך רשימת גרסאות
                    </Typography>
                </Toolbar>
                <ContainedButtons buttons={buttons}/>
                <ListViewTable data={this.state.data} title={title} columns={columns}/>
            </div>
        );
    }
}

export default withStyles(styles)(VersionList);