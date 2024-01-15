import React,{useEffect, useState} from 'react'

const Check = () => {
    const [num,setNum] = useState(1);
    useEffect(()=>{
        setNum(num+1);
    },[])
  return (
      <div>
        {console.log(num)}
        {num}

    </div>
  )
}

export default Check
