'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Avatar,
  Button,
  Card,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Icon,
  Stack,
  HStack,
  Link,
  Box,
  Heading,
} from '@chakra-ui/react'
import { MdChevronRight, MdChevronLeft } from 'react-icons/md'
import {
  PaginationState,
  createColumnHelper,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table'
import { collection, doc, orderBy, query } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'

import Search from './Search'
import LoadingOverlay from 'components/ui/LoadingOverlay'
import { User, deleteUser, updateUser } from '@common/models/user'
import { recordUrl } from '@common/helpers/firestore'

export default function UsersTable() {
  const firestore = useFirestore()
  const usersCollection = collection(firestore, 'users')
  const usersQuery = query(usersCollection, orderBy('email', 'asc'))

  const { data: users, status } = useFirestoreCollectionData(usersQuery)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const textColor = useColorModeValue('navy.700', 'white')
  const borderColor = useColorModeValue('neutral.200', 'whiteAlpha.100')
  const brandColor = useColorModeValue('brand.500', 'brand.400')

  const renderActions = (uid: string) => {
    const user = users.filter(u => u.uid === uid)[0]

    if (!user) return null

    return (
      <HStack>
        {user.admin ? (
          <Button size="sm" bg="red.300" w="80px" onClick={() => updateUser(firestore, user.uid, { admin: false })}>
            Demote
          </Button>
        ) : (
          <Button size="sm" bg="green.300" w="80px" onClick={() => updateUser(firestore, user.uid, { admin: true })}>
            Promote
          </Button>
        )}
        <Button size="sm" onClick={() => window.open(recordUrl('users', uid))}>
          Firestore
        </Button>
        <Button size="sm" bg="red.300" onClick={() => deleteUser(firestore, user.uid)}>
          Delete
        </Button>
      </HStack>
    )
  }

  const columnHelper = createColumnHelper<User>()
  const columns = [
    columnHelper.accessor('photoUrl', {
      id: 'photoUrl',
      header: () => <Text>Avatar</Text>,
      cell: info => <Avatar src={info.getValue()} h="30px" w="30px" me="10px" />,
    }),
    columnHelper.accessor('displayName', {
      id: 'displayName',
      header: () => <Text>NAME</Text>,
      cell: info => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => <Text>EMAIL</Text>,
      cell: info => <Link href={`mailto:${info.getValue()}`}>{info.getValue()}</Link>,
    }),
    columnHelper.accessor('uid', {
      id: 'uid',
      header: () => <Text>Actions</Text>,
      cell: info => renderActions(info.getValue()),
    }),
  ]

  const [data, setData] = useState<User[]>([])
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
      pagination,
    },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })
  const createPages = (count: number) => {
    let arrPageCount = []

    for (let i = 1; i <= count; i++) {
      arrPageCount.push(i)
    }

    return arrPageCount
  }

  useEffect(() => {
    if (status === 'success') setData(users as User[])
  }, [users, status])

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }])
      }
    }
  }, [table.getState().columnFilters[0]?.id])

  const renderContent = () => (
    <>
      <HStack p="22px" justifyContent="space-between">
        <Heading as="h2">Users</Heading>
        <Search value={globalFilter ?? ''} onChange={setGlobalFilter} />
      </HStack>
      <Table variant="simple" color="neutral.500" mb="24px">
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <Th pe="10px" borderColor={borderColor} key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <Flex
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                        justify="space-between"
                        align="center"
                        fontSize={{
                          sm: '10px',
                          lg: '12px',
                        }}
                        color="neutral.400"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted() as string] ?? null}
                      </Flex>
                    )}
                  </Th>
                )
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <Tr px="20px" key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <Td
                      key={cell.id}
                      fontSize={{ sm: '14px' }}
                      minW={{
                        sm: '150px',
                        md: '200px',
                        lg: 'auto',
                      }}
                      borderColor={borderColor}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      <Flex w="100%" alignItems="center" justify="space-between" px="20px" pb="20px">
        <Text fontSize="sm" color="neutral.500" fontWeight="normal" mb={{ sm: '24px', md: '0px' }}>
          Showing {pageSize * pageIndex + 1} to {pageSize * (pageIndex + 1) <= users.length ? pageSize * (pageIndex + 1) : users.length} of{' '}
          {users.length} entries
        </Text>

        <div className="flex items-center gap-2">
          <Stack direction="row" alignSelf="flex-end" spacing="4px" ms="auto">
            <Button
              variant="no-effects"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              transition="all .5s ease"
              w="40px"
              h="40px"
              borderRadius="50%"
              bg="transparent"
              border="1px solid"
              borderColor={useColorModeValue('neutral.200', 'white')}
              display={pageSize === 5 ? 'none' : table.getCanPreviousPage() ? 'flex' : 'none'}
              _hover={{
                bg: 'whiteAlpha.100',
                opacity: '0.7',
              }}
            >
              <Icon as={MdChevronLeft} w="16px" h="16px" color={textColor} />
            </Button>
            {createPages(table.getPageCount()).map((pageNumber, index) => {
              return (
                <Button
                  variant="no-effects"
                  transition="all .5s ease"
                  onClick={() => table.setPageIndex(pageNumber - 1)}
                  w="40px"
                  h="40px"
                  borderRadius="50%"
                  bg={pageNumber === pageIndex + 1 ? brandColor : 'transparent'}
                  border={pageNumber === pageIndex + 1 ? 'none' : '1px solid lightgray'}
                  _hover={
                    pageNumber === pageIndex + 1
                      ? {
                          opacity: '0.7',
                        }
                      : {
                          bg: 'whiteAlpha.100',
                        }
                  }
                  key={index}
                >
                  <Text fontSize="sm" color={pageNumber === pageIndex + 1 ? '#fff' : textColor}>
                    {pageNumber}
                  </Text>
                </Button>
              )
            })}
            <Button
              variant="no-effects"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              transition="all .5s ease"
              w="40px"
              h="40px"
              borderRadius="50%"
              bg="transparent"
              border="1px solid"
              borderColor={useColorModeValue('neutral.200', 'white')}
              display={pageSize === 5 ? 'none' : table.getCanNextPage() ? 'flex' : 'none'}
              _hover={{
                bg: 'whiteAlpha.100',
                opacity: '0.7',
              }}
            >
              <Icon as={MdChevronRight} w="16px" h="16px" color={textColor} />
            </Button>
          </Stack>
        </div>
      </Flex>
    </>
  )

  return (
    <Card minW="50%" mx="20px" position="relative">
      {status === 'loading' ? <LoadingOverlay /> : renderContent()}
    </Card>
  )
}
