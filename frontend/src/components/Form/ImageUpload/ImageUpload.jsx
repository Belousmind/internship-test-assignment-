import { Form, Upload, Button, message, Tooltip } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const beforeUpload = (file) => {
  const isImage = file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png";
  const isSizeValid = file.size / 1024 / 1024 < 5;

  if (!isImage) {
    message.error("Можно загружать только JPG, JPEG или PNG!");
    return Upload.LIST_IGNORE;
  }

  if (!isSizeValid) {
    message.error("Размер файла не должен превышать 5МБ!");
    return Upload.LIST_IGNORE;
  }

  return true;
};

const ImageUpload = ({ fileList, setFileList }) => {

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Form.Item
      label={<>Фото</>}
      help={<span style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>Допустимые форматы: JPG, JPEG, PNG. Максимальный размер: 5МБ.</span>}
    >
      <Upload 
        beforeUpload={beforeUpload}
        listType="picture"
        fileList={fileList}
        onChange={handleChange}
        >
        <Button icon={<UploadOutlined />}>Загрузить</Button>
      </Upload>
    </Form.Item>
  );
};

export default ImageUpload;
