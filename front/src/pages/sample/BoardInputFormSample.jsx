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
    const boardId = location.state.boardId;

    const empId = "75034125-f287-11ee-9b25-000c2956283f";
    const date = moment();

    const { edit, queryId } = BoardInputFormSampleJson;

    //등록 첨부파일
    const [atchmnFl, setAtchmnFl] = useState([]);
    //수정시에 기존 파일을 보여주기 위한 객체
    const [newAtchmnFl, setNewAtchmnFl] = useState([]); 
    //수정시에 첨부파일 개별삭제에 필요한 함수
    const [deleteFiles, setDeleteFiles] = useState([{}]);
    
    const [ data, setData ] = useState({
        boardId : uuid(),
        regEmpId: empId, 
        regDt : date.format('YYYY-MM-DD HH:mm:ss')
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
            boardId : boardId
        }

        try{
            const response = await ApiRequest("/boot/common/queryIdSearch", param);
            console.log('response : ', response);
            if(response !== 0) {
                response[0] = {
                    "noticeTtl" : response[0].boardTtl,
                    "noticeCn" : response[0].boardCn
                }
                setData(response[0]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    //저장 버튼 클릭 이벤트 함수
    const onClick = () => {
        const result = window.confirm("등록하시겠습니까?");
        if (result) saveData();
    }

    //저장 함수
    const saveData = async () => {
        const formData = new FormData();
        //BoardInputForm 에서 notice(공지사항)과 reference(자료실) 둘만 가능하게 설정되어있으므로 값 재설정 해줌
        let saveData = {
            ...data,
            "boardTtl" : data.noticeTtl,
            "boardCn" : data.noticeCn,
            "atchmnflId" : data.atchmnflId
        }

        delete saveData.noticeTtl;
        delete saveData.noticeCn;

        if(editMode === 'update') {
            saveData = {...saveData, "mdfcnEmpId" : empId, "mdfcnDt" : date.format('YYYY-MM-DD HH:mm:ss')}
            formData.append("idColumn", JSON.stringify({boardId : data.boardId}));
            formData.append("deleteFiles", JSON.stringify(deleteFiles));
        } 

        formData.append("tbNm", JSON.stringify({tbNm: "SAMPLE_BOARD"}));
        formData.append("data", JSON.stringify(saveData));
        Object.values(atchmnFl)
            .forEach((atchmnFl) => formData.append("attachments", atchmnFl));
        try{
            const response = await axios.post("/boot/common/insertlongText", formData, {
                headers : {'Content-Type': 'multipart/form-data'}
            })
            if(response.data >= 1){
                navigate("/sample/CustomTableSample") // response 값에 boardId 값을 따로 리턴해오지 않음
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
                edit={edit}
                data={data}
                editMode={editMode}
                attachments={atchmnFl}
                setAttachments={setAtchmnFl}
                newAttachments={newAtchmnFl}
                setNewAttachments={setNewAtchmnFl}
                setData={setData}
                //attachFileDelete={attachFileDelete}
            />
            <div className="wrap_btns inputFormBtn">
                <Button text="목록" onClick={() => navigate("/sample/CustomTableSample")} />
                <Button text="저장" useSubmitBehavior={true} onClick={onClick} />
            </div>
        </div>
    )
}

export default BoardInputFormSample;