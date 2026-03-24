type StudentCardProps={
    id:number,
    name:string
}
export const StudentCard = ({id,name}:StudentCardProps)=>{
    return (
        <div  className="flex h-[64px] w-[334px] border-lightBorder border-[1px] px-[17px] py-[11px] rounded-[5px] shadow-md" key={id}>
            <p className="text-[24px] font-medium text-darkGrayText">{name}</p>
        </div>
    )
}