import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useFetchGAS from './useFetchGAS';
import { useAverage, useMin } from './useStatistic';
import Progress from '../../../components/Progress';
import { useWindowWidth } from '../../../utils/index';
import { Spinner } from 'react-bootstrap';

const statisticStyle = { display: 'flex', justifyContent: 'space-evenly' };

function Statistic() {
    const { year, department, in_maj } = useSelector(
        (state) => state.major.filter
    );

    const average = useAverage();
    const min = useMin();
    const passRate = useFetchGAS(in_maj === 'none' ? department : in_maj, year);

    const windowWidth = useWindowWidth();

    return (
        <div className="statistic" style={statisticStyle}>
            <div className="board">
                <div
                    style={{
                        width: '190px',
                        height: 'auto',
                        border: '1px solid rgb(229,68,109)',
                    }}
                >
                    <h2
                        style={{
                            color: 'rgb(229,68,109)',
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        {in_maj !== 'none' && in_maj}
                        {department === 'none'
                            ? '全部學系'
                            : in_maj === 'none' && department}
                    </h2>
                    <div
                        style={{
                            marginBottom: '0',
                            marginLeft: '0',
                            backgroundColor: 'rgb(229,68,109)',
                            lineHeight: '29px',
                            fontSize: '14px',
                            height: '30px',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        包含年份: {year === 'none' ? '全部年份' : year}
                    </div>
                </div>
            </div>
            <Progress
                is_mobile={windowWidth < 800 ? 'mobile' : 'none'}
                title="平均錄取分數"
                value={average}
            />
            <Progress
                is_mobile={windowWidth < 800 ? 'mobile' : 'none'}
                title="最低錄取分數"
                value={min}
            />
            {passRate !== undefined ? (
                <Progress
                    is_mobile={windowWidth < 800 ? 'mobile' : 'none'}
                    title="通過率(官方數據)"
                    value={passRate === null ? 'null' : passRate * 100}
                />
            ) : (
                <Spinner
                    animation="border"
                    variant="danger"
                    style={{
                        width: '50px',
                        height: '50px',
                        marginTop: '20px',
                        marginLeft: '30px',
                    }}
                />
            )}
        </div>
    );
}

export default Statistic;
