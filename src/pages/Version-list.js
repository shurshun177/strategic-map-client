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
    root:{
        'flex-direction':'row',
        'justify-content':'center'
    },
    'myTextStyle': {
        //textDecoration: 'underline',
        'flex-direction':'row',
        'justify-content':'center'
    }
};

class VersionList extends Component {

    constructor(props) {
        super(props);
        this.onDeleteClick = this.onDeleteClick.bind(this)
        this.handleSearch = this.handleSearch.bind(this);

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
        updatedVersion.then(() => {
            this.setState((prevState, props) => {
                return {
                    selectedVersion: null,
                    data: prevState.data.filter(el=>el._id['$oid'] !== prevState.selectedVersion)
                };
            });


        }).catch((error) => {
            console.log(error);
            alert('version was not deleted')
        });
    }
    onDialogCancel = () => {
        this.setState({ open: false });
    };

    onDialogDelete = ()=>{
        this.setState({ open: false }, ()=>{
            this.updateVersionStatus.bind(this)();
        });

    };



    onDeleteClick(e){
        e.preventDefault();
        //TODO check if state is changed
        this.setState({ open: true });
    };

    handleSearch(searchWord){
        let url = `version/search/${searchWord}`;
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

    render() {
        const {classes} = this.props;

        let buttons = [
            {text:'יצירת גרסה חדשה', variant:'outlined', size: 'large', type: 'primary', 'url': '/app/version-details', couldBeDisabled: false, hasId: false },
            {text:'עדכון גרסה', variant:'outlined', size: 'large', type: 'primary', 'url':'/app/version-update', couldBeDisabled: true},
            {text:'העתקת גרסה', variant:'outlined', size: 'large', type: 'primary', 'url':'/app/version-copy', couldBeDisabled: true },
            {text:'מחיקת גרסה', variant:'outlined', size: 'large', type: 'secondary', 'onClick': this.onDeleteClick, couldBeDisabled: true  }
        ];


        const columns = [
            { id: 'version_number', numeric: false, disablePadding: true, label: 'מספר גרסה'},
            { id: 'version_name', numeric: true, disablePadding: false, label: 'שם הגרסה' },
            { id: 'hospital_type', numeric: true, disablePadding: false, label: 'סוג בית חולים' },
            { id: 'active', numeric: true, disablePadding: false, label: 'פעיל/לא פעיל', isActive: true },
            { id: 'create_date', numeric: true, disablePadding: false, label: 'תאריך יצירת גרסה', isTimestamp: true},
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
            <div className="main-content">
                <div className="table-title">
                <Toolbar>

                    <Typography variant="h4"
                                color="primary"
                                className={classes.myTextStyle}>
                         ניהול גרסאות
                    </Typography>
                </Toolbar>
                </div>

                <ContainedButtons buttons={buttons} selectedId={this.state.selectedVersion}/>
                <ListViewTable data={this.state.data} title={title} columns={columns} setSelectedHandler={this.setSelectedVersion.bind(this)}
                               handleSearch ={this.handleSearch.bind(this)}
                />
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"האם ברצונך למחוק את הגרסה ?"}</DialogTitle>
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

export default withStyles(styles)(VersionList);