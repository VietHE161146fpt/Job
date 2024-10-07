
import { Badge } from './ui/badge'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

const AppliedJobTable = () => {
    return (
        <div>
            <Table>
                <TableCaption className="mb-5">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableHead>9/9/2024</TableHead>
                        <TableHead>Software Architect</TableHead>
                        <TableHead>ABC</TableHead>
                        <TableHead className="text-right"><Badge className="bg-green-600">Hired</Badge></TableHead>
                    </TableRow>
                    <TableRow>
                        <TableHead>9/9/2024</TableHead>
                        <TableHead>Software Architect</TableHead>
                        <TableHead>ABC</TableHead>
                        <TableHead className="text-right"><Badge className="bg-green-600">Hired</Badge></TableHead>
                    </TableRow>
                    <TableRow>
                        <TableHead>9/9/2024</TableHead>
                        <TableHead>Software Architect</TableHead>
                        <TableHead>ABC</TableHead>
                        <TableHead className="text-right"><Badge variant={"destructive"}>Rejected</Badge></TableHead>
                    </TableRow>
                    <TableRow>
                        <TableHead>9/9/2024</TableHead>
                        <TableHead>Software Architect</TableHead>
                        <TableHead>ABC</TableHead>
                        <TableHead className="text-right"><Badge variant={"destructive"}>Rejected</Badge></TableHead>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable