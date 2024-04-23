import CustomAddTable from "components/unit/CustomAddTable";
import { useState, useEffect } from "react";
import CustomAddTableSampleJson from "./CustomAddTableSampleJson";
import ApiRequest from "utils/ApiRequest";
import SearchInfoSet from "components/composite/SearchInfoSet";
import { useNavigate } from "react-router-dom";

const CustomAddTableSample = () =>{
    const { menuName, queryId, tableColumns, searchInfo, sampleInsertPage} = CustomAddTableSampleJson

    const navigate = useNavigate();
    const [values, setValues] = useState([]);
    const [param, setParam] = useState({queryId : queryId});    // 데이터 조회를 위한 파라미터
    

    //페이징
    const [totalItems, setTotalItems] = useState(0);    //조회해오는 데이터의 총 개수
    const [currentPage, setCurrentPage] = useState(1);  //데이터 목록을 조회하는 현재 페이지
    const [totalPages, setTotalPages] = useState(1);    //조회해오는 데이터의 총 페이지 수 
    const [pageSize, setPageSize] = useState(10);       //한 페이지에 조회하는 로우 개수

    useEffect(() => {
        pageHandle();
    }, [param])

    //목록 조회 이벤트
    const pageHandle = async() => {
        try{
            const response = await ApiRequest('/boot/common/queryIdSearch', param);
            if(response.length !== 0) setValues(response);
        } catch(error){
            console.log(error)
        }
    }

    //서치인포셋 조회 이벤트
    const searchHandle = async (initParam) => {
        setParam({
            ...initParam,
            queryId: queryId,
            currentPage: currentPage,
            startVal: 0,
            pageSize: pageSize
        });
    }

    //로우 더블클릭 이벤트 
    const onRowDblClick = (data) => {
        console.log("data : ", data);
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
                    menuName = {menuName}
                    columns = {tableColumns}
                    values = {values}
                    json={CustomAddTableSampleJson}
                    onRowDblClick={onRowDblClick}
                />
        </div>
    )
}

export default CustomAddTableSample;