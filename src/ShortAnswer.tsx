    const taskData = 
    {
        task_title: "Eum illo.",
        task_description: "Dolorem quibusdam et ut.",
        task_type: "shortAnswer",
        feedback: "quia",
        questionsOrImages: [
            {
                id: 1,
                question: "Melyik az az afrikai állat, amely hatalmas füleivel szabályozza a testhőmérsékletét, és az egyik legintelligensebb szárazföldi élőlénynek számít?",
                img: null
            },
            {
                id: 2,
                question: "quod",
                img: null
            },
            {
                id: 3,
                question: "vitae",
                img: null
            },
            {
                id: 4,
                question: "tenetur",
                img: null
            },
            {
                id: 5,
                question: "quod",
                img: null
            },
            {
                id: 6,
                question: "enim",
                img: null
            },
            {
                id: 7,
                question: "consequatur",
                img: null
            },
            {
                id: 8,
                question: "dignissimos",
                img: null
            },
            {
                id: 9,
                question: "dignissimos",
                img: null
            }
        ],
        answers: [
            "inventore",
            "et",
            "ut"
        ]
    }
   
function ShortAnswer (){
    return(
        <div>
            {/* feladat címe */}
            <div className='task-padding font-semibold text-TaskTitle'>{taskData.task_title}</div>
            {/* feladat leírása */}
            <div className='task-padding font-semibold text-TaskDesc'>{taskData.task_description}</div>
           
            <div className="task-padding grid grid-cols-6 gap-8">
                {taskData.questionsOrImages.map((item)=>( 
                    <div className="bg-white mb-6 h-fit rounded-[8px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                        <div className="text-center text-[18px] p-2 font-semibold">{item.question}</div>
                        <div className="px-[6px] pb-[6px] pt-8">
                            <input className="w-full h-[35px] border-[#D1D5DB] shadow-[inset_1px_2px_8px_rgba(0,0,0,0.25)] rounded-[5px] pl-2" type="text" />
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}
export default ShortAnswer