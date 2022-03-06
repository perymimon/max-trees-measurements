import {useAsync} from 'react-async'

function timer({time, value}) {
    // console.log('timer...',time,value)
    return new Promise((res, rej) => {
        setTimeout(_ => {
            res(value)
        }, time)
    })
}

export default function Time() {
    const response = useAsync(timer,{ time: 7000, value: 40})
    const {data, isPending,error} = response;
    if (isPending) return "Loading..."
    if (error) return `Something went wrong: ${error.message}`
    // console.log('response..', response)
    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    )
}