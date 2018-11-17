import React, {Component} from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import ContainedButtons from './ContainedButtons';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: 20,
        marginRight:50,
        width: 200,
    },
});

class Form extends Component {

    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <ContainedButtons/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            classesName={styles.textField}
                            label='This is text'
                            margin='none'
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Form;