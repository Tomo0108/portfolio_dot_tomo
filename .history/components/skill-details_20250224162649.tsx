"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SkillDetail {
  title: string;
  description: string;
  image: string;
}

interface SkillData {
  details: SkillDetail[];
}

export const skillsData: Record<string, SkillData> = {
  "Technical Direction": {
    details: [
      {
        title: "アーキテクチャ設計",
