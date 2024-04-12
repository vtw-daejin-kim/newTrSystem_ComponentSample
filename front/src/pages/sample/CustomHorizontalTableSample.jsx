import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom"
import CustomHorizontalTable from "components/unit/CustomHorizontalTable";
import CustomHorizontalTableSampleJson from "./CustomHorizontalTableSampleJson.json";
import { Button } from "devextreme-react";
import ApiRequest from 'utils/ApiRequest';
const CustomHorizontalTableSample = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const boardId = location.state.id;
    const [ boardDetailData, setBoardDetailData ] = useState({});
    const { queryId, boardDetail, detailButtonGroup} = CustomHorizontalTableSampleJson;
    
    
    useEffect(() => {
        pageHandle();
    },[]);
    
    const pageHandle = async() => {
        const param = {
            queryId : queryId,
            boardId : boardId
        }
        try{
            const response = await ApiRequest("/boot/common/queryIdSearch", param);

            if(response.length !== 0){
                setBoardDetailData(response[0]);
            }
        } catch(error) {
            console.log(error)
        }
    }

    const deleteBoard = async () => {
        const result = window.confirm("삭제하시겠습니까?")
        if(result){
           const params = [
                { tbNm : "SAMPLE_BOARD" }, 
                { boardId : boardId } 
           ]

           try{
            //"/boot/common/deleteWithFile" 첨부파일 함께 삭제
            const response = await ApiRequest("/boot/common/commonDelete", params)

            if(response >= 1){
                navigate("/sample/CustomTableSample")
            } else {
                alert("삭제 실패 하였습니다.")
            }
        } catch(error) {
            console.log(error)
        } 
        } 
    }
    
    return (
        <div style={{padding: '5%'}}>
            <div className='container'>
                <div className="col-md-10 mx-auto" style={{ marginBottom: "30px" }}>
                    <h1 style={{ fontSize: "40px" }}>CustomHorizontalTable Sample</h1>
                </div>
                <div>
                    <CustomHorizontalTable headers={boardDetail} column={boardDetailData}/>
                </div>
            </div>
            <div style={{ textAlign: 'center' }}> 
                {detailButtonGroup.map((button, index) => (
                        <Button
                            key={index}
                            style={{ marginRight: '3px' }}
                            text={button.text}
                            type={button.type}
                            onClick={button.onClick === "deleteBoard" ? deleteBoard : () =>
                                navigate(button.onClick, { state: button.state ? { ...button.state, boardId : boardId } : undefined })}
                        />
                    ))}
            </div>
        </div>
    );
}

export default CustomHorizontalTableSample;