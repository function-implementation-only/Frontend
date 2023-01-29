import React from 'react'
import styled from 'styled-components'

const TableComponentLayout = styled.table`
    border-collapse: separate;
    border-spacing: 0 25px;
    width: max-content;
    height: 160px;
`
const TableHeader = styled.th.attrs({
    scope: 'row',
})`
    font-weight: 700;
    font-size: 16px;
    text-align: left;
`
const TableCell = styled.td`
    background-color: var(--primary-color-100);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 25px;
    margin: 0 24px;
`

interface TableComponentProps {
    frontReqNum: number
    frontendNum: number

    backReqNum: number
    backendNum: number

    mobileNum: number
    mobileReqNum: number

    designNum: number
    designReqNum: number

    pmNum: number
    pmReqNum: number
}

function TableComponent({
    frontReqNum,
    frontendNum,
    backReqNum,
    backendNum,
    mobileReqNum,
    mobileNum,
    designReqNum,
    designNum,
    pmReqNum,
    pmNum,
}: TableComponentProps) {
    return (
        <TableComponentLayout>
            <tbody>
                <tr>
                    <TableHeader>프론트엔드</TableHeader>
                    <TableCell>{`${frontendNum}/${frontReqNum}`}</TableCell>

                    <TableHeader>디자이너</TableHeader>
                    <TableCell>{`${designNum}/${designReqNum}`}</TableCell>
                </tr>
                <tr>
                    <TableHeader>백엔드</TableHeader>
                    <TableCell>{`${backendNum}/${backReqNum}`}</TableCell>

                    <TableHeader>PM</TableHeader>
                    <TableCell>{`${pmNum}/${pmReqNum}`}</TableCell>
                </tr>
                <tr>
                    <TableHeader>모바일</TableHeader>
                    <TableCell>{`${mobileNum}/${mobileReqNum}`}</TableCell>
                </tr>
            </tbody>
        </TableComponentLayout>
    )
}

export default TableComponent
