'use client';

import { Example } from "@/data/skills";
import { PDFViewer } from "./pdf-viewer";
import { useState } from "react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface SkillDetailsProps {
  work: Example;
  pdfUrl?: string;
}

export function SkillDetails({ work, pdfUrl }: SkillDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>{work.longDescription}</p>
      </div>

      {pdfUrl && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full max-w-sm"
            >
              {isExpanded ? 'Close PDF' : 'View PDF'}
            </Button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PDFViewer pdfUrl={pdfUrl} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
