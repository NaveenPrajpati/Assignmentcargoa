import { useState } from "react"


function useValues(){
const[search,setSearch]=useState('')
const[isLogin,setIsLogin]=useState(false)

const values={
    search,setSearch,isLogin,setIsLogin
}


return values
}
export default useValues