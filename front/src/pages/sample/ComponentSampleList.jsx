import SearchEmpSet from "components/composite/SearchEmpSet";
import CustomTable from "components/unit/CustomTable";
import ComponentSampleListJson from "./ComponentSampleListJson.json";
import SampleData from "./SampleData.json"
import SearchInfoSet from "components/composite/SearchInfoSet";
const ComponentSampleList = () => {
    const { keyColumn, queryId, tableColumns, popup, searchInfo } = ComponentSampleListJson;

    const sampleData = SampleData;

    const pageHandle = async() => {
        try {

        } catch(error) {

        }
    }

    return (
        <div className="container">
            <div className="title p-1" style={{ marginTop: "20px", marginBottom: "10px" }}>
                <h1 style={{ fontSize: "40px" }}>프로젝트 조회</h1>
            </div>
            <div className="col-md-10 mx-auto" style={{ marginBottom: "10px" }}>
                <span> Component Sample </span>
            </div>
            <div style={{ marginBottom: "20px" }}>
            </div>

            <div>검색된 건 수 : {} 건</div>
                <CustomTable
                keyColumn={keyColumn}
                //pageSize={pageSize}
                columns={tableColumns}
                values={sampleData}
                //onRowDblClick={}
                //onRowClick={}
                paging={true}
                //summary={}
                //summaryColumn={}
                //onClick={}
                wordWrap={true}
                //excel={}
                onExcel={true}
                //onCellClick={}
                //grouping={}
                //groupingData={}
                //groupingCustomizeText={}
                />
      </div>
    );

}
export default ComponentSampleList;