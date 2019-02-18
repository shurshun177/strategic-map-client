import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

class CheckboxContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedItems: [],
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        if (isChecked){
            this.setState(prevState => {
                prevState.checkedItems.push(item);
                this.props.handleHospitalTypes(prevState.checkedItems);
                return {
                    checkedItems: prevState.checkedItems
                }})
        }
        else {
            this.setState(prevState => {
                let index =  prevState.checkedItems.indexOf(item);
                if(index !== -1){
                    prevState.checkedItems.splice(index);
                }
                this.props.handleHospitalTypes(prevState.checkedItems);
                return {
                    checkedItems: prevState.checkedItems
                }
            });
        }
    }

    isChecked(key){
        return this.state.checkedItems.includes(key) || this.props.selectedValues.includes(key);
    }

    render() {
        let {checkboxes} = this.props;
        return (
            <React.Fragment>
                <div>
                {
                    checkboxes.map(item => (
                        <FormControlLabel
                            control={
                                <Checkbox name={item.key}
                                          checked={this.isChecked(item.key)}
                                          onChange={this.handleChange}
                                          color="primary"
                                />
                            }
                            label={item.name}
                        />

                    ))
                }
                </div>

            </React.Fragment>
        );
    }
}

export default CheckboxContainer;