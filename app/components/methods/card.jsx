export const Card = ({data}) => {
    return(
        <div className={`h-[525px] w-[400px] rounded-lg  border-black border`} style={{background: data.color}}>
            
            <div className="min-h-[100px]">
                {data.logo &&  <img src={data.logo} className="w-[400px] h-[100px]"></img>}
            </div>
            
            
            
            <div className={`${data.qr? "": "flex justify-center items-center align-middle h-[425px] h-max-[425px] "}`}>
                {
                    data.qr && <div className="flex justify-center my-10">
                        <img src={data.qr} className="w-[200px] h-[200px]"></img>
                    </div>
                }
                {
                    <div className="flex justify-center items-center align-middle text-center"><h3>
                        {(data.info).split("\n").map((line) => (
                            <p>{line}</p>
                        ))}
                    </h3></div>
                }
            </div>
           
            
            
            

        </div>
    )
}

