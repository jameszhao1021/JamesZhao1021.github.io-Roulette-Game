import React  from 'react';

function OtherNumber({addCom,totalChipValues,updateTotalChipValue,setTotalChipValues,singleChipValue, winNumber}) {
    const prefix = "otherNumber"
    var listofNumber = [
        [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, '2-1'],
        [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, '2-1'],
        [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, '2-1']
    ];

    //this approach update totalChipValue locally, because useState is asynchronous, the totalChipValue 
    //generated by setTotalChipValue can not be immidiately updated
    const otherNumberClick = (num, rowIndex, colIndex, event) => {
        const id = `${prefix}_${rowIndex}_${colIndex}`;
        const selectedNum = (colIndex !== 12) ? [num] : listofNumber[rowIndex].slice(0, -1);
        const odd = (colIndex !== 12)?35:2;
        const totalChipValue = (totalChipValues[id] || 0) + singleChipValue;
        updateTotalChipValue(id);
        addCom(selectedNum, id, odd, totalChipValue, event);
    };

    const removeOtherNumberClick = (num, rowIndex, colIndex, event) => {
        event.preventDefault(); // Prevent the default context menu
        const id = `${prefix}_${rowIndex}_${colIndex}`;
        const odd = 35;
        const selectedNum = (colIndex !== 12) ? [num] : listofNumber[rowIndex].slice(0, -1);
        const totalChipValue = totalChipValues[id] || 0;
        addCom(selectedNum, id, odd, totalChipValue, event);
        // Toggle chip visibility based on right-click event
        if (event.button === 2 && totalChipValue > 0) {
            const updatedTotalChipValues = { ...totalChipValues }; // Copy the state
            updatedTotalChipValues[id] = 0; // Set chip value to 0
            setTotalChipValues(updatedTotalChipValues); // Update the state
        }
    };

    return (
        <div className="otherNumber">
            {listofNumber.map((row, rowIndex) => (
                <div key={rowIndex} id={`otherNumberRow_${rowIndex}`} className='otherNumberRow'>
                    {row.map((num, colIndex) => (
                        <div key={colIndex} id={`otherNumberBlock_${rowIndex}_${colIndex}`} className='otherNumberBlock'
                            onClick={(event) => otherNumberClick(num, rowIndex, colIndex, event)} 
                            onContextMenu={(event) => removeOtherNumberClick(num, rowIndex, colIndex, event)}
                        >
                            <div className={`otherNumberBlockNum ${num == winNumber? "winningNumber":""} `}>{num}</div>
                            {totalChipValues[`${prefix}_${rowIndex}_${colIndex}`] > 0  &&
                                <div className='chip'>{totalChipValues[`${prefix}_${rowIndex}_${colIndex}`]}</div>}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default OtherNumber;