import React, { Fragment } from "react";
import ReactExport from "react-data-export/dist/index.js";
import {MDBBtn} from 'mdbreact';
import GetAppIcon from '@material-ui/icons/GetApp';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class DownloadExcel extends React.Component {
    constructor(props) {
        super();
        this.state = {
           data: props.data,
           rows:null,
           columns:null,
           refresh: false
        }
    }
     componentWillMount() { 
        this.setState({refresh: false});
        this.setState({data:this.props.data})
        
         if(this.props.page === "current"){
            let currentObj = [];
            for(let i=0; i < document.querySelectorAll("#myTable tbody tr td").length ; ) {
             if(document.querySelectorAll("#myTable tbody tr td")[i+1]) {
                currentObj.push({
                    requestId: document.querySelectorAll("#myTable tbody tr td a")[i/5].className,
                    patient:  document.querySelectorAll("#myTable tbody tr td")[i].innerText,
                    provider:document.querySelectorAll("#myTable tbody tr td")[i+1].innerHTML,
                    product: document.querySelectorAll("#myTable tbody tr td")[i+2].innerHTML,
                    CreatedDate: document.querySelectorAll("#myTable tbody tr td")[i+3].innerHTML,
                    Status: document.querySelectorAll("#myTable tbody tr td")[i+4].innerHTML,
                })
            }
            i= i+5;
            }    
             let obj = {
                rows: currentObj,
                columns: this.props.data.columns 
            }
            this.setState({data:obj} ,
                function() {
                   this.setState({refresh: true},function(){
                       this.props.closeCurrentPage();
                   });
                })
         } else {
            this.setState({data:this.props.data});
            this.setState({refresh: true});
         }
     }
    
    render() {
        return (
            <Fragment>
            {this.state.refresh  && <ExcelFile filename="eBv" hideElement={this.props.page === "current"} element={ <MDBBtn className="getLogsBtn"  color="primary" rounded size="sm"><GetAppIcon viewBox="0 0 20 30"/> {this.props.label}</MDBBtn>}>
                <ExcelSheet data={this.state.data && this.state.data.rows.length > 0 ?this.state.data.rows: []} name="Logs">
                    {/* {
                   this.state.data && this.state.data.columns && this.state.data.columns.map(value =>  <ExcelColumn label={value.label} value={value.field}/> )
                    } */}
                    <ExcelColumn label="RequestId" value="requestId"/>
                    <ExcelColumn label="Patient" value="patient"/>
                    <ExcelColumn label="Product" value="product"/>
                    <ExcelColumn label="Provider" value="provider"/>
                    <ExcelColumn label="Created" value="CreatedDate"/>
                    <ExcelColumn label="Status" value="Status"/>   
                </ExcelSheet>
                {/* <ExcelSheet data={dataSet2} name="Leaves">
                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Total Leaves" value="total"/>
                    <ExcelColumn label="Remaining Leaves" value="remaining"/>
                </ExcelSheet> */}
            </ExcelFile>}
            </Fragment>
        );
    }
}