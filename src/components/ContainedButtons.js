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

const getButtonComponent = (button, classes) =>{
    return <Button variant="contained" color={button.type} className={classes.button}>{button.text}</Button>
};

function ContainedButtons(props) {
    const { classes, buttons } = props;
    return (
        <div>
            { buttons.map(button => getButtonComponent(button, classes))}
        </div>
    );
}

ContainedButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(ContainedButtons);
