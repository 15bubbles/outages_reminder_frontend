import { ButtonProps, IconButton } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";

export const SubscribeButton = (props: ButtonProps) => {
  const handleOnClick = () => {
    console.log("subscribe button clicked");
  };

  return (
    <IconButton
      aria-label="notify-about-outages"
      bg="red.500"
      colorScheme="red"
      icon={<FaBell />}
      isRound={true}
      onClick={handleOnClick}
      size="lg"
      shadow="lg"
      variant="solid"
      _hover={{ bg: "red.600" }}
      {...props}
    />
  );
};
