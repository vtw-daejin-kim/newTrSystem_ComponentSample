import { useState, useEffect } from "react";
import ApiRequest from "utils/ApiRequest";

const CustomEditTableSample = () => {
    const [boardData, setBoardData]  = useState([]);

    useEffect(() => {

    }, []);

    const pageHandle = async () => {
        const param = {
        }
        try {
            const reseponse = await ApiRequest('/boot/common/queryIdSearch', param)
        }catch(error){

        }
    }
}
export default CustomEditTableSample;