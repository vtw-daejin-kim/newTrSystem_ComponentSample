import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { Button } from "devextreme-react";
import BoardInputFormSampleJson from "./BoardInputFormSampleJson.json";
import BoardInputForm from "components/composite/BoardInputForm";
import uuid from "react-uuid";
import moment from 'moment';
import axios from "axios";
import ApiRequest from "utils/ApiRequest";

//====================================
//  BoardInputForm 샘플 소스
//  게시글을 입력하기 위한 form 
//  현재 BoardInputForm 해당 컴포넌트는 공지사항과 자료실 전용으로 만들어져있는 상태
//====================================
const BoardInputFormSample = () => {
    //=======================선언구간============================//
    const navigate = useNavigate();
    const location = useLocation();

    const editMode = location.state.editMode;
    const noticeId = location.state.noticeId;

    const empId = "75034125-f287-11ee-9b25-000c2956283f";
    const date = moment();

    const { edit, queryId, tbNm } = BoardInputFormSampleJson;     

    const [attachments, setAttachments] = useState([]);                     //등록 첨부파일
    const [newAtchmnFl, setNewAtchmnFl] = useState([]);                     //수정시에 기존 파일을 보여주기 위한 객체
    const [deleteFiles, setDeleteFiles] = useState([{tbNm: "ATCHMNFL"}]);   //수정시에 첨부파일 개별삭제에 필요한 함수
    const [newAttachments, setNewAttachments] = useState(attachments);
    const [ data, setData ] = useState({
        noticeId : uuid(),
        regEmpId: empId, 
        regDt : date.format('YYYY-MM-DD HH:mm:ss')
    });
    const [typeChk, setTypeChk] = useState({
        useYn : data.useYn === "Y" ? true : false
    });
    //===========================================================//

    //수정 시에 데이터 불러오는 useEffect
    useEffect(() => {
        if(editMode === 'update') selectData();
    }, []);

    //수정 시 데이터 조회 함수
    const selectData = async() => {
        const param = {
            queryId : queryId,
            noticeId : noticeId
        }

        try{
            const response = await ApiRequest("/boot/common/queryIdSearch", param);
            if(response !== 0) {
                const { atchmnflSn, realFileNm, strgFileNm, regDt, regEmpNm, ...resData } = response[0];
                setData({ ...resData });
                const tmpFileList = response.map((data) => ({
                    realFileNm: data.realFileNm,
                    strgFileNm: data.strgFileNm,
                    atchmnflSn: data.atchmnflSn
                }));
                setAttachments(tmpFileList);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const attachFileDelete = (deleteItem) => {
        setDeleteFiles([...deleteFiles, { atchmnflId: data.atchmnflId ,atchmnflSn: deleteItem.atchmnflSn, strgFileNm: deleteItem.strgFileNm }]);
        setNewAttachments(newAttachments.filter(item => item !== deleteItem));
    }

    //저장 버튼 클릭 이벤트
    const onClick = () => {
        const result = window.confirm("등록하시겠습니까?");
        if (result) saveData();
    }

    //저장
    const saveData = async () => {
        const formData = new FormData();

        //수정시 데이터 설정
        if(editMode === 'update') {
            delete data.noticeId;
            setData({...data, "mdfcnEmpId" : empId, "mdfcnDt" : date.format('YYYY-MM-DD HH:mm:ss')})
            formData.append("idColumn", JSON.stringify({noticeId : noticeId}));
            formData.append("deleteFiles", JSON.stringify(deleteFiles));
        } else {
            setData({...data})
        }

        formData.append("tbNm", JSON.stringify({tbNm: tbNm}));
        formData.append("data", JSON.stringify(data));
        Object.values(attachments).forEach((attachments) => formData.append("attachments", attachments));

        try{
            // /boot/common/insertlongText : 첨부파일 포함 insert/update 
            const response = await axios.post("/boot/common/insertlongText", formData, {
                headers : {'Content-Type': 'multipart/form-data'}
            })

            //저장완료 시 목록 조회
            if(response.data >= 1){
                navigate("/sample/CustomTableSample")
            }
        } catch(error) {
            console.error("API 요청 에러:", error);
        }

    }

    return (
        <div className="container">
            <div className="title p-1" style={{ marginTop: "20px", marginBottom: "10px" }}></div>
            <div className="col-md-10 mx-auto" style={{ marginBottom: "30px" }}>
                <h1 style={{ fontSize: "40px" }}>BoardInputForm Sample</h1>
            </div>
            <BoardInputForm
                edit={edit}                             //입력 항목에 대한 정보를 포함
                data={data}                             //입력 form 객체
                editMode={editMode}                     //등록과 수정을 구별하는 값
                setData={setData}                       //입력된 내용을 담기위한 setState
                attachments={attachments}               //첨부파일 객체
                setAttachments={setAttachments}         //첨부된 파일을 담기위한 setState
                newAttachments={newAtchmnFl}            //수정 시에 기존파일을 보여주기 위한 객체
                setNewAttachments={setNewAtchmnFl}      //수정시에 기존파일을 옮겨 담는 setState
                attachFileDelete={attachFileDelete}
                typeChk={typeChk}
                setTypeChk={setTypeChk}
            />
            <div className="wrap_btns inputFormBtn">
                <Button text="목록" onClick={() => navigate("/sample/CustomTableSample")} />
                <Button text="저장" useSubmitBehavior={true} onClick={onClick} />
            </div>
        </div>
    )
}

export default BoardInputFormSample;