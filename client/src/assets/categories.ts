
import { useTranslation } from "react-i18next";

const { t } = useTranslation();
const categories = [
  { name: 'Food', icon: '🍔', fill: 'orange-100' },
  { name: 'Transport', icon: '🚗', fill: 'blue-100' },
    { name: 'Entertainment', icon: '🎮', fill: 'purple-100' },
    { name: 'Utilities', icon: '💡', fill: 'yellow-100' },
    { name: 'Healthcare', icon: '💊', fill: 'red-100' },
    { name: 'Education', icon: '📚', fill: 'green-100' },
    { name: 'Shopping', icon: '🛍️', fill: 'pink-100' },
    { name: 'Travel', icon: '✈️', fill: 'indigo-100' },
    { name: 'Clothing', icon: '👗', fill: 'teal-100' },
    { name: 'Other', icon: '📦', fill: 'gray-100' },
];

export default categories;
