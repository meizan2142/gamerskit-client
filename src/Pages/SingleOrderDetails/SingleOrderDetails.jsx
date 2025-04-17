import { useParams } from "react-router";

const SingleOrderDetails = () => {
    const { id } = useParams();
    console.log(id);
    
    return (
        <div className="pt-20 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-10 space-y-6 md:space-y-10 text-center">SingleOrderDetails</div>
    )
}

export default SingleOrderDetails