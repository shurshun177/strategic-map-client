import React, {Component} from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table'
import ContainedButtons from './ContainedButtons';

class ListView extends Component {
    render() {
        const {data, title, columns} = this.props;

        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <ContainedButtons/>
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialTable
                            columns={columns}
                            data={data}
                            title={title}
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