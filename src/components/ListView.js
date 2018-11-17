import React, {Component} from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table'
import ContainedButtons from './ContainedButtons';

class ListView extends Component {

    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <ContainedButtons/>
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialTable
                            columns={[
                                {title: 'תאריך יצירת גרסה', field: 'createDate'},
                                {title: 'פעיל/לא פעיל', field: 'active'},
                                {title: 'סוג בית חולים', field: 'hospitalType'},
                                {
                                    title: 'שם גרסה',
                                    field: 'versionName',
                                },
                                {
                                    title: 'מספר גרסה',
                                    field: 'versionNumber',
                                },
                            ]}
                            data={[
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
                            ]}
                            title="גרסאות"
                            actions={[
                                {
                                    icon: 'done_all',
                                    tooltip: 'Do',
                                    onClick: (event, rows) => {
                                        alert('You selected ' + rows.length + ' rows')
                                    },
                                },
                            ]}
                            options={{
                                selection: true,
                                search: false,
                                toolbar: true,
                                paging: false,
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default ListView;