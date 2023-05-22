import { Table, Tooltip } from "antd";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Carts = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isRequestFormCreateOpen, setAddRequestFormCreateOpen] =
    useState(false);
  const [isLoadData, setIsLoadData] = useState(false);

  const [dataFilter, setDataFilter] = useState([]);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(10);

  const [listSortFieldDesc, setListSortFieldDesc] = useState(["id"]);
  const [listSortFieldAsc, setListSortFieldAsc] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    setPage(1);
  }, [totalResults]);

  const checkLoadData = () => {
    setIsLoadData(!isLoadData);
  };

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
      title: "Người đề nghị",
      key: "createdUserDTO",
      align: "center",
      width: 150,
      render: (item) => item?.createdUserDTO?.fullName,
    },
    {
      title: "Loại đề nghị",
      key: "requestTypeDTO",
      align: "center",
      width: 150,
      render: (item) => item?.requestTypeDTO?.name,
    },
    {
      title: "Số tiền",
      key: "totalMoney",
      align: "center",
      width: 150,
      //   render: (item) => formatNumberLargeDecimal(item?.totalMoney),
      sorter: (a, b) => parseInt(a.totalMoney) > parseInt(b.totalMoney),
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
    <div className="main-content-container container-fluid px-4">
      <div className="page-header row no-gutters py-4 d-flex justify-content-between">
        <div className="d-flex justify-content-between">
          <h3 className="page-title">Danh sách Cart</h3>
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

export default Carts;
