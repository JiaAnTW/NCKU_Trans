import React, { useCallback, useRef, useState } from 'react';
import Title from './Title';
import RowList from './RowList';
import { EditPlace, SearchingPlace, TableContainer } from './style';
import SearchBar from '~/components/SearchBar';
import SearchCard from './SearchCard';

const cache = {};

function makeStringWeight(str) {
    if (!str || !typeof str === 'string') return {};
    str = str.toUpperCase();
    if (cache[str]) return cache[str];

    const weight = {};
    for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        if (!weight[ch]) {
            weight[ch] = 1;
            continue;
        }
        weight[ch]++;
    }
    cache[str] = weight;
    return weight;
}

function Table(props) {
    const { data, option } = props;
    const ref = useRef();
    const [onFocusIndex, setOnFocusIndex] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const [pendingReplace, setPendingReplace] = useState();

    const handleOnFocus = useCallback(
        (index, e) => {
            setOnFocusIndex(index);
            ref.current.value = e.target.value;
            handleOnChange(e);
        },
        ref,
        setOnFocusIndex,
        handleOnChange
    );

    const handleOnChange = useCallback((e) => {
        const queryString = e.target.value;

        const queryStringWeight = makeStringWeight(queryString);
        const rankList = [];
        option.map((otherStat) => {
            const otherStatWeight = makeStringWeight(otherStat.name);
            const rank = {
                name: otherStat.name,
                ranking: 0,
            };
            for (let key in queryStringWeight) {
                if (!otherStatWeight[key]) continue;

                rank.ranking += Math.min(
                    otherStatWeight[key],
                    queryStringWeight[key]
                );
            }
            rankList.push(rank);
        });

        setSearchResult(
            rankList.sort((a, b) => {
                return b.ranking - a.ranking;
            })
        );
    }, option);

    return (
        <TableContainer>
            <SearchingPlace>
                <SearchBar onChange={handleOnChange} ref={ref} />
                <SearchCard
                    data={searchResult}
                    setPendingReplace={setPendingReplace}
                />
            </SearchingPlace>
            <EditPlace>
                <Title />
                {data.map((otherStat, index) => {
                    return (
                        <RowList
                            {...otherStat}
                            onFocus={handleOnFocus}
                            elementIndex={index}
                            onFocusIndex={onFocusIndex}
                            pendingReplace={pendingReplace}
                            key={index}
                        />
                    );
                })}
            </EditPlace>
        </TableContainer>
    );
}

export default Table;
