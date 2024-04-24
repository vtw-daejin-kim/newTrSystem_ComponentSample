import DataGrid, { Column } from 'devextreme-react/data-grid';

const CustomHorizontalTable = ({ headers, column, format }) => { 
  const data = headers.reduce((result, header, index) => {
    // 홀수 인덱스일 때만 새로운 로우 생성
    //4열 [Header, Column, Header, Column] 구조
    if (index % 2 === 0) {
      result.push({
        header: header.value,
        column : column?.[header.key] ?? "",
        cellType : header.cellType ?? "",
        header1: headers[index + 1]?.value,
        column1 : column?.[headers[index + 1]?.key] ?? "",
        cellType1 : headers[index + 1]?.cellType ?? ""
      });
    }
    return result;
  }, []);

  const htmlRender = (e) => {
      return (
        <div dangerouslySetInnerHTML={{ __html: e }}/>
    );
  }
  
  return (
    <DataGrid
      key={headers.value}
      dataSource={data}
      showBorders={true}
      showColumnHeaders={false} // 최상단 헤더를 숨기는 설정
      showRowLines={true}       // 로우마다 분할 선을 보이도록 설정
      showColumnLines={false}    // 컬럼마다 분할 선을 보이도록 설정
      onCellPrepared={(e) => {
        if (e.columnIndex === 0 || e.columnIndex === 2) {
          e.cellElement.style.textAlign = 'center';
          e.cellElement.style.fontWeight = 'bold';
          e.cellElement.style.cursor = 'default';
          e.cellElement.style.color ='black'
          e.cellElement.style.backgroundColor = '#e9ecef'
        }
        if (e.columnIndex === 2 && e.value === '') {
          e.cellElement.style.textAlign = 'center';
          e.cellElement.style.fontWeight = 'bold';
          e.cellElement.style.cursor = 'default';
          e.cellElement.style.color ='black'
          e.cellElement.style.backgroundColor = 'white'
          e.cellElement.style.pointerEvents = 'none';
        }
        if(e.columnIndex === 1 && e.values[2] === '' &&  e.values[3] === '') {
          e.cellElement.colSpan = '3';
          e.cellElement.style.whiteSpace = 'pre';
        }
        if (e.columnIndex === 2 && e.values[2] === '' &&  e.values[3] === '') {
          e.cellElement.style.display = 'none';
        }
        if (e.columnIndex === 3 && e.values[2] === '' &&  e.values[3] === '') {
          e.cellElement.style.display = 'none';
          
        }
        if (e.columnIndex === 4 && e.value === '') {
          e.cellElement.style.textAlign = 'center';
          e.cellElement.style.fontWeight = 'bold';
          e.cellElement.style.cursor = 'default';
          e.cellElement.style.color ='black'
          e.cellElement.style.backgroundColor = 'white'
          e.cellElement.style.pointerEvents = 'none';
        }
      }}   
    >
      <Column dataField="header" caption="Header" alignment="center" />
      <Column 
        dataField="column"
        caption="Column"
        alignment="center"
        cellRender={(row) => 
          row.data.cellType === "html" ? htmlRender(row.data.column) : <span>{row.data.column}</span>
        } 
        format={format}
      />
      {/* 원본 <Column dataField="column" caption="Column" alignment="center" format={format}/> */}
      <Column dataField="header1" caption="Header1" alignment="center" />
      <Column 
        dataField="column1" 
        caption="Column1" 
        alignment="center"
        cellRender={(row) => 
          row.data.cellType1 === "html" ? htmlRender(row.data.column1) : <span>{row.data.column1}</span>
        } 
        format={format}
      />
      {/* 원본 <Column dataField="column1" caption="Column1" alignment="center" format={format}/> */}
    </DataGrid>
  );
};

export default CustomHorizontalTable;
