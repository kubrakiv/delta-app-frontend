import ModalCloseComponent from "../../../components/Modal/ModalCloseComponent/ModalCloseComponent";

const GenericHeaderComponent = ({ title, onClose }) => {
  //   const wordToLowerCase = (word) => {
  //     return word?.toLowerCase();
  //   };

  return (
    <>
      <div className="generic-modal__header">
        <div className="generic-modal__header-block">{title && title}</div>
        <ModalCloseComponent onClose={onClose} />
      </div>
    </>
  );
};

export default GenericHeaderComponent;
