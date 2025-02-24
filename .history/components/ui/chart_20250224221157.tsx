'use client';

import * as React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { cn } from '@/lib/utils';

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[];
  type?: 'line' | 'bar' | 'area' | 'pie';
  x?: string;
  y?: string;
  className?: string;
}

export function Chart({
  data,
  type = 'line',
  x,
  y,
  className,
  ...props
}: ChartProps) {
  const renderChart = () => {
    switch (type) {
      case 'line':
