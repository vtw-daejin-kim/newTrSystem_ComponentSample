import { useState, useEffect } from "react";
import CustomTable from "components/unit/CustomTable";
import CustomTableSampleJson from "./CustomTableSampleJson.json";
import SearchInfoSet from "components/composite/SearchInfoSet";
import { useNavigate } from "react-router-dom";
import ApiRequest from "utils/ApiRequest";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";

//====================================
//  CustomTable & SearchInfoSet 샘플 소스
//  그리드 형식의 기본 조회용 테이블 
//====================================
const CustomTableSample = () => {
    //=======================선언구간============================//

    //====================================
    //  CustomTable Json 파일 예시
    //  keyColumn       : 조회해오는 데이터의 기준이 되는 컬럼 
    //  tableColumns    : 그리드의 Column 들을 정의 
    //  queryId         : back 단에서 조회해오는 쿼리 ID
    //  searchInfo      : searchInfoSet을 구성하기위한 프로퍼티스 값들을 정의
    //====================================
    const { keyColumn, queryId, tableColumns, searchInfo, sampleInsertPage } = CustomTableSampleJson;

    const navigate = useNavigate();
    const [param, setParam] = useState({queryId : queryId});    // 데이터 조회를 위한 파라미터
    const [values, setValues] = useState([]);                   //그리드를 구성하는 값

    //페이징
    const [totalItems, setTotalItems] = useState(0);    //조회해오는 데이터의 총 개수
    const [currentPage, setCurrentPage] = useState(1);  //데이터 목록을 조회하는 현재 페이지
    const [totalPages, setTotalPages] = useState(1);    //조회해오는 데이터의 총 페이지 수 
    const [pageSize, setPageSize] = useState(10);       //한 페이지에 조회하는 로우 개수

    useEffect(() => {
        pageHandle();
    }, [param]);
    //==========================================================//

    //목록 조회 함수
    const pageHandle = async() => {
        try {
            const response = await ApiRequest("/boot/common/queryIdSearch", param)
            setValues(response);
            if(response.length !== 0){
                setTotalPages(Math.ceil(response[0].totalItems / pageSize));
                setTotalItems(response[0].totalItems);
            } else {
                setTotalPages(1);
            }
        } catch(error) {
            console.log(error)
        }
    }

    //서치인포셋 조회 이벤트
    const searchHandle = async (initParam) => {
        console.log("initParam", initParam);
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
        navigate("/sample/CustomHorizontalTableSample", {state: {noticeId : data.key}})
    }

    //엑셀다운로드
    const onExporting = (e) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Main sheet');
        exportDataGrid({
          component: e.component,
          worksheet,
          autoFilterEnabled: true,
        }).then(() => {
          workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), '샘플소스'+'.xlsx');
          });
        });
    }

    //버튼 클릭 이벤트
    const onClick = (button, data) => {
        navigate("/sample/BoardInputFormSample", {state : {"boardId" : data.boardId, "editMode" : "update"}})
    }
    
    return (
        <div className="container">
            <div className="title p-1" style={{ marginTop: "20px", marginBottom: "10px" }}>
                <h1 style={{ fontSize: "40px" }}>CustomTable & SearchInfoSet Sample</h1>
            </div>
            <div className="col-md-10 mx-auto" style={{ marginBottom: "10px" }}/>
            <div style={{ marginBottom: "20px" }}>
                <SearchInfoSet
                    props={searchInfo}
                    insertPage={sampleInsertPage}
                    callBack={searchHandle}
                />
            </div>

            <div>검색된 건 수 : {totalItems} 건</div>
                <CustomTable
                    keyColumn={keyColumn}           //조회해오는 데이터의 기준 컬럼
                    pageSize={pageSize}             //페이징 시 로우 개수            
                    columns={tableColumns}          //테이블 헤더에 해당하는 컬럼항목들 배열
                    values={values}                 //DataGrid 테이블에 표출 되는 값
                    onRowDblClick={onRowDblClick}   //row 더블클릭 이벤트
                    //onRowClick = {onRowDblClick}  //row 클릭 이벤트 (버튼 onClick 이벤트와 같이 사용X)
                    paging={true}                   //페이징 여부
                    onClick={onClick}               //버튼 렌더링으로 생성된 버튼을 클릭 시 호출되는 함수
                    wordWrap={true}                 //DataGrid의 wordWrapEnabled 속성(컬럼의 Width보다 데이터가 길 경우 자동으로 줄바꿈) 사용 여부
                    excel={true}                    //엑셀 다운로드 사용여부         
                    onExcel={onExporting}           //엑셀 다운로드 이벤트 함수
                />
      </div>
    );

}
export default CustomTableSample;