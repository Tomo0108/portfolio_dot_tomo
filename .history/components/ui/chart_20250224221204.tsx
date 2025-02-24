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
        return (
          <LineChart data={data}>
            <XAxis dataKey={x} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={y} stroke="#8884d8" />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <XAxis dataKey={x} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey={y} fill="#8884d8" />
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <XAxis dataKey={x} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey={y} stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={y}
              nameKey={x}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
