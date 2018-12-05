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
            data: [],
            selectedMeasure: null
        };
    }

    componentDidMount() {
        let url = `measures/`;
        const measuresList = RestAPI().get(url, {withCredentials: true});
        measuresList.then(result => {
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

        });
    }


    setSelectedMeasure(measure){
        let id = measure._id['$oid'];
        this.setState((prevState, props) => {
            return {
                selectedMeasure: id
            };
        });
    }

    render() {
        const {classes} = this.props;
        let title = "מדדים";

        const columns = [
            { id: 'version_number', numeric: false, disablePadding: true, label: 'מספר גרסה' },
            { id: 'version_name', numeric: true, disablePadding: false, label: 'שם הגרסה' },
            { id: 'hospital_type', numeric: true, disablePadding: false, label: 'סוג בית חולים' },
            { id: 'active', numeric: true, disablePadding: false, label: 'פעיל/לא פעיל' },
            { id: 'create_date', numeric: true, disablePadding: false, label: 'תאריך יצירת גרסה' },
        ];

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
                <ContainedButtons buttons={buttons}  selectedId={this.state.selectedMeasure}/>
                <ListViewTable data={this.state.data} title={title} columns={columns} setSelectedHandler={this.setSelectedMeasure.bind(this)}/>
            </div>
        );
    }
}

export default withStyles(styles)(MeasureList);