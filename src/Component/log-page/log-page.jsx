import React, { Fragment } from 'react';
import './log-page.scss';
import DataTable from './data-table/dataTable'

export default class LogPage extends React.Component{
   
    render() {

        return (
            <Fragment>   
                <DataTable/>
            </Fragment>
        )
    }

}