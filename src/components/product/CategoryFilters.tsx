
import { Button } from "@/components/ui/button";

interface CategoryFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export const CategoryFilters = ({ currentFilter, onFilterChange }: CategoryFiltersProps) => {
  const categories = ['all', 'running', 'casual', 'formal', 'sandals', 'slippers'];

  return (
    <div className="mb-8 flex justify-center space-x-4">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onFilterChange(category)}
          variant={currentFilter === category ? "default" : "secondary"}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Button>
      ))}
    </div>
  );
};
