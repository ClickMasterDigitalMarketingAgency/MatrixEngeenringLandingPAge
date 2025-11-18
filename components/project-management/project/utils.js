export const getStatusColor = (status) => {
  const colors = {
    active: 'bg-green-500 text-white',
    completed: 'bg-blue-500 text-white',
    'on-hold': 'bg-yellow-500 text-white',
  };
  return colors[status] || 'bg-gray-500 text-white';
};

export const getPriorityColor = (priority) => {
  const colors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-blue-100 text-blue-800 border-blue-200',
  };
  return colors[priority] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getDaysRemaining = (endDate) => {
  if (!endDate) return NaN;
  const today = new Date();
  const end = new Date(endDate);
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// 🔥 Progress bar color based on progress
export const getProgressBarClasses = (value) => {
  if (value === 100) {
    return 'h-2.5 [&>div]:bg-emerald-500'; // completed
  }
  if (value >= 70) {
    return 'h-2.5 [&>div]:bg-blue-500'; // almost done
  }
  if (value >= 40) {
    return 'h-2.5 [&>div]:bg-amber-500'; // mid
  }
  return 'h-2.5 [&>div]:bg-red-500'; // low progress
};
