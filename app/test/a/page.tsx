"use client";

import Header from "@/components/Header";
import { useState } from "react";

export default function (){
    const [count, setCount] = useState(0)
    return <div>
        {/* <Header/> */}
        <div>
            {count}
        </div>
        <button onClick={() => setCount(count+1)}>Increase</button>
    </div>
}