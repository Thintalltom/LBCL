import React from 'react';
import { Button } from './ui/Button';
import { BoxIcon } from 'lucide-react';
interface EmptyStateProps {
  icon: BoxIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}
export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction
}: EmptyStateProps) {
  return <div className="text-center py-12 px-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
      <Icon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
        {description}
      </p>
      {actionLabel && onAction && <div className="mt-6">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>}
    </div>;
}