import CustomAddTable from "components/unit/CustomAddTable";
import { useState, useEffect } from "react";
import CustomAddTableSampleJson from "./CustomAddTableSampleJson";
import ApiRequest from "utils/ApiRequest";
import SearchInfoSet from "components/composite/SearchInfoSet";
import { useNavigate } from "react-router-dom";

//====================================
//  CustomAddTable & SearchInfoSet 샘플 소스
//  Datagrid에 버튼 클릭으로 행을 추가하여 내용을 작성할 수 있는 컴포넌트
//====================================
const CustomAddTableSample = () =>{
    //=======================선언구간============================//

    //====================================
    //  CustomAddTable Json 파일 예시
    //  queryId         : back 단에서 조회해오는 쿼리 ID
    //  tableColumns    : 그리드의 Column 들을 정의 
    //  searchInfo      : SearchInfoSet을 구성하기위한 프로퍼티스 값들을 정의
    //  sampleInsertPage: SearchInfoSet 입력버튼 클릭시 이동하는 insert 페이지
    //====================================
    const { queryId, tableColumns, searchInfo, sampleInsertPage} = CustomAddTableSampleJson

    const navigate = useNavigate();
    const [values, setValues] = useState([]);
    const [param, setParam] = useState({queryId : queryId});    // 데이터 조회를 위한 파라미터
    
    const [totalItems, setTotalItems] = useState(0);    //조회해오는 데이터의 총 개수

    useEffect(() => {
        pageHandle();
    }, [param])
    //==========================================================//

    //목록 조회 이벤트
    const pageHandle = async() => {
        try{
            const response = await ApiRequest('/boot/common/queryIdSearch', param);
            if(response.length !== 0) {
                setValues(response);
                setTotalItems(response[0].totalItems);
            }
        } catch(error){
            console.log(error)
        }
    }

    //서치인포셋 조회 이벤트
    const searchHandle = async (initParam) => {
        setParam({
            ...initParam,
            queryId: queryId
        });
    }

    //로우 더블클릭 이벤트 > CustomBudgetTableSample, 유저 상세 페이지 이동
    const onRowDblClick = (data) => {
        navigate("/sample/CustomBudgetTableSample", {state: {id:data.key}})
    }
    
    return (
        <div className="container">
            <div className="title p-1" style={{ marginTop: "20px", marginBottom: "10px" }}>
                <h1 style={{ fontSize: "40px" }}>CustomAddTable Sample</h1>
            </div>
            <div className="col-md-10 mx-auto" style={{ marginBottom: "10px" }}>
                <span> Component Sample </span>
            </div>
            <div style={{ marginBottom: "20px" }}>
                <SearchInfoSet
                    props={searchInfo}
                    insertPage={sampleInsertPage}
                    callBack={searchHandle}
                />
            </div>

            <div>검색된 건 수 : {totalItems} 건</div>
                <CustomAddTable
                    columns = {tableColumns}
                    values = {values}
                    json={CustomAddTableSampleJson}
                    onRowDblClick={onRowDblClick}
                />
        </div>
    )
}

export default CustomAddTableSample;