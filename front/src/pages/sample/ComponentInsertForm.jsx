import { Button } from 'devextreme-react';
import Form, { GroupItem, Item, Label, SimpleItem } from 'devextreme-react/form';
import { useState, useEffect } from "react";
import ComponentInsertFormJson from "./ComponentInsertFormJson.json";
import CustomLabelValue from 'components/unit/CustomLabelValue';
import CustomDateRangeBox from 'components/unit/CustomDateRangeBox';
import CustomCdComboBox from 'components/unit/CustomCdComboBox';
import HtmlEditBox from 'components/unit/HtmlEditBox';

const ComponentInsertForm = () => {
    const { labelValue } = ComponentInsertFormJson
    const [formData, setFormData] = useState({});
    
      const handleSubmit = (e) => {
        console.log("handleSubmit : ", e)
      };
    
      const handleFieldChange = (fieldName) => (value) => {
        setFormData({ ...formData, [fieldName]: value });
      };
      
      const handleStartDateChange = (e) => {

      }

      const handleEndDateChange = (e) => {

      }
      
      const handleChgState = ({name, value}) => {
        console.log("handleChgState name", name)
        console.log("handleChgState value", value)
      }

      return (
        <div className="container">
            <div className="title p-1" style={{ marginTop: "20px", marginBottom: "10px" }}>
                <h1 style={{ fontSize: "40px" }}>ComponentInsertForm Sample</h1>
            </div>
            <div className="col-md-10 mx-auto" style={{ marginBottom: "10px" }}>
                <span> Component Sample </span>
            </div>
            <Form>
                <Item>
                    <CustomLabelValue props={labelValue.userEmpno} onSelect={handleChgState}/>
                    <CustomLabelValue props={labelValue.userNm} onSelect={handleChgState}/>
                    <CustomLabelValue props={labelValue.userTelno} onSelect={handleChgState}/>
                    <CustomLabelValue props={labelValue.userEml} onSelect={handleChgState}/>
                </Item>
                <Item
                  className="userSexcd"
                  dataField="성별"
                >
                    <CustomCdComboBox
                        showClearButton={true}
                        param="VTW020"
                        placeholderText="[성별]"
                        name="userSexcd"
                        //onSelect={handleChgStleCd}
                        //value={data.prjctStleCd}
                        //readOnly={readOnly}
                        //required={true}
                        label="성별"
                    />
                </Item>
                <Item>
                    <CustomLabelValue props={labelValue.userBrdt} onSelect={handleChgState}/>
                </Item>
                <Item>
                    {/* <HtmlEditBox/> */}
                </Item>
            </Form>
          <Button onClick={handleSubmit}>Submit/</Button>
        </div>
      );
}

export default ComponentInsertForm;