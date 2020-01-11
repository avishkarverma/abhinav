import 'date-fns';
import React from 'react';
import './data-table.scss';
import { withRouter } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBBtn} from 'mdbreact';
import ApiServices from '../../../Services/Api-service';

var Loader = require('react-loader');
const $ = require('jquery');
$.DataTable = require('datatables.net-responsive-dt');

class DatatablePage extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      dataTable: null,
      modal: false,
      selectedId:"",
      data: {
        columns: [
          {
            title: 'Name',
            data: 'name',
          },
          {
            title: 'Brand',
            data: 'brand',
          },
          {
            title: 'Price',
            data: 'price',
          },
          {
            title: 'Quantity',
            data: 'quantity',
          },
          {
            title: 'ExpDate',
            data: 'expDate',
          },
          {
            title: 'Notes',
            data: 'notes',
          }
        ],
        rows: []
      },
    }
    this.loadLogs();
  }
 
  displayDataTable = () => {
    this.state.dataTable.clear().draw();
    this.state.dataTable.rows.add(this.state.data.rows); // Add new data
    this.state.dataTable.columns.adjust().draw();
  }



   getInitialState = function () {
    return { loaded: false};
  }

  componentDidMount = () => {
    this.setState({loaded: true });
    let table = $('#myTable').DataTable({
      searching: true,
      ordering: true,
      responsive: true,
      columns: this.state.data.columns,
      data: this.state.data.rows,
      order: [[0, 'desc']],
      "dom": '<"top"lfp<"clear">>rt<"bottom"ip<"clear">>',
      paging: true,
      columnDefs: [
        {
          "visible": true,
          "searchable": true
        }
      ], rowCallback: (row, data, index) => {
        const self = this;
        $("td a." + data.FirstName, row).bind("click", () => {
          self.getpatientidDetail(data);
        });

        return row;
      }
    })
  
    this.setState({ dataTable: table });
    
  }

 loadLogs = (url) => {
    url = typeof url !== "object" ? url : "";
    this.setState({loaded: false });
    ApiServices.OCRReprocess(url).subscribe(response => {
      response = [{
        name:"testName1",
        brand: "brand1",
        price: "2",
        quantity: "1",
        expDate: "17/03/1993",
        notes: "dummyNotes"
      }];
      if (response) {
        let dataObj = {
          columns: this.state.data.columns,
          rows: response
        }
        this.setState({ data: dataObj }, function () {
          this.displayDataTable();
          this.setState({loaded: true });
        });
        //More record need to load
      }
    }, err => {
      this.setState({loaded: true });
      this.loadingMoreData = false;
      this.nextUrl = ""
      let response = [{
        name:"testName1",
        brand: "brand1",
        price: "2",
        quantity: "1",
        expDate: "17/03/1993",
        notes: "dummyNotes"
      },
      {
        name:"testName1",
        brand: "brand1",
        price: "2",
        quantity: "1",
        expDate: "17/03/1993",
        notes: "dummyNotes"
      }];
      if (response) {
        let dataObj = {
          columns: this.state.data.columns,
          rows: response
        }
        this.setState({ data: dataObj }, function () {
          this.displayDataTable();
          this.setState({loaded: true });
        });
        //More record need to load
      }
      console.error(err);
    })
  }
  navigateToAddRecord = () => {
    this.props.history.push("/crm");
  }
  
  render() {
    return (
      <MDBContainer fluid className="logPage-container">
      <Loader loaded={this.state.loaded}  className= "custom-loader">
        </Loader>
        

        <MDBBtn onClick={this.navigateToAddRecord}>Add Record</MDBBtn>
          <MDBRow >
            <div className="datatable-container srStatus-table list-section ">
              <table id="myTable" className="row-border hover">
              </table>
            </div>
          </MDBRow>
      </MDBContainer>
        )
      }
    }
    
    export default withRouter(DatatablePage);
