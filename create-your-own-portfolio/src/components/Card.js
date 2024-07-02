import React from "react";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <VStack backgroundColor="white" borderRadius={8}>
      <Image
        src={imageSrc}
        alt={title}
        width="full"
        height="full"
        borderRadius={8}
      />
      <VStack p={4} align="flex-start">
        <Heading as="h3" size="md" color="black">
          {title}
        </Heading>
        <Text color="gray">{description}</Text>
        <HStack color="black">
          <Text>See more</Text>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Card;
