import React, { useState, useRef, useEffect } from 'react'
import {useSelector} from 'react-redux'
const getShowOnlyAvailable = state => state.options.showOnlyAvailable
function DisplayInfo({date, item}) {
    const showOnlyAvailable = useSelector(getShowOnlyAvailable)
    const columnDate = date.$formatDate('YYYY-MM-DD')
    const filtredArray = item.info.filter(info => (columnDate >=  info.StartDateTime && columnDate <=  info.EndDateTime));
    const [isSerial, setIsSerial] = useState(item.IsSerial)
    const [isAvailable, setIsAvailable] = useState(item.AvailQty > 0)
    const infoRef = useRef(null);
    const bgFree = "#65ff79";
    const bgNoFree = "#ff3d3d";
    useEffect(() => {
        setIsSerial(item.IsSerial)
        setIsAvailable(item.AvailQty > 0)
    },[item]);
    return (
        <div 
            className={(isSerial ? " item-info-serial" : " item-info-no-serial")}
            style={{
                backgroundColor: isAvailable ? bgFree : (filtredArray.length > 0)  ? bgNoFree : bgFree,
            }}
            ref={infoRef}            
        >
            {
                !isSerial &&
                <div className="item-info-qty">
                    <span>OH: {item.OnHand},</span>
                    <span>Avl: {item.AvailQty}</span>
                </div>
            }
            {
                (isSerial && item.SerialNbr === "") &&
                <div className="item-info-qty">
                    <span>OH: {item.OnHand},</span>
                    <span>Avl: {item.AvailQty}</span>
                </div>
            }
            {
                (filtredArray.length > 0 && !showOnlyAvailable) &&
                <div className="item-info-orders">
                    {
                        (() => {
                            switch (filtredArray.length) {
                                case 1:
                                    return (
                                        <span>R.O: {filtredArray[0].OrderNbr}-{filtredArray[0].OrderQty}</span>
                                    )
                                case 2:
                                    return (
                                        <span>OH: {filtredArray[0].OrderNbr}-{filtredArray[0].OrderQty}, {filtredArray[1].OrderNbr}-{filtredArray[1].OrderQty}</span>
                                    )
                                default:
                                    return (
                                        <>
                                            <span>OH: {filtredArray[0].OrderNbr}-{filtredArray[0].OrderQty}, {filtredArray[1].OrderNbr}-{filtredArray[1].OrderQty}</span>
                                            <div className="all-orders">
                                                <span className="popup-target" >
                                                    Orders
                                                    <ul className="popup">
                                                    {
                                                        filtredArray.map((info, i) => {
                                                            return (
                                                                <li
                                                                    key={i}
                                                                >
                                                                    {`R.O.: ${info.OrderNbr} - Qty.: ${info.OrderQty}`}
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                    </ul>
                                                </span>                                                
                                            </div>                                            
                                        </>
                                    )
                            }
                        })()                        
                    }
                </div>
            }  
        </div>
    )
}
export default DisplayInfo