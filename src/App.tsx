import { useState } from 'react';

import GeneratorPreview from './components/GeneratorPreview';
import GitignoreInput from './components/GitignoreInput';
import Header from './components/Header';
import IgnoreChecker from './components/IgnoreChecker';
import { useLanguage } from './components/LanguageContext';
import { MESSAGES } from './constants';

const App = () => {
  const initialContent = ".env\n*.log\nbuild/";
  const [gitignoreContent, setGitignoreContent] = useState(initialContent);
  const { lang } = useLanguage();

  return (
    <>
      <Header />
      <div className="px-4 py-2 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="w-full py-2">
              <h2 className="font-bold mb-2 text-xl">
                {MESSAGES[lang].uploadGitignore}
              </h2>
              <div className="grid grid-cols-1 gap-4 py-2">
                <GitignoreInput onChange={setGitignoreContent} />
              </div>
              <p className="pl-2">
                {MESSAGES[lang].or}{" "}
                <span className="font-bold">
                  {MESSAGES[lang].enterGitignore}
                </span>
              </p>
            </div>
            <GeneratorPreview
              gitignoreContent={gitignoreContent}
              setGitignoreContent={setGitignoreContent}
            />
          </div>
          <IgnoreChecker gitignoreContent={gitignoreContent} />
        </div>
      </div>
    </>
  );
};

export default App;