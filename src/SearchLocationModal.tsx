import { useState } from "react";

import {
  Button,
  FormControl,
  FormErrorMessage,
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
  const [formErrors, setFormErrors] = useState<Location>({
    city: "",
    street: "",
    houseNo: "",
  });

  const hasErrors = (): boolean => {
    const errors = { city: "", street: "", houseNo: "" };
    let hasErrors = false;

    if (formData.city === "") {
      errors.city = "Proszę podać miasto";
      hasErrors = true;
    }

    if (formData.street === "") {
      errors.street = "Proszę podać ulicę";
      hasErrors = true;
    }

    if (formData.houseNo === "") {
      errors.houseNo = "Proszę podać numer domu";
      hasErrors = true;
    }

    setFormErrors({ ...formErrors, ...errors });
    return hasErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = () => {
    if (hasErrors()) {
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Wyszukaj lokalizację</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl
            id="city"
            mb={4}
            isInvalid={formErrors.city !== ""}
            isRequired
          >
            <FormLabel>Miasto</FormLabel>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.city}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="street"
            mb={4}
            isInvalid={formErrors.street !== ""}
            isRequired
          >
            <FormLabel>Ulica</FormLabel>
            <Input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.street}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="houseNo"
            mb={4}
            isInvalid={formErrors.houseNo !== ""}
            isRequired
          >
            <FormLabel>Numer domu</FormLabel>
            <Input
              type="text"
              name="houseNo"
              value={formData.houseNo}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.houseNo}</FormErrorMessage>
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
