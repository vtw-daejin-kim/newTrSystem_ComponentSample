import React, { useEffect, useState } from 'react';
import CustombudgetTable from "components/unit/CustombudgetTable";
import CustomBudgetTableSampleJson from "./CustomBudgetTableSampleJson.json";
import { Button } from "devextreme-react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom"
import ApiRequest from 'utils/ApiRequest';
import CustomHorizontalTable from 'components/unit/CustomHorizontalTable';

//====================================
//  CustomBudgetTable 샘플 소스
//  가로로 생성되는 형식의 조회용 테이블
//
//  ex)
//  header1, header2, header3, header4
//  column1, column2, column3, column4
//====================================
const CustomBudgetTableSample = () => {
    //=======================선언구간============================//

    //====================================
    //  CustomBudgetTable Json 파일 예시
    //  queryId             : back 단에서 조회해오는 쿼리 ID
    //  sampleUserInfo      : 그리드 내의 헤더 컬럼들을 정의 
    //  detailButtonGroup   : 상세페이지 버튼 정의     
    //====================================
    const { queryId, sampleUserInfo, detailButtonGroup} =  CustomBudgetTableSampleJson;
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state.id;
    const [ value, setValue ] = useState({});

    useEffect(() => {
        pageHandle();
    }, [])
    //==========================================================//

    //페이지 조회 이벤트
    const pageHandle = async () => {
        const param = {
            queryId : queryId, 
            userId : userId
        }
        try {
            const response = await ApiRequest("/boot/common/queryIdSearch", param);

            if(response.length !== 0){
                setValue(response[0])
            }
        } catch (error) {
            console.error(error)
        }
    }

    //샘플 유저 삭제 이벤트 
    const deleteUser = async () => {
        const result = window.confirm("삭제하시겠습니까?")
        if(result){
           const params = [
                { tbNm : "SAMPLE_USER" }, 
                { userId : userId } 
           ]

           try{
            const response = await ApiRequest("/boot/common/commonDelete", params)

            if(response >= 1){
                navigate("/sample/CustomAddTableSample")
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
                <h1 style={{ fontSize: "40px" }}>CustomBudgetTable Sample</h1>
            </div>
            <div>
                <CustomHorizontalTable headers={sampleUserInfo.userInfo1} column={value}/>
                <CustombudgetTable headers={sampleUserInfo.userInfo2} column={value}/>
            </div>
        </div>
        <div style={{ textAlign: 'center' }}>
            {detailButtonGroup.map((button, index) => (
                <Button
                    key={index}
                    style={{ marginRight: '3px' }}
                    text={button.text}
                    type={button.type}
                    onClick={button.onClick === "deleteUser" ? deleteUser : () =>
                        navigate(button.onClick, { state: button.state ? { ...button.state, userId : userId } : undefined })}
                />
            ))}
        </div>
    </div>
    )
}

export default CustomBudgetTableSample;