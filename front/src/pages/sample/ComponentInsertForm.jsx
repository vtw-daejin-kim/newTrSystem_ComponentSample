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
//  CustomLabelValue  : 라벨과 입력 폼을 하나의 SET으로 묶어놓은 컴포넌트
//  CustomCdComboBox  : 사전에 정해진 코드값을 파라미터로 넘길 시 해당 코드에 대한 VALUE를 선택지로 넘겨주고, 값 선택시 코드를 RETURN해주는 컴포넌트
//  HtmlEditBox       : 내용 입력 시 사용하는 Html 편집기 컴포넌트
//====================================
const ComponentInsertForm = () => {
      const navigate = useNavigate();
      const location = useLocation();

      //const editMode = location.state.editMode;
      let editMode;
      //const userId = location.state.userId;

      const empId = "75034125-f287-11ee-9b25-000c2956283f";
      const date = moment();

      const { tbNm, labelValue , cdComboBoxValue, dateValue, htmlValue}  = ComponentInsertFormJson


      const [atchmnFl, setAtchmnFl] = useState([]);           //등록 첨부파일
      const [newAtchmnFl, setNewAtchmnFl] = useState([]);     //수정시에 기존 파일을 보여주기 위한 객체
      const [deleteFiles, setDeleteFiles] = useState([{}]);   //수정시에 첨부파일 개별삭제에 필요한 함수

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
        Object.values(atchmnFl).forEach((atchmnFl) => formData.append("attachments", atchmnFl))
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
        setAtchmnFl(e.value)
        setSaveData({
          ...saveData, 
          atchmnflId : ( editMode === 'update' && saveData.atchmnflId !== null ) ? saveData.atchmnflId : uuid()
        })
      }


      return (
        <div className="container">
            <div className="title p-1" style={{ marginTop: "20px", marginBottom: "10px" }}>
                <h1 style={{ fontSize: "40px" }}>ComponentInsertForm Sample</h1>
            </div>
            <div className="col-md-10 mx-auto" style={{ marginBottom: "10px" }}/>
              <Form>
                  <Item>
                      {
                        //====================================================
                        // CustomLabelValue 프로퍼티스 
                        // - props(map)
                        // --- type : 데이터를 입력할 폼 타입 ex) TextBox, ComboBox, NumberBox, DateBox
                        // --- name : 입력폼 구분자로 key 값으로 사용
                        // --- label : 입력폼 구분자로 화면에 표출되는 값으로 사용
                        // --- required : true or false로 필수값 지정, 필수값 지정 시 유효값 체크하게 됨.
                        // --- placeholder : 데이터가 없을 때 입력창에 표출될 텍스트
                        // --- param : ComboBox로 타입을 지정시 ComboBox 데이터 표출위한 값
                        // - onSelect(function) : 입력폼 값을 선택/입력 후 발생할 함수
                        // - value(String) : 변경되는 입력컴포넌트의 값
                        // - readOnly(Boolean) : readOnly 여부를 true/false 로 지정 
                      }
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
                          showClearButton={true}      //clearButton 유무
                          param="VTW020"              //(String) 컴포넌트에 들어갈 조회대상 테이블의 정보
                          placeholderText="[성별]"    // (String)placeholder 값
                          name="userSexcd"            // (String) 콤보박스의 이름
                          onSelect={handleChgState}   // (function) 선택 후 발생할 함수
                          value={saveData.userSexcd}  // (Object) 값을 리턴해줄 곳 
                          label="성별"                // (String) 좌측에 붙는 라벨
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