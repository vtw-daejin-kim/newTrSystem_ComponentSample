import DataGrid, { Column } from 'devextreme-react/data-grid';

const CustomHorizontalTable = ({ headers, column, format, fileList }) => { 
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

  /* 샘플소스 사용때문에 잠시 수정 */
  const etcCellRender = (type, value) => {
    if(type === 'html') {
        return (
          <div dangerouslySetInnerHTML={{ __html: value }}/>
        );
    } else if (type === 'file'){
      return(
          fileList.length !== 0 && fileList.filter(file => file.realFileNm !== null && file.realFileNm !== undefined).filter(file => file.realFileNm.endsWith('.txt') || file.realFileNm.endsWith('.jpg') || file.realFileNm.endsWith('.jpeg') || file.realFileNm.endsWith('.png') || file.realFileNm.endsWith('.gif')).map((file, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
                <div key={index}>
                    <a href={`/upload/${file.strgFileNm}`} download={file.realFileNm} style={{ fontSize: '18px', color: 'blue', fontWeight: 'bold' }}>{file.realFileNm}</a>
                </div>
            </div>
          ))
    );
  }

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
          row.data.cellType !== "" ? etcCellRender(row.data.cellType, row.value) : <span>{row.data.column}</span>
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
          row.data.cellType1 !== "" ? etcCellRender(row.data.cellType1, row.value) : <span>{row.data.column1}</span>
        } 
        format={format}
      />
      {/* 원본 <Column dataField="column1" caption="Column1" alignment="center" format={format}/> */}
    </DataGrid>
  );
};

export default CustomHorizontalTable;
