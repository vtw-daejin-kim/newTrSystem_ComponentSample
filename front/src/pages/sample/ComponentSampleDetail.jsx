import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom"
import ApiRequest from "utils/ApiRequest";
import { Container } from 'react-bootstrap';
import { Button } from "devextreme-react";
import ComponentSampleJson from "./ComponentSampleJson.json";

const ComponentSampleDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const boardId = location.state.id;

    const [boardData, setBoardData] = useState({});
    const [fileList, setFileList] = useState([]);
    const { DetailButtonGroup, selectOneQueryId } = ComponentSampleJson.detail

    useEffect(() => {
        getBoardData();
    }, []);

    const getBoardData = async() => {
        const params = {
            queryId : selectOneQueryId,
            boardId : boardId
        }
        try {
            const response = await ApiRequest("/boot/common/queryIdSearch", params);
            if(response.length !== 0) {
                setBoardData(response[0]);
            }
        } catch(error) {
            console.log(error);
        } 
    }

    const deleteBoard = async () => {
        const result = window.confirm("삭제하시겠습니까?") 
        if(result){
            const params = [ 
               { tbNm : "SAMPLE_BOARD" }, 
               { boardId : boardId } 
            ]

            try{
                //"/boot/common/deleteWithFile" 첨부파일 함께 삭제
                const response = await ApiRequest("/boot/common/commonDelete", params)

                if(response >= 1){
                    navigate("/sample/CustomTableSample")
                } else {
                    alert("삭제 실패 하였습니다.")
                }
            } catch(error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="container">
            <div
                className="title p-1"
                style={{ marginTop: "20px", marginBottom: "10px" }}
            ></div>
            <div style={{ marginRight: "20px", marginLeft: "20px", marginBottom: "50px" }}>
                <h1 style={{ fontSize: "30px" }}>Componet Sample Detail</h1>
            </div>
            <Container style={{ width: '90%', margin: '0 auto' }}>
                {boardData.length !== 0 ?
                    <>
                        <h1 style={{ marginBottom: "20px" }}>{boardData.boardTtl}</h1>
                        <div>{boardData.regEmpNm} | {boardData.regDt}</div><hr />
                        <div dangerouslySetInnerHTML={{ __html: boardData.boardCn }} />

                        {fileList.length !== 0 && fileList.filter(file => file.realFileNm !== null && file.realFileNm !== undefined).filter(file => file.realFileNm.endsWith('.jpg') || file.realFileNm.endsWith('.jpeg') || file.realFileNm.endsWith('.png') || file.realFileNm.endsWith('.gif')).map((file, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <img src={`/upload/${file.strgFileNm}`}
                                    style={{ width: '80%', marginBottom: '20px' }} alt={file.realFileNm} />
                            </div>
                        ))}<hr />

                        <div style={{ fontWeight: 'bold' }}>첨부파일</div>
                        {fileList.length !== 0 && fileList.filter(file => file.realFileNm !== null && file.realFileNm !== undefined).filter(file => !(file.realFileNm.endsWith('.jpg') || file.realFileNm.endsWith('.jpeg') || file.realFileNm.endsWith('.png') || file.realFileNm.endsWith('.gif'))).map((file, index) => (
                            <div key={index}>
                                <a href={`/upload/${file.strgFileNm}`} download={file.realFileNm} style={{ fontSize: '18px', color: 'blue', fontWeight: 'bold' }}>{file.realFileNm}</a>
                            </div>
                        ))}
                        <hr />
                    </> : ''
                }
            </Container>
            <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                {DetailButtonGroup.map((button, index) => (
                    <Button
                        key={index}
                        style={{ marginRight: '3px' }}
                        text={button.text}
                        type={button.type}
                        onClick={button.onClick === "deleteBoard" ? deleteBoard : () =>
                            navigate(button.onClick, { state: button.state ? { ...button.state, boardId : boardId } : undefined })}
                    />
                ))}
            </div>
        </div>
    );
}
export default ComponentSampleDetail;