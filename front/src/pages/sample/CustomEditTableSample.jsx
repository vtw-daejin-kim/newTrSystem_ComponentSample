import CustomEditTable from "components/unit/CustomEditTable";
import CustomEditTableSampleJson from "./CustomEditTableSampleJson.json";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import ApiRequest from "utils/ApiRequest";
import uuid from "react-uuid";

//====================================
//  CustomEditTable  샘플 소스 
//  편집용 목록테이블 데이터 row의 입력, 수정, 삭제가 모두 가능한 테이블로 입력폼으로 등록과 수정이 가능
//====================================
const CustomEditTableSample = () => {
    //=======================선언구간============================//
    const [boardData, setBoardData]  = useState([]);

    const [ cookies ] = useCookies(["userInfo", "userAuth"]);
    const [ cdValList, setCdValList ] = useState({});
    const empId = "75034125-f287-11ee-9b25-000c2956283f"; 

    const [ values, setValues] = useState([]);
    const { queryId, keyColumn, tableColumns, tbNm } = CustomEditTableSampleJson
    //==========================================================//
    useEffect(() => {
        pageHandle();
    }, []);

    
    const pageHandle = async () => {
        const param = {
            queryId : queryId
        }
        try {
            const response = await ApiRequest('/boot/common/queryIdSearch', param)
            if (response.length !== 0) setValues(response);
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="container">
            <div className="title p-1" style={{ marginTop: "20px", marginBottom: "10px" }}>
                <h1 style={{ fontSize: "40px" }}>CustomEditTable Sample</h1>
            </div>
            <div className="col-md-10 mx-auto" style={{ marginBottom: "10px" }}>
                <span> Component Sample </span>
            </div>
            <div style={{ marginBottom: "20px" }}>

            </div>

            <div>검색된 건 수 : {} 건</div>
                <CustomEditTable
                    tbNm={tbNm}
                    values={values}
                    keyColumn={keyColumn}
                    columns={tableColumns}
                    callback={pageHandle}
                    paging={true}
                />
      </div>
    )
}
export default CustomEditTableSample;