import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  RadioGroup,
  Radio,
  Input,
} from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "../context";

export default function TransactionForm({ onClose, isOpen }) {
    const{formData,setFormData,value,setValue,handleFormSubmit} = useContext(GlobalContext);

    function handleFormChange(event) {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      }
    
      function handleSubmit(event) {
        event.preventDefault();
        handleFormSubmit(formData);
      }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Enter Description:</FormLabel>
              <Input
                type="text"
                placeholder="Enter Transaction Description"
                name="description"
                  onChange={handleFormChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Enter Amount:</FormLabel>
              <Input
                type="number"
                placeholder="Enter Transaction Amount:"
                name="amount"
                  onChange={handleFormChange}
              />
            </FormControl>
            <RadioGroup
              mt="5"
                value={value}
                onChange={setValue}
            >
              <Radio
                checked={FormData.type === "income"}
                value="income"
                colorScheme="blue"
                name="type"
                  onChange={handleFormChange}
              >
                Income
              </Radio>
              <Radio
                checked={FormData.type === "expense"}
                value="expense"
                colorScheme="red"
                name="type"
                  onChange={handleFormChange}
              >
                Expense
              </Radio>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button mr={"4"} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose} type="submit">
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
