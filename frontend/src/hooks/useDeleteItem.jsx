import { useState } from "react";
import { Modal, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useDeleteItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();

  const showDeleteModal = (item) => {
    setItemToDelete(item);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      await axios.delete(`http://localhost:3000/items/${itemToDelete.id}`);
      message.success("Объявление удалено!");
      setIsModalOpen(false);

      if (window.location.pathname.includes(`/list/${itemToDelete.id}`)) {
        navigate("/list");
      }

      return itemToDelete.id;
    } catch (error) {
      message.error("Ошибка при удалении!");
      console.error(error);
    }
  };

  const DeleteModal = (
    <Modal
      title="Удалить объявление?"
      open={isModalOpen}
      onOk={handleDelete}
      onCancel={() => setIsModalOpen(false)}
      okText="Да, удалить"
      cancelText="Отмена"
      okButtonProps={{ danger: true }}
    >
      <p>Вы уверены, что хотите удалить "{itemToDelete?.name}"?</p>
    </Modal>
  );

  return { showDeleteModal, DeleteModal };
};

export default useDeleteItem;
