import { useState } from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface SearchLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  // TODO: use Location interface here
  onSubmit: (location: object) => void;
}

export const SearchLocationModal = ({
  isOpen,
  onClose,
  onSubmit,
}: SearchLocationModalProps) => {
  // TODO: use Location interface here
  const [formData, setFormData] = useState({
    city: "",
    street: "",
    houseNo: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Wyszukaj lokalizację</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl id="city" mb={4}>
            <FormLabel>Miasto</FormLabel>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="street" mb={4}>
            <FormLabel>Ulica</FormLabel>
            <Input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="houseNo" mb={4}>
            <FormLabel>Numer domu</FormLabel>
            <Input
              type="text"
              name="houseNo"
              value={formData.houseNo}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Anuluj
          </Button>
          <Button colorScheme="blue" onClick={onSubmit}>
            Sprawdź
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
