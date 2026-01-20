import './CategoryTabs.css';

const CATEGORIES = [
  { id: 'all', label: '전체', icon: '📋' },
  { id: 'today', label: '오늘', icon: '⭐' },
  { id: 'week', label: '이번주', icon: '📊' },
  { id: 'later', label: '나중에', icon: '🔮' },
];

function CategoryTabs({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-tabs slide-up">
      {CATEGORIES.map(category => (
        <button
          key={category.id}
          className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          <span className="tab-icon">{category.icon}</span>
          <span className="tab-label">{category.label}</span>
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
