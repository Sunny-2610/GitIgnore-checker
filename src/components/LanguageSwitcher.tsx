// src/components/LanguageSwitcher.tsx
import { Globe } from 'lucide-react';
import React from 'react';

import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';

import { useLanguage } from './LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { setLang } = useLanguage();
  type Language = "en" | "hi"; // Update this line

  return (
    <div className="flex items-center gap-1">
      <Select onValueChange={(value: Language) => setLang(value)}>
        <SelectTrigger className="w-[140px]">
          <Globe />
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="hi">हिन्दी</SelectItem> {/* Update this line */}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;