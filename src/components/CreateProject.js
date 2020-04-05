// create.component.js

import React, { Component } from 'react';

export default class Create extends Component {
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Project</h3>
                <form>
                    <div className="form-group">
                        <label>Project Name:  </label>
                        <input type="text" className="form-control"/>
                    </div>
                     <div className="form-group">
                        <label>Project Unit:  </label>
                        <input type="text" className="form-control"/>
                    </div>


                    //multiple samples with protocol choices: single_preparation, pooling_preparation, fractionation_preparation
                    <div className="form-group">
                        <label>Sample Id: </label>
                        <input type="text" className="form-control"/>
                    </div>

                     //multiple ms runs
                    <div className="form-group">
                        <label>Ms Run Id: </label>
                        <input type="text" className="form-control"/>
                    </div>
                     <div className="form-group">
                        <label>Ms Run Name: </label>
                        <input type="text" className="form-control"/>
                    </div>
                     <div className="form-group">
                        <label>Ms Run Instrument Id: </label>
                        <input type="text" className="form-control"/>
                    </div>
//                    Options Dia_protocol, DDA_protocol
                     <div className="form-group">
                        <label>Ms Run Protocol: </label>
                        <input type="text" className="form-control"/>
                    </div>



                    <div className="form-group">
                        <input type="submit" value="Create Project" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}