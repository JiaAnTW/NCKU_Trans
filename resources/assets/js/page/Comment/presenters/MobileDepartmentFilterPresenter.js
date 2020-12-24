import React,{useState, useEffect} from 'react';
import useInitMoblieFilterDataStructure from '../utils/useInitMoblieFilterDataStructure';

import { ButtonToolbar } from 'react-bootstrap';
import MobileFilter from '../../../components/Filter/FilterMobile/MobileFilter';
import {useSetMajorFilter} from '../../../utils/index';



function MobileDepartmentFilterPresenter(){
    
    const [filterData,setFilterData] = useState(useInitMoblieFilterDataStructure());
    //const [filterData,setFilterData] = useState(props.value);
    const [departmentMenuArr,setDepartmentMenuArr]=useState([]);
    const [nowCollegeId,setNowCollegeId] = useState(0);
    const setFilter = useSetMajorFilter();

    const handleClick=(name,value,next)=>{
        let newNow;
        let newFilterData =filterData;
        for(let i =0 ; i <value['option'].length;i++){
            if(value['option'][i][0]===name){
                newNow = i;
                break;
            }
        }
        
        if(newNow === 0){
            setFilter('none','in_maj');
            if(value['id'] === 0){
                setFilter('none',value['type']);
            }
            else
                setFilter(value[value['id']]['name'][1],value[value['id']]['name'][0]);
        }else{
            setFilter('none','in_maj');
            setFilter(name,value['type'])
        }
        
        

        if(next!==-1){
            newFilterData[next]['now']=newNow;
            setNowCollegeId(next);
        }else{
            setNowCollegeId(value['id']);
        }
        setFilterData(newFilterData);
        
    }
    
    useEffect(() =>{
        setDepartmentMenuArr(filterData.map((item)=>(
            <MobileFilter  mobile={false}
                            hide={nowCollegeId!==item['id'] && item['id']!==0}
                            id={item['id']}
                            value={item}
                            onClick={handleClick}
            />
        )));
    },[filterData,nowCollegeId]);
    

    return(
    <ButtonToolbar style={{
                            position: 'absolute',
                            top: '50px',
                            left: '2%',
                            width: '59%',
                            backgroundColor: 'rgb(229,68,109)',
                            color: 'white',
                            lineHeight: '31px',
                            fontSize: '12px',
                            outline: 'none',
    }} >
        {'依學院/系: '}
        {departmentMenuArr}
        
    </ButtonToolbar>

    );
}

export default MobileDepartmentFilterPresenter;