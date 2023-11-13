export const Card = ({imgs, text, color}) => {
    return(
        <div className={`h-[525px] w-[400px] rounded-lg  border-black border`} style={{background: color}}>
            
            <div className="min-h-[100px]">
                {imgs.logo &&  <img src={imgs.logo} className="w-[400px] h-[100px]"></img>}
            </div>
            
            
            
            <div className={`${imgs.qr? "": "flex justify-center items-center align-middle h-[425px] h-max-[425px] "}`}>
                {
                    imgs.qr && <div className="flex justify-center my-10">
                        <img src={imgs.qr} className="w-[200px] h-[200px]"></img>
                    </div>
                }
                {
                    <div className="flex justify-center items-center align-middle text-center"><h3>
                        {text.split("\n").map((line) => (
                            <p>{line}</p>
                        ))}
                    </h3></div>
                }
            </div>
           
            
            
            

        </div>
    )
}

