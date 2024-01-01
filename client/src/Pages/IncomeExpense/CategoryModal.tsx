import {UseMutateAsyncFunction} from '@tanstack/react-query';
import {Button, Modal} from 'flowbite-react';
import useUserStore from '../../stores/userStore';
import {useState} from 'react';
import {AddCategoryProps} from '../../helpers/CategoryHelpers';
import Category from '../../interfaces/Category';

type Props = {
    openModal: string | undefined
    setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>
    addCategory: UseMutateAsyncFunction<void, Error, AddCategoryProps, unknown>
    userCategories: Category[] | undefined
}

const CategoryModal = ({openModal, setOpenModal, addCategory, userCategories}: Props) => {

    const {user} = useUserStore();
    const [newCategory, setNewCategory] = useState("");

    const handleAddCategory = async () => {
        try {
            await addCategory({user, categoryName: newCategory, userCategories});
            setNewCategory("");
            setOpenModal(undefined)
        } catch (err) {
            console.error('Error handling add category', err);
        }
    }

    return (
        <Modal dismissible show={openModal === 'dismissible'} onClose={() => setOpenModal(undefined)}>
            <Modal.Header>Category Name</Modal.Header>
            <Modal.Body  >
                <input placeholder="TestCategory" maxLength={6} onChange={(e) => setNewCategory(e.target.value)} type="text" id="small-input"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" />
            </Modal.Body>
            <Modal.Footer>
                <Button style={{backgroundColor: "#84cc16"}} onClick={handleAddCategory}>Create</Button>
                <Button color="gray" onClick={() => setOpenModal(undefined)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CategoryModal