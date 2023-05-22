import { Table, Tooltip } from "antd";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./home.css";
import { toast } from "react-toastify";
import { getParams } from "service/api/apiRequest.service";
import { optionsError } from "service/api/toast.service";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [dataFilter, setDataFilter] = useState([]);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(10);

  const [listSortFieldDesc, setListSortFieldDesc] = useState(["id"]);
  const [listSortFieldAsc, setListSortFieldAsc] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    setPage(1);
  }, [totalResults]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: 50,
      align: "center",
      render: (item) => pageNumber * (page - 1) + item,
    },
    {
      title: "Customer",
      key: "customer",
      align: "center",
      width: 150,
      render: (item) => item?.createdUserDTO?.fullName,
    },
    {
      title: "Shop",
      key: "shop",
      align: "center",
      width: 150,
      render: (item) => item?.requestTypeDTO?.name,
    },
    {
      title: "Product",
      key: "product",
      align: "center",
      width: 150,
      render: (item) => item?.requestTypeDTO?.name,
    },
    {
      title: "Thao tác",
      align: "center",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <>
          <Tooltip title="Xem chi tiết">
            <i
              onClick={() => history.push(`/request/detail/${record.id}`)}
              className="material-icons"
              style={{ marginRight: "6px", cursor: "pointer" }}
            >
              info
            </i>
          </Tooltip>
        </>
      ),
    },
  ];

  const handleChangePagination = useCallback(
    (newPagination, filters, sorter) => {
      setPage(newPagination?.current);
      setPageNumber(newPagination?.pageSize);
      if (sorter.order === "ascend") {
        setListSortFieldAsc([sorter.columnKey]);
        setListSortFieldDesc([]);
      } else if (sorter.order === "descend") {
        setListSortFieldAsc([]);
        setListSortFieldDesc([sorter.columnKey]);
      } else {
        setListSortFieldAsc([]);
        setListSortFieldDesc(["id"]);
      }
    },
    []
  );

  return (
    <div className="main-content-container my-3">
      <div className="d-flex justify-content-between">
        <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
          <span className="text-uppercase page-subtitle">Tổng quan</span>
        </div>
      </div>

      <Table
        style={{ fontSize: "12px !important" }}
        columns={columns}
        dataSource={dataFilter}
        align="center"
        scroll={{ x: 1300 }}
        pagination={{
          position: ["topRight"],
          defaultPageSize: 10,
          current: page,
          showSizeChanger: true,
          total: totalResults,
          pageSizeOptions: ["10", "20", "50", "100", "500", "1000"],
        }}
        onChange={handleChangePagination}
      />
    </div>
  );
};

export default Home;
