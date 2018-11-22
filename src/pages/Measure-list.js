import React, { Component } from 'react';
import ContainedButtons from '../components/ContainedButtons';

import ListViewTable from '../components/ListViewTable'


class MeasureList extends Component {
    render() {
        return (
            <div>
                <ContainedButtons>
                <ListViewTable/>
            </div>
        );
    }
}

export default MeasureList;