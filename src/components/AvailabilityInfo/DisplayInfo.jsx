import React, { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
const getShowOnlyAvailable = state => state.options.showOnlyAvailable
function DisplayInfo({dateRange, item}) {
    const showOnlyAvailable = useSelector(getShowOnlyAvailable)
    const columnDateStart = dateRange && dateRange.at(0) ? dateRange.at(0).$formatDate('YYYY-MM-DD') : 'YYYY-MM-DD';
    const columnDateEnd = dateRange && dateRange.at(-1) ? dateRange.at(-1).$formatDate('YYYY-MM-DD') : 'YYYY-MM-DD';
    const filtredArray = item.info.filter(info => (columnDateStart >=  info.StartDateTime && columnDateEnd <=  info.EndDateTime));
    const [isSerial, setIsSerial] = useState(item.IsSerial)
    const [isAvailable, setIsAvailable] = useState(item.AvailQty > 0)
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
        >
            {
                !isSerial || item.SerialNbr === ""
                ? (
                    <div className="item-info-qty">
                        <span>OH: {item.OnHand},</span>
                        <span>Avl: {item.AvailQty}</span>
                    </div>
                )
                : null
            }
            {
                (filtredArray.length > 0 && !showOnlyAvailable) &&
                <div className="item-info-orders">
                    {
                        ((array) => {
                            switch (array.length) {
                                case 1:
                                    return (
                                        <span>{`R.O.: ${array[0].OrderNbr}/${array[0].Customer}-${array[0].OrderQty}`}</span>
                                    )
                                case 2:
                                    return (
                                        <>
                                            <span>{`O.H.: ${array[0].OrderNbr}/${array[0].Customer}-${array[0].OrderQty}`}</span><br />
                                            <span>{`O.H.: ${array[1].OrderNbr}/${array[1].Customer}-${array[1].OrderQty}`}</span><br />
                                        </>
                                    )
                                default:
                                    return (
                                        <>
                                            <div className="all-orders">
                                                <div>{`O.H.: ${array[0].OrderNbr}/${array[0].Customer}-${array[0].OrderQty}`}</div>
                                                <div>{`O.H.: ${array[1].OrderNbr}/${array[1].Customer}-${array[1].OrderQty}`}</div>
                                                <div className="popup-target" >
                                                    <div>
                                                        Orders
                                                        <ul className="popup">
                                                        {
                                                            array.map((info, i) => {
                                                                return (
                                                                    <li
                                                                        key={i}
                                                                    >
                                                                        {`${info.OrderNbr}/${info.Customer} - ${info.OrderQty}`}
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                        </ul>
                                                    </div>
                                                </div>                                   
                                            </div>                                            
                                        </>
                                    )
                            }
                        })(filtredArray)                        
                    }
                </div>
            }  
        </div>
    )
}
export default DisplayInfo