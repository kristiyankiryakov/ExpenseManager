import {Button, Modal} from 'flowbite-react';

type Props = {
    openModal: string | undefined
    setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>
    addCategory: React.MouseEventHandler<HTMLButtonElement>
    setNewCategory: React.Dispatch<React.SetStateAction<string>>
}

const CategoryModal = ({openModal, setOpenModal, addCategory, setNewCategory}: Props) => {

    return (
        <Modal dismissible show={openModal === 'dismissible'} onClose={() => setOpenModal(undefined)}>
            <Modal.Header>Category Name</Modal.Header>
            <Modal.Body  >
                <input placeholder="TestCategory" maxLength={6} onChange={(e) => setNewCategory(e.target.value)} type="text" id="small-input"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" />
            </Modal.Body>
            <Modal.Footer>
                <Button style={{backgroundColor: "#84cc16"}} onClick={addCategory}>Create</Button>
                <Button color="gray" onClick={() => setOpenModal(undefined)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CategoryModal