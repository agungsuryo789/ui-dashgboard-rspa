import React, { Fragment, useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import DataDummyDrug from '../api/drug_data_dummy.json'

import Table from "@mui/material/Table";
import Title from "./Title";

export default function Orders() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [sortedBy, setSortedBy] = useState([]);

  useEffect(() => {
    setColumns([
      {
        Header: () => null,
        id: "dataObat",
        columns: [
          {
            Header: "ID",
            accessor: "id",
            sortAble: true,
          },
          {
            Header: "Kode Obat",
            accessor: "kodeobat",
            sortAble: true,
          },
          {
            Header: "Nama Obat",
            accessor: "namaobat",
            sortAble: true,
          },
          {
            Header: "Stock",
            accessor: "stock",
            sortAble: true,
          },
          {
            Header: "Satuan",
            accessor: "satuan",
            sortAble: true,
          },
          {
            Header: "Harga(Rp)",
            accessor: "harga",
            sortAble: true,
          },
        ],
      },
    ]);
    
	let dataDummy = DataDummyDrug;
	let mappedData = dataDummy.map((item) => ({
		id: item.id,
		kodeobat: item.kode_obat,
		namaobat: item.nama_obat,
		stock: item.stock,
		satuan: item.satuan,
		harga: item.harga
	}))
	console.log(DataDummyDrug);
	setData(mappedData);
  }, []);

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const getData = () => {
    fetch("./api/drug_data_dummy.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
      });
  };

  return (
    <React.Fragment>
      <Title>Data Obat</Title>
      <Table {...getTableProps()} style={{textAlign: 'left'}}>
        <thead>
          {headerGroups.map((headerGroup, index) =>
            index > 0 ? (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ) : null
          )}
        </thead>

        <tbody {...getTableBodyProps()} className="text-left">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </React.Fragment>
  );
}
