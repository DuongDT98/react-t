import { Form, Input, Button, Modal } from "antd";
import { LAYOUT, TAILLAYOUT } from "helpers/constants";
import { FIELD_REQUIRED } from "helpers/message";
import { toast } from "react-toastify";
import { createData } from "service/api/apiRequest.service";
import { optionsError, optionsSuccess } from "service/api/toast.service";

const ModalCreate = ({
  // listData,
  isRequestFormCreateOpen,
  setAddRequestFormCreateOpen,
  checkLoadData,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (Formvalues) => {
    let data = {
      name: Formvalues.name?.trim(),
      price: Formvalues.price?.trim(),
      shop: Formvalues.shop,
    };
    // call API create

    var result = await createData("/product/add", data);
    if (result) {
      toast("Thêm thành công", optionsSuccess);

      setAddRequestFormCreateOpen(false);
      checkLoadData();
    } else {
      toast("Thêm thất bại. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  return (
    <Modal
      title="Thêm mới"
      centered
      visible={isRequestFormCreateOpen}
      footer={null}
      width={800}
      onCancel={() => setAddRequestFormCreateOpen(false)}
    >
      <Form {...LAYOUT} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input placeholder="Nhập..." />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input placeholder="Nhập..." />
        </Form.Item>

        <Form.Item
          name="shop"
          label="Shop"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input placeholder="Nhập..." />
        </Form.Item>

        <Form.Item {...TAILLAYOUT}>
          <Button
            htmlType="button"
            onClick={() => setAddRequestFormCreateOpen(false)}
            style={{ marginRight: "16px" }}
          >
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Thêm mới
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalCreate;
