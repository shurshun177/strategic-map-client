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
            console.log(error);
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

    updateMeasureStatus(){
        let url = `measure/del_measure/${this.state.selectedMeasure}/`;
        console.log(this.state.selectedMeasure)
        const updatedMeasure = RestAPI().put(url, {withCredentials: true});
        updatedMeasure.then(() => {
            this.setState((prevState, props) => {
                return {
                    selectedMeasure: null,
                    data: prevState.data.filter(el=>el._id['$oid'] !== prevState.selectedMeasure)
                };
            });

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
            alert('measure was not deleted')
        });
    }

    render() {
        const {classes} = this.props;

        let buttons = [
            {text:'יצירת מדד חדש', type: 'primary', 'url': '/measure-details' },
            {text:'עדכון מדד', type: 'primary', 'url':'/measure-update'},
            {text:'העתקת מדד', type: 'primary', 'url':'/measure-copy' },
            {text:'מחיקת מדד', type: 'secondary', 'onClick': this.updateMeasureStatus.bind(this)  }
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
            { id: 'measure_code', numeric: false, disablePadding: true, label: 'קןד מדד' },
            { id: 'measure_name', numeric: true, disablePadding: false, label: 'שם מדד' },
            { id: 'hospital_type', numeric: true, disablePadding: false, label: 'סוג בית חולים' },
            { id: 'active', numeric: true, disablePadding: false, label: 'פעיל/לא פעיל', isActive: true },
        ];

        let title = "מדדים";
        return (
            <div className="main-content">
                <Toolbar>
                    <Typography variant="h4"
                                color='secondary'
                                align='center'

                                className={classes.myTextStyle}>
                        מסך רשימת מדדים
                    </Typography>
                </Toolbar>
                <ContainedButtons buttons={buttons} selectedId={this.state.selectedMeasure}/>
                <ListViewTable data={this.state.data} title={title} columns={columns} setSelectedHandler={this.setSelectedMeasure.bind(this)}/>
            </div>
        );
    }
}

export default withStyles(styles)(MeasureList);