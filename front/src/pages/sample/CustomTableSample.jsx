import { useState, useEffect } from "react";
import CustomTable from "components/unit/CustomTable";
import ComponentSampleListJson from "./ComponentSampleJson.json";
import SearchInfoSet from "components/composite/SearchInfoSet";
import { useNavigate } from "react-router-dom";
import ApiRequest from "utils/ApiRequest";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";

const CustomTableSample = () => {
    const { keyColumn, queryId, tableColumns, searchInfo, sampleInsertPage } = ComponentSampleListJson;

    const navigate = useNavigate();
    const [param, setParam] = useState({queryId : queryId});
    const [values, setValues] = useState([]);

    //페이징
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        pageHandle();
    }, [param]);

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
        setParam({
            ...initParam,
            queryId: queryId,
            currentPage: currentPage,
            startVal: 0,
            pageSize: pageSize
        });
    }
    
    //로우 더블클릭
    const onRowDblClick = (data) => {
        navigate("/sample/CustomHorizontalTableSample", {state: {id:data.key}})
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
                <CustomTable
                    keyColumn={keyColumn}
                    pageSize={pageSize}
                    columns={tableColumns}
                    values={values}
                    onRowDblClick={onRowDblClick}
                    paging={true}
                    onClick={onClick}
                    wordWrap={true}
                    excel={true}
                    onExcel={onExporting}
                />
      </div>
    );

}
export default CustomTableSample;