export const _Task = async(task,callback)=>{
    
    let count = 0
    function checkCompletion() {
        count++;
        if (count === task.length) {
            callback();
        }
    }


    task.forEach((operation,i)=>{
        console.log("this",operation)
        operation()
        .then(()=>{
            console.log(i,'this operation success')
            checkCompletion()
        })
        .catch((err)=>{
            console.log('error in operation',err)
        })
    })
}