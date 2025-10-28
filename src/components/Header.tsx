import React from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  return (
    <header className="shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="flex items-center space-x-2 text-2xl font-bold text-black">
          <span>Gitignore Checker</span>
        </h1>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Tooltip>
            <TooltipTrigger>
              <a
                href="https://github.com/Sunny-2610/GitIgnore-checker"
                target="_blank"
              >
                <img src="/github-mark.svg" className="w-8" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>GitHub</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};

export default Header;
