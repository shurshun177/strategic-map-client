import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

function ContainedButtons(props) {
    const { classes } = props;
    return (
        <div>
            <Button variant="contained" className={classes.button}>
                יצירת גרסה חדשה
            </Button>
            <Button variant="contained" color="primary" className={classes.button}>
                עדכון גרסה
            </Button>
            <Button variant="contained" color="secondary" className={classes.button}>
                העתקת גרסה
            </Button>
            <Button variant="contained" color="secondary" disabled className={classes.button}>
                מחיקת גרסה
            </Button>
        </div>
    );
}

ContainedButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);
