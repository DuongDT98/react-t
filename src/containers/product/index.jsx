import { Table } from "antd";
import React, { useState } from "react";
import { getListProductAction } from "../../store/product/product.actions";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalCreate from "./ModalCreate";

const Product = () => {
  const dispatch = useDispatch();
  const [isRequestFormCreateOpen, setAddRequestFormCreateOpen] =
    useState(false);
  const [isLoadData, setIsLoadData] = useState(false);

  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(10);

  const [listSortFieldDesc, setListSortFieldDesc] = useState(["id"]);
  const [listSortFieldAsc, setListSortFieldAsc] = useState([]);

  // data Table
  const { listProducts, totalResults } = useSelector((state) => state.products);

  const handleGetListProducts = useCallback(() => {
    dispatch(getListProductAction());
  }, [dispatch]);

  useEffect(() => {
    handleGetListProducts();
  }, [handleGetListProducts]);

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
      title: "Name",
      key: "name",
      align: "center",
      width: 150,
      render: (item) => item?.fullName,
    },
    {
      title: "Price",
      key: "price",
      align: "center",
      width: 150,
      render: (item) => item?.price,
    },
    {
      title: "Shop",
      key: "shop",
      align: "center",
      width: 150,
      render: (item) => item?.shop,
    },
    // {
    //   title: "Thao tác",
    //   align: "center",
    //   key: "action",
    //   fixed: "right",
    //   width: 100,
    //   render: (_, record) => (
    //     <>
    //       <Tooltip title="Xem chi tiết">
    //         <i
    //           onClick={() => history.push(`/request/detail/${record.id}`)}
    //           className="material-icons"
    //           style={{ marginRight: "6px", cursor: "pointer" }}
    //         >
    //           info
    //         </i>
    //       </Tooltip>
    //     </>
    //   ),
    // },
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
          <h3 className="page-title">Danh sách Product</h3>
          <button
            onClick={() => setAddRequestFormCreateOpen(true)}
            className="mb-2 mr-1 btn btn-primary btn-sm"
            style={{ fontSize: "15px" }}
          >
            Thêm Product
          </button>
        </div>
      </div>

      <Table
        style={{ fontSize: "12px !important" }}
        columns={columns}
        dataSource={listProducts}
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
      {isRequestFormCreateOpen && (
        <ModalCreate
          // listData={data}
          isRequestFormCreateOpen={isRequestFormCreateOpen}
          setAddRequestFormCreateOpen={setAddRequestFormCreateOpen}
          checkLoadData={checkLoadData}
        />
      )}
    </div>
  );
};

export default Product;
