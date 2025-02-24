import CardBody from "./CardBody";
import Cardheader from "./Cardheader";

export default function Card({className, children}) {
  return (
    <div className={` ${className}  p-1 rounded-md flex flex-col bg-indigo-100 `}>
        {children}
    </div>
  )
}
