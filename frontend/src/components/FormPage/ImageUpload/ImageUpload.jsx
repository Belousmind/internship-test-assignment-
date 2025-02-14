import { Form, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const beforeUpload = (file) => {
  const isImage = ["image/jpeg", "image/jpg", "image/png"].includes(file.type);
  const isSizeValid = file.size / 1024 / 1024 < 5;

  if (!isImage) {
    message.error("Можно загружать только JPG, JPEG или PNG!");
    return false;
  }

  if (!isSizeValid) {
    message.error("Размер файла не должен превышать 5МБ!");
    return false;
  }

  return true;
};

const ImageUpload = ({ setImageUrl }) => {

  const handleChange = ({ file }) => {
    if (file.status === "done" || file.status === "uploading") {
      const localUrl = URL.createObjectURL(file.originFileObj);
      setImageUrl(localUrl);
    } else {
      setImageUrl("");
    }
};


return (
    <Form.Item
      label={<>Фото</>}
      help={<span style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
      Допустимые форматы: JPG, JPEG, PNG. Максимальный размер: 5МБ.</span>}
    >
      <Upload
        action={false}
        beforeUpload={beforeUpload}
        listType="picture"
        onChange={handleChange}
        customRequest={({ file, onSuccess }) => {
          setTimeout(() => {
            onSuccess("ok");
          }, 0);
        }}
        >
        <Button icon={<UploadOutlined />}>Загрузить</Button>
      </Upload>
    </Form.Item>
  );
};

export default ImageUpload;
