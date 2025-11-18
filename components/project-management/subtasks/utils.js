export const getStatusColor = (status) => {
  const colors = {
    Completed: 'bg-green-100 text-green-800 border-green-200',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
    'Not Started': 'bg-gray-100 text-gray-800 border-gray-200',
    Blocked: 'bg-red-100 text-red-800 border-red-200',
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getPriorityColor = (priority) => {
  const colors = {
    High: 'bg-red-100 text-red-800 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Low: 'bg-blue-100 text-blue-800 border-blue-200',
  };
  return colors[priority] || 'bg-gray-100 text-gray-800 border-gray-200';
};

// for Progress component -> color inner bar
export const getProgressColor = (status) => {
  switch (status) {
    case 'Completed':
      return '[&>div]:bg-green-500';
    case 'In Progress':
      return '[&>div]:bg-blue-500';
    case 'Blocked':
      return '[&>div]:bg-red-500';
    default:
      return '[&>div]:bg-gray-500';
  }
};

export const getDaysRemaining = (dueDate) => {
  if (!dueDate) return NaN;
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
