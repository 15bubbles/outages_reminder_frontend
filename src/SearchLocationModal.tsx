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
import { Location } from "./interfaces";

interface SearchLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (location: Location) => void;
}

// TODO: validation (at least required and so on - I think I'll need some react-hook-form for that?)
export const SearchLocationModal = ({
  isOpen,
  onClose,
  onSubmit,
}: SearchLocationModalProps) => {
  const [formData, setFormData] = useState<Location>({
    city: "",
    street: "",
    houseNo: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = () => {
    onSubmit(formData);
    onClose();
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
          <Button colorScheme="blue" onClick={handleOnSubmit}>
            Sprawdź
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
