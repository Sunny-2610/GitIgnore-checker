import ignore from 'ignore';
import { Trash } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { MESSAGES } from '@/constants';

import { useLanguage } from './LanguageContext';

interface Props {
  gitignoreContent: string;
}

interface CheckResult {
  path: string;
  ignored: boolean;
  matchedRule: string | null;
}

const IgnoreChecker: React.FC<Props> = ({ gitignoreContent }) => {
  const { lang } = useLanguage();
  const initialPaths = ".env\nsample.log\nbuild/sample.html\nsample.txt";
  const [paths, setPaths] = useState(initialPaths);

  // Create ignore instance
  const ig = ignore();
  ig.add(gitignoreContent);

  // Normalize paths
  const normalizePath = (p: string): string | null => {
    const trimmed = p.trim();
    if (!trimmed || trimmed === "." || trimmed === "..") return null; // Skip empty lines, "." and ".."
    if (trimmed.startsWith("/")) return null; // Skip absolute paths
    // If path starts with a dot, return as is without adding extra "."
    return trimmed;
  };

  const pathList = paths
    .split("\n")
    .map(normalizePath)
    .filter(Boolean) as string[];

  // Check if any path starts with a slash
  const hasAbsolutePaths = paths
    .split("\n")
    .some((p) => p.trim().startsWith("/"));

  const checkPaths: CheckResult[] = pathList.map((p) => {
    const ignored = ig.ignores(p);

    // Find which rule matched
    const matchedRule =
      gitignoreContent
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"))
        .find((rule) => {
          const testIg = ignore();
          testIg.add(rule);
          return testIg.ignores(p);
        }) || null;

    return { path: p, ignored, matchedRule };
  });

  const resetPaths = () => {
    setPaths("");
  };

  const warningMsg = MESSAGES[lang].note;

  return (
    <div className="mb-6">
      <div className="w-full pt-2 pb-3">
        <h2 className="font-bold mb-2 text-xl">
          {MESSAGES[lang].checkIgnored}
        </h2>
        <ul className="list-disc pl-6">
          <li>{MESSAGES[lang].enterFile}</li>
          <li>{MESSAGES[lang].useRelativePath}</li>
        </ul>
        <div className="pl-6">
          {!hasAbsolutePaths && <p>{warningMsg}</p>}
          {hasAbsolutePaths && <p className="text-red-600">{warningMsg}</p>}
        </div>
      </div>

      {/* Input area */}
      <Textarea
        value={paths}
        onChange={(e) => setPaths(e.target.value)}
        className="bg-white w-full h-48 p-2 border-black rounded mb-2 font-mono"
      />
      <div className="grid grid-cols-1 gap-4 mb-2">
        <Button onClick={resetPaths}>
          <Trash />
          <span className="pr-4">Reset</span>
        </Button>
      </div>

      {/* Check results */}
      <div className="px-2">
        <Table>
          <TableHeader>
            <TableRow className="text-base">
              <TableHead className="font-bold">{MESSAGES[lang].path}</TableHead>
              <TableHead className="font-bold">
                {MESSAGES[lang].checkResult}
              </TableHead>
              <TableHead className="font-bold">
                {MESSAGES[lang].matchedRule}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {checkPaths.length === 0 ? (
              <></>
            ) : (
              checkPaths.map(({ path, ignored, matchedRule }) => (
                <TableRow key={path} className="text-base">
                  <TableCell>{path}</TableCell>
                  {ignored ? (
                    <TableCell className="text-green-600">Ignored</TableCell>
                  ) : (
                    <TableCell className="text-red-600">Not Ignored</TableCell>
                  )}
                  {matchedRule && (
                    <TableCell className="text-black">{matchedRule}</TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IgnoreChecker;
