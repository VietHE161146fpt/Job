
import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Mail } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'



const Profile = () => {
    return (
        <div>
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/640px-Cat03.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>Mr.A</h1>
                            <p>A devoted learner of technology</p>
                        </div>
                    </div>
                    <UpdateProfileDialog />
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>abc@gmail.com</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>09656446342</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='text-left text-md font-bold'>Skills</h1>
                    <div className='flex items-center gap-1'>
                        <Badge>Java</Badge>
                        <Badge>Javascript</Badge>
                        <Badge>Kotlin</Badge>
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5 my-5'>
                    <Label className="text-left text-md font-bold">Resume</Label>
                    <a target='blank' href="https://web-developer-resume-example.pdf" className='text-left text-blue-500 w-full hover:underline cursor-pointer'>Company A need a web dev</a>
                    <a target='blank' href="#" className='text-left text-blue-500 w-full hover:underline cursor-pointer'>Company A need a web dev</a>
                    <a target='blank' href="#" className='text-left text-blue-500 w-full hover:underline cursor-pointer'>Company A need a web dev</a>
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
        </div>
    )
}

export default Profile