import { Box, Button } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export const UploadWidget = ({ updateImageUrl }) => {
  const [img_url, setImgUrl] = useState("");
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dndff6clf",
        uploadPreset: "hihrg0fk",
        sources: ["local", "url"],
        maxFileSize: 5000000,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          setImgUrl(result.info.url);
          updateImageUrl(result.info.url);
        }
      }
    );
  }, []);

  return (
    <Box mb="4">
      <Button
        type="button"
        colorScheme="cyan"
        size="sm"
        p="2"
        m="1"
        onClick={() => widgetRef.current.open()}
      >
        Upload Image
      </Button>
    </Box>
  );
};
