import React, { Fragment } from 'react';
import './crm-form.scss';
import { withRouter } from 'react-router-dom';
import { MDBRow, MDBCol, MDBInput, MDBBtn} from 'mdbreact';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormValidator from '../../Utility/FormValidator';
import AppConfig from '../../AppConfig';


class CRMForm extends React.Component {

    constructor() {
        super();
        this.validator = new FormValidator([
            {
                field: "form.patient.name",
                method: 'isEmpty',
                validWhen: false,
                message: 'First Name is required.'
            },
            {
                field: "form.patient.brand",
                method: 'isEmpty',
                validWhen: false,
                message: 'Brand is required.'
            },
            // {
            //   field: 'phone', 
            //   method: 'matches',
            //   args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/], // args is an optional array of arguements that will be passed to the validation method
            //   validWhen: true, 
            //   message: 'That is not a valid phone number.'
            // },
            // {
            //     field: 'lastName',
            //     method: 'isEmpty',
            //     validWhen: false,
            //     message: 'Last Name is required.'
            // }
        ]);
        this.state = {
            form: {
                patient: {
                    name: "",
                    brand:"",
                    price: "",
                    quantity: "",
                    expDate: "",
                    notes: ""
                }
            },
            validation: this.validator.valid(),
        }
    }
   
  
    dateFormater = (date) => {
        if (date) {
            let currentDate = new Date(date);
            return (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();
        }
    }
    expDate = (date) => {
        let form = { ...this.state.form }
        form.patient.dob = this.dateFormater(date);
        this.setState({ form: form })
    }

      handleChange = (parent, child, index, event) => {
        let form = { ...this.state.form }
        if (index !== null) {
            form[parent][index][child] = event.target.value;
        }
        else if (child) {
            form[parent][child] = event.target.value;
        } else {
            form[parent] = event.target.value
        }

        this.setState({ form: form })
    }
  
  
    sendRequest = async () => {
      this.props.history.push("/logs-page")
    }
 

  

 
    render() {
        let validation = this.state.isFormSubmiteClicked ?                         // if the form has been submitted at least once
            this.validator.validate(this.state) :   // then check validity every time we render
            this.state.validation;                // otherwise just use what's in state
        return (<Fragment>
            <section className="crm-form-conatiner">
                {/* <h3><strong>CRM Form: </strong></h3> */}
                <MDBRow>
                    

                   <Fragment>
                        <MDBRow className="crmObjects">
                            <MDBCol md="12"><h3>Add Record</h3></MDBCol>
                            <MDBCol md="6">
                                <div className="form-group">
                                    <div className={validation['form.patient.name'].isInvalid ? 'has-error' : ''}>
                                        <MDBInput label="Name" onChange={this.handleChange.bind(this, 'patient', 'name', null)} value={this.state.form.patient.name} size="md" />
                                        <span className="help-block">{validation['form.patient.name'].message}</span>
                                    </div>
                                </div>
                            </MDBCol>
                            <MDBCol md="6">
                                <div className="form-group">
                                    <MDBInput label="Brand" onChange={this.handleChange.bind(this, 'patient', 'brand', null)} value={this.state.form.patient.brand} size="md" />
                                </div>
                            </MDBCol>
                            <MDBCol md="6">
                                <div className="form-group">
                                    <MDBInput label="Quantity" onChange={this.handleChange.bind(this, 'patient', 'quantity', null)} value={this.state.form.patient.quantity} size="md" />
                                </div>
                            </MDBCol>
                            <MDBCol md="6">
                                <div className="form-group">
                                    <MDBInput label="Price" onChange={this.handleChange.bind(this, 'patient', 'price', null)} value={this.state.form.patient.price} size="md" />
                                </div>
                            </MDBCol>
                           
                            <MDBCol md="6">
                                <div className="form-group">
                                    <MDBInput label="Notes" onChange={this.handleChange.bind(this, 'patient', 'notes', null)} value={this.state.form.patient.notes} size="md" />
                                </div>
                            </MDBCol>
                           <MDBCol md="6">
                                <div className="form-group">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker className="datePicker"
                                            autoOk="true"
                                            disableFuture="true"
                                            variant="inline"
                                            inputVariant="standard"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="DOB"
                                            label="Date of Birth"
                                            value={this.state.form.patient.expDate ? new Date(this.state.form.patient.expDate) : null}
                                            onChange={this.expDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'expDate',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </MDBCol>
                        </MDBRow>
                       
                       
                    </Fragment>
                    
                </MDBRow>
            </section>
            <MDBRow className="crmBtnContainer bottom">
               
                <MDBBtn className="submitRequest" color="primary" onClick={this.sendRequest} rounded size="sm">Submit Request</MDBBtn>
            </MDBRow>
        </Fragment>
        )
    }
}

export default withRouter(CRMForm);