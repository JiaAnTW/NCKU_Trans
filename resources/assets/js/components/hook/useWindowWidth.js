import {useState ,useEffect} from 'react';

const useWindowWidth = (handleFunction,props) =>{
    const [windowWidth,setWindowWidth] = useState(window.innerWidth);

    const handleWindowWidth=()=>{
        setWindowWidth(window.innerWidth);
    }

    useEffect(()=>{
        window.addEventListener('resize',handleFunction(props,windowWidth));
        return(()=>{
            window.removeEventListener('resize',handleFunction(props,windowWidth));
        })
    },[]);

    return windowWidth;
}

export default useWindowWidth;