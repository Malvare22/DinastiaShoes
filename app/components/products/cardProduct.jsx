export const CardProduct = ({img, title, price, id}) => {
    return (
        <div className="bg-card rounded-md border-2 p-2 mx-1 my-2">
            <div className="flex-col flex justify-center h-full">
                <div className="flex justify-center"><img src={img} className="w-20 h-20 border-2 border-black rounded-md"></img></div>
                <h4 className="text-black mt-5 text-sm mb-2">{title}</h4>
                <div className="h-full flex items-end">
                    <h5 className="text-black font-bold">${price}</h5>
                </div>
            </div>
        </div>
    );
}