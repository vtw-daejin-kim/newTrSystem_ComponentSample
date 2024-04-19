import CustomAddTable from "components/unit/CustomAddTable";
import { useState, useEffect } from "react";
import CustomAddTableSampleJson from "./CustomAddTableSampleJson";
import ApiRequest from "utils/ApiRequest";

const CustomAddTableSample = () =>{

    const [values, setValues] = useState([]);
    const { menuName, keyColumn, queryId, tableColumns, tbNm } = CustomAddTableSampleJson

    //페이징
    const [totalItems, setTotalItems] = useState(0);    //조회해오는 데이터의 총 개수
    const [currentPage, setCurrentPage] = useState(1);  //데이터 목록을 조회하는 현재 페이지
    const [totalPages, setTotalPages] = useState(1);    //조회해오는 데이터의 총 페이지 수 
    const [pageSize, setPageSize] = useState(10);       //한 페이지에 조회하는 로우 개수
    
    useEffect(() => {
        pageHandle();
    }, [])

    const pageHandle = async() => {
        const param = {
            queryId : queryId
        }
        try{
            const response = await ApiRequest('/boot/common/queryIdSearch', param);
            console.log("response", response)
            if(response.length !== 0) setValues(response);
        } catch(error){
            console.log(error)
        }
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

            </div>

            <div>검색된 건 수 : {totalItems} 건</div>
                <CustomAddTable
                    menuName = {menuName}
                    columns = {tableColumns}
                    values = {values}
                    json={CustomAddTableSampleJson}
                />
        </div>
    )
}

export default CustomAddTableSample;