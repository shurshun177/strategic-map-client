import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import ContainedButtons from '../components/ContainedButtons';
import ListViewTable from '../components/ListViewTable'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'


const styles = {
    'myTextStyle':{
        textDecoration: 'underline'
    }
};

class VersionList extends Component {
    render() {
        const { classes } = this.props;

        let buttons = [
            {text:'יצירת גרסה חדשה', type: 'primary' },
            {text:'עדכון גרסה', type: 'primary' },
            {text:'העתקת גרסה', type: 'primary' },
            {text:'מחיקת גרסה', type: 'secondary' }
        ];
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
                <ListViewTable/>
            </div>
        );
    }
}

export default withStyles(styles)(VersionList);
