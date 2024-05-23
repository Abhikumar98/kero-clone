import React from "react";
import Modal from "../Modal";

const GeneratedNFT = ({ image, metadata }) => {
    const [modalOpen, setModalOpen] = React.useState(false);
    return (
        <>
            <img
                src={image}
                onClick={() => setModalOpen(true)}
                className="h-36 w-36 rounded-md mr-5 mb-5"
            />
            <Modal open={modalOpen} setOpen={setModalOpen}>
                <pre>{JSON.stringify(metadata, null, 4)}</pre>
            </Modal>
        </>
    );
};

export default GeneratedNFT;
