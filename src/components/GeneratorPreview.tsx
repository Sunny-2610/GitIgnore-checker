import { Clipboard, ClipboardCheck } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  gitignoreContent: string;
  setGitignoreContent: (value: string) => void;
}

const GeneratorPreview: React.FC<Props> = ({
  gitignoreContent,
  setGitignoreContent,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(gitignoreContent);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <Textarea
        value={gitignoreContent}
        onChange={(e) => setGitignoreContent(e.target.value)}
        className="bg-white w-full h-96 p-2 mb-2 border-black rounded font-mono"
      />

      <div className="flex flex-col items-center">
        <Button onClick={handleCopy} className="w-full">
          {copied && (
            <>
              <ClipboardCheck />
              <span className="pr-4">Copied</span>
            </>
          )}
          {!copied && (
            <>
              <Clipboard />
              <span className="pr-4">Copy</span>
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default GeneratorPreview;