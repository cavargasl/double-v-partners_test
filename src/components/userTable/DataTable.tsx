import { useEffect, useMemo, useState } from "react"
import { BASE_PER_PAGE } from "@domain/models/paginationModel"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
} from "@tanstack/react-table"
import { useNavigate, useSearchParams } from "react-router-dom"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "../ui/button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isSearching: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isSearching,
}: DataTableProps<TData, TValue>) {
  const [searchParams] = useSearchParams()
  const per_page = searchParams.get("per_page") ?? BASE_PER_PAGE
  const navigate = useNavigate()

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: Number(per_page),
  })

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  useEffect(() => {
    setPagination({
      pageIndex: 1,
      pageSize: Number(per_page),
    })
  }, [per_page])

  useEffect(() => {
    navigate({
      pathname: "/",
      search: `?per_page=${pageSize}`,
    })
  }, [pageSize, navigate])

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!isSearching && (
        <div className="flex items-center justify-center space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageSize: BASE_PER_PAGE,
              }))
            }
            disabled={Number(pageSize) <= BASE_PER_PAGE}
          >
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPagination((prev) => ({
                pageIndex: prev.pageIndex,
                pageSize:
                  Number(prev.pageSize) <= BASE_PER_PAGE
                    ? BASE_PER_PAGE
                    : Number(prev.pageSize) - BASE_PER_PAGE,
              }))
            }
            disabled={Number(pageSize) <= BASE_PER_PAGE}
          >
            Dismiss
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPagination((prev) => ({
                pageIndex: prev.pageIndex,
                pageSize: Number(prev.pageSize) + BASE_PER_PAGE,
              }))
            }
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  )
}
