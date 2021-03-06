import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//import FlatButton from
import {Link} from 'react-router-dom';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


class ContainedButtons extends Component{
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         selectedId: null
    //     };
    // }
    //
    // isButtonDisabled(){
    //    return this.props.selectedId === null;
    // }

    getButtonComponent(button, classes){
        if (button.onClick){
            return <Button
                variant={button.variant} size={button.size} color={button.type} className={classes.button}
                onClick={button.onClick} disabled={this.props.selectedId === null && button.couldBeDisabled}
            >{button.text}
            </Button
            >
        }
        else{
            return <Button
                component={Link} to={button.hasId?`${button.url}/${this.props.selectedId}`:`${button.url}`}
                variant={button.variant} color={button.type} className={classes.button} disabled={this.props.selectedId === null && button.couldBeDisabled}>{button.text}
            </Button
            >
        }
    }

    render(){
        const { classes, buttons } = this.props;

       return (
        <div className="fixedFormToolbar">
            { buttons.map(button => this.getButtonComponent(button, classes))}
        </div>
        );
    }

}

ContainedButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(ContainedButtons);
