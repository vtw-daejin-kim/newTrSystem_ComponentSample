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

    //목록 조회 이벤트
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
                    tbNm={tbNm}             // 입력, 수정, 삭제에 필요한 테이블 명
                    values={values}         // DataGrid에 표출되는 데이터 
                    keyColumn={keyColumn}   // 조회해오는 데이터의 기준이되는 컬럼
                    columns={tableColumns}  // DataGrid의 제목행의 열 정보가 담긴 값. 필드명과 editType, validation 정보를 포함
                    callback={pageHandle}   // 그리드내 데이터 변경 시에 콜백 함수
                    paging={true}           // 페이징 여부
                />
      </div>
    )
}
export default CustomEditTableSample;