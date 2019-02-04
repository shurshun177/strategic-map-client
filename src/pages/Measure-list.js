import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

import ContainedButtons from '../components/ContainedButtons';
import ListViewTable from '../components/ListViewTable'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import RestAPI from '../api';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const styles = {
    'myTextStyle': {
        //textDecoration: 'underline'
    }
};

class MeasureList extends Component {

    constructor(props) {
        super(props);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.updateMeasureStatus = this.updateMeasureStatus.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.getList = this.getList.bind(this);
        this.state = {
            data: [],
            selectedMeasure: null
        };
    }

    componentDidMount() {
        this.getList();
    }

    getList(){
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

    onDialogCancel = () => {
        this.setState({ open: false });
    };

    onDialogDelete = ()=>{
        this.setState({ open: false }, ()=>{
            this.updateMeasureStatus();
        });
    };



    onDeleteClick(e){
        e.preventDefault();
        //TODO check if state is changed
        this.setState({ open: true });
    };

    handleSearch(searchWord){
        if (searchWord === '' || searchWord === ' '){
            this.getList();
        }
        else {
            let url = `measure/search/${searchWord}`;
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
                this.setState((prevState, props) => {
                    return {
                        data: []
                    };
                });
            });
        }
    }

    render() {
        const {classes} = this.props;

        let buttons = [
            {text:'יצירת מדד חדש', variant:'outlined', size: 'large', type: 'primary', 'url': '/app/measure-details', couldBeDisabled: false, hasId: false },
            {text:'עדכון מדד',  variant:'outlined', size: 'large', type: 'primary', 'url':'/app/measure-update', couldBeDisabled: true, hasId: true},
            {text:'העתקת מדד', variant:'outlined', size: 'large', type: 'primary', 'url':'/app/measure-copy', couldBeDisabled: true, hasId: true },
            {text:'מחיקת מדד', variant:'outlined', size: 'large', type: 'secondary', 'onClick': this.onDeleteClick, couldBeDisabled: true, hasId: true }
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
            { id: 'measure_code', numeric: true, disablePadding: true, label: 'קוד מדד' },
            { id: 'measure_name', numeric: true, disablePadding: true, label: 'שם מדד' },
            { id: 'hospital_type', numeric: true, disablePadding: true, label: 'סוג בית חולים' },
            { id: 'active', numeric: true, disablePadding: true, label: 'פעיל/לא פעיל', isActive: true },
        ];

        let title = "מדדים";
        return (
            <div className="main-content">
                <Toolbar>
                    <Typography variant="h4"
                                color='primary'
                                align='center'

                                className={classes.myTextStyle}>
                        ניהול מדדים
                    </Typography>
                </Toolbar>
                <ContainedButtons buttons={buttons} selectedId={this.state.selectedMeasure}/>
                <ListViewTable data={this.state.data} title={title} columns={columns} setSelectedHandler={this.setSelectedMeasure.bind(this)}
                               handleSearch ={this.handleSearch.bind(this)}/>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"האם שברצונך למחוק את המדד ?"}</DialogTitle>
                    <DialogContent>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onDialogDelete} variant='outlined' color="primary" autoFocus>
                            כן
                        </Button>
                        <Button onClick={this.onDialogCancel} variant='outlined' color="primary">
                           לא
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(MeasureList);
