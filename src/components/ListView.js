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
                                {title: 'מספר גרסה', field: 'versionNumber'},
                                {title: 'סוג בית חולים', field: 'hospitalType'},
                                {title: 'שם גרסה', field: 'versionName', type: 'numeric'},
                                {
                                    title: 'סוג גרסה',
                                    field: 'versionType',
                                },
                                {
                                    title: 'פעיל/לא פעיל',
                                    field: 'active',
                                },
                            ]}
                            data={[
                                {
                                    versionNumber: '1234',
                                    hospitalType: 'כללים',
                                    versionName: 'שם',
                                    versionType: 63,
                                    active: 'פעיל'
                                },
                                {
                                    versionNumber: '1234',
                                    hospitalType: 'כללים',
                                    versionName: 'שם',
                                    versionType: 63,
                                    active: 'פעיל'
                                },
                                {
                                    versionNumber: '1234',
                                    hospitalType: 'כללים',
                                    versionName: 'שם',
                                    versionType: 63,
                                    active: 'פעיל'
                                },
                                {
                                    versionNumber: '1234',
                                    hospitalType: 'כללים',
                                    versionName: 'שם',
                                    versionType: 63,
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
                                search: true,
                                toolbar: false,
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