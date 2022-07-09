import React from 'react';
import Title from './Title';
import RowList from './RowList';
import { TableContainer } from './style';

function Table(props) {
    const { data } = props;

    return (
        <TableContainer>
            <Title />
            {data.map((otherStat, index) => {
                return (
                    <RowList {...otherStat} elementIndex={index} key={index} />
                );
            })}
        </TableContainer>
    );
}
// 需要一個搜索器查最接近的標題
// 多選是否生效（全選功能）

export default Table;
