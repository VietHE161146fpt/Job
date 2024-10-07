import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

const Job = () => {
    
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>Today</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/640px-Cat03.jpg"} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>Company name</h1>
                    <p className='text-sm text-gray-500'>Country</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>Job title</h1>
                <p className='text-sm text-gray-600'>Job desc</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">Job Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">Jov type</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">Job salary</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button variant="outline">Details</Button>
                <Button className="bg-[#7209b7]">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job