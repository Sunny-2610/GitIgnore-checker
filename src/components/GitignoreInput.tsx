import { FileUp } from 'lucide-react';
import React, { useRef } from 'react';

import { Button } from '@/components/ui/button';

import type { ChangeEvent } from "react";

interface Props {
  onChange: (content: string) => void;
}

const GitignoreInput: React.FC<Props> = ({ onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result as string);

        // Reset file selection
        if (e.target) {
          e.target.value = "";
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
      />

      {/* Button to trigger file selection */}
      <Button type="button" onClick={handleButtonClick}>
        <FileUp />
        <span className="pr-4">Upload</span>
      </Button>
    </>
  );
};

export default GitignoreInput;
