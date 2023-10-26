export const FormContainer = (props) => {

    return(
        <div className="flex justify-center my-20">
          <div className="text-black text-xl px-10 bg-customGrey p-6 py-10 w-5/12 space-y-5 rounded-lg">
            {props.children}
          </div>
        </div>
    )
}