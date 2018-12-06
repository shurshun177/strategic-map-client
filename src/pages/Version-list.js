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
            data: [],
            selectedVersion: null
        };
    }

    componentDidMount() {
        let url = `versions/`;
        const versionsList = RestAPI().get(url, {withCredentials: true});
        versionsList.then(result => {
            let data = result.data.items.map(el=>{
               el.create_date = el.create_date['$date'];
               return el;
            });
            this.setState((prevState, props) => {
                return {
                    data
                };
            });

        }).catch((error) => {
            console.log(error);
        });
    }

    setSelectedVersion(version){
        let id = version._id['$oid'];
        this.setState((prevState, props) => {
            return {
                selectedVersion: id
            };
        });
    }

    updateVersionStatus(){
        let url = `version/del_vers/${this.state.selectedVersion}/`;
        const updatedVersion = RestAPI().put(url, {withCredentials: true});
        updatedVersion.then(result => {
            alert('version was deleted succcessfully')
            // let data = result.data.items.map(el=>{
            //     el.create_date = el.create_date['$date'];
            //     return el;
            // });
            // this.setState((prevState, props) => {
            //     return {
            //         data
            //     };
            // });

        }).catch((error) => {
            console.log(error);
            alert('version was not deleted')
        });
    }

    render() {
        const {classes} = this.props;

        let buttons = [
            {text:'יצירת גרסה חדשה', type: 'primary', 'url': '/version-details' },
            {text:'עדכון גרסה', type: 'primary', 'url':'/version-details'},
            {text:'העתקת גרסה', type: 'primary', 'url':'/version-details' },
            {text:'מחיקת גרסה', type: 'secondary', 'onClick': this.updateVersionStatus.bind(this)  }
        ];


        // let columns = [
        //     {title: 'תאריך יצירת גרסה', field: 'create_date'},
        //     {title: 'פעיל/לא פעיל', field: 'active'},
        //     {title: 'סוג בית חולים', field: 'hospital_type'},
        //     {
        //         title: 'שם גרסה',
        //         field: 'version_name',
        //     },
        //     {
        //         title: 'מספר גרסה',
        //         field: 'version_number',
        //     },
        // ];

        const columns = [
            { id: 'version_number', numeric: false, disablePadding: true, label: 'מספר גרסה' },
            { id: 'version_name', numeric: true, disablePadding: false, label: 'שם הגרסה' },
            { id: 'hospital_type', numeric: true, disablePadding: false, label: 'סוג בית חולים' },
            { id: 'active', numeric: true, disablePadding: false, label: 'פעיל/לא פעיל' },
            { id: 'create_date', numeric: true, disablePadding: false, label: 'תאריך יצירת גרסה' },
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
                <ContainedButtons buttons={buttons} selectedId={this.state.selectedVersion}/>
                <ListViewTable data={this.state.data} title={title} columns={columns} setSelectedHandler={this.setSelectedVersion.bind(this)}/>
            </div>
        );
    }
}

export default withStyles(styles)(VersionList);