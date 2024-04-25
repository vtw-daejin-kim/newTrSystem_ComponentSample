import { Button, FileUploader } from 'devextreme-react';
import Form, { GroupItem, Item, Label, SimpleItem } from 'devextreme-react/form';
import { useState, useEffect } from "react";
import ComponentInsertFormJson from "./ComponentInsertFormJson.json";
import CustomLabelValue from 'components/unit/CustomLabelValue';
import CustomCdComboBox from 'components/unit/CustomCdComboBox';
import HtmlEditBox from 'components/unit/HtmlEditBox';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import ApiRequest from 'utils/ApiRequest';
import uuid from 'react-uuid';
import moment from 'moment';

//====================================
//  ComponentInsertForm  샘플 소스
//  단일컴포넌트로 이루어진 insert form 샘플
//
//  사용 공통 컴포넌트
// 
//  CustomLabelValue  : 
//  CustomCdComboBox  :
//  HtmlEditBox       :
//====================================
const ComponentInsertForm = () => {
      const navigate = useNavigate();
      const location = useLocation();

      //const editMode = location.state.editMode;
      //const userId = location.state.userId;

      const empId = "75034125-f287-11ee-9b25-000c2956283f";
      const date = moment();

      const { tbNm, labelValue , cdComboBoxValue, dateValue, htmlValue}  = ComponentInsertFormJson

      const [htmlData, setHtmlData] = useState()
      const [saveData, setSaveData] = useState({
        userId : uuid()
      });

      //저장버튼클릭이벤트
      const onClick = () => {
        const result = window.confirm("등록하시겠습니까?");
        if (result) insertUser();
      }
      //insert 이벤트 
      const insertUser = async() => {
        setSaveData({
          ...saveData,
          regEmpId : empId,
          regDt : date.format('YYYY-MM-DD HH:mm:ss')
        })

        const formData = new FormData();
        formData.append("tbNm", JSON.stringify({tbNm : tbNm}));
        formData.append("data", JSON.stringify(saveData));

        try {
          const response = await axios.post("/boot/common/insertlongText", formData, {
            headers : {'Content-Type': 'multipart/form-data'}
          })

          if(response.data >= 1){
            navigate("/sample/CustomAddTableSample");   //저장후에 상세페이지 보여주기(수정예정)
          }

        } catch(error) {
          console.error("API 요청 에러:", error);
        }
      }

      //TextBox 입력 시 이벤트
      const handleChgState = ({name, value}) => {
          setSaveData({
              ...saveData,
              [name] : value
            })
      }
      
      //첨부파일 관련
      const handleAttachmentChange = (e) => {

      }


      return (
        <div className="container">
            <div className="title p-1" style={{ marginTop: "20px", marginBottom: "10px" }}>
                <h1 style={{ fontSize: "40px" }}>ComponentInsertForm Sample</h1>
            </div>
            <div className="col-md-10 mx-auto" style={{ marginBottom: "10px" }}/>
              <Form>
                  <Item>
                      <CustomLabelValue props={labelValue.userEmpno} onSelect={handleChgState} value={saveData.userEmpno}/>
                      <CustomLabelValue props={labelValue.userNm} onSelect={handleChgState} value={saveData.userNm}/>
                      <CustomLabelValue props={labelValue.userTelno} onSelect={handleChgState} value={saveData.userTelno}/>
                      <CustomLabelValue props={labelValue.userEml} onSelect={handleChgState} value={saveData.userEml}/>
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
                          onSelect={handleChgState}
                          value={saveData.userSexcd}
                          label="성별"
                      />
                  </Item>
                  <Item>
                      <CustomLabelValue props={labelValue.userBrdt} onSelect={handleChgState} value={saveData.userBrdt}/>
                  </Item>
                  <Item>
                      <HtmlEditBox
                        column={htmlValue.userEtc}
                        data={saveData}
                        setData={setSaveData}
                        //value={htmlData.userEtc === undefined ? "" : htmlData.userEtc === undefined}
                        placeholder={htmlValue.userEtc.placeholder}
                      />
                  </Item>
              </Form>
              <div>
                <span>* 파일 용량은 1.5GB</span>까지 가능합니다.
                <FileUploader
                    multiple={true}
                    accept="*/*"
                    uploadMode="useButton"
                    onValueChanged={handleAttachmentChange}
                    maxFileSize={1.5 * 1024 * 1024 * 1024}
                />
              </div>
          <Button text = "저장" onClick={onClick} useSubmitBehavior={true}/>
        </div>
      );
}

export default ComponentInsertForm;