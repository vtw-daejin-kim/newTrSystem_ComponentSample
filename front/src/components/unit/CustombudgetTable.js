import DataGrid, { Column } from 'devextreme-react/data-grid';

const CustombudgetTable = ({ headers, column, fileList }) => { 
    console.log("fileList : ", fileList);
    const data = [{
        ...headers.reduce((result, header) => {
          result[header.key] = column?.[header.key] ?? "";
          return result;
        }, {}),
        
      }];

    const applyHeaderStyle = (cellElement)=>{
        cellElement.style.textAlign = 'center';
        cellElement.style.fontWeight = 'bold';
        cellElement.style.cursor = 'default';
        cellElement.style.color ='black'
        cellElement.style.backgroundColor = '#e9ecef'
        cellElement.style.pointerEvents = 'none';
    }

    /* Sample 로 인한 소스 수정 */
    const cellRender = (header, value) => {
      if(header.cellType === 'html'){
        return (
            <div dangerouslySetInnerHTML={{ __html: value }}/>
        );
      } else if (header.cellType === 'file'){
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
        className="horizontal-datagrid"
        dataSource={data}
        showColumnLines={true}
        showRowLines={true}
        showBorders={true}
        onCellPrepared={(e) => {
        if (e.rowType === 'header') {
            applyHeaderStyle(e.cellElement);
        }
        if (e.rowType === 'data' && e.column.dataField === '') {
            applyHeaderStyle(e.cellElement);
        }
        }}      
    >   
        {headers.map(header =>(
            <Column 
              key={header.key} 
              dataField={header.key} 
              caption={header.value} 
              alignment='center'
              //Sample 로 인한 소스 수정
              cellRender={(row) =>
                header.cellType !== undefined ? cellRender(header, row.displayValue) : <span>{row.displayValue}</span> 
              }
            />
        ))}
  </DataGrid>
  );
};

export default CustombudgetTable;
