import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useWorkouts, categories, levels, WORKOUTS_PER_PAGE, type Workout } from "@/hooks/useWorkouts";
import { Dumbbell, Filter, Target, RotateCcw, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { WorkoutDetailModal } from "@/components/workouts/WorkoutDetailModal";

const Workouts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data, isLoading, error } = useWorkouts({
    page: currentPage,
    category: selectedCategory,
    level: selectedLevel,
    search: debouncedSearch,
  });

  const workouts = data?.workouts ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const relatedWorkouts = useMemo(() => {
    if (!selectedWorkout) return [];
    return workouts
      .filter(
        (w) =>
          w.id !== selectedWorkout.id &&
          (w.category === selectedWorkout.category ||
            w.target_muscle === selectedWorkout.target_muscle)
      )
      .slice(0, 4);
  }, [selectedWorkout, workouts]);

  const handleWorkoutClick = (workout: Workout) => {
    setSelectedWorkout(workout);
    setModalOpen(true);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedLevel(null);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setCurrentPage(1);
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(selectedLevel === level ? null : level);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-primary/20 text-primary border-primary/30";
      case "intermediate":
        return "bg-accent/20 text-accent border-accent/30";
      case "advanced":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const hasActiveFilters = selectedCategory || selectedLevel || searchQuery;

  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * WORKOUTS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * WORKOUTS_PER_PAGE, totalCount);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Workout <span className="text-primary">Library</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse our collection of exercises organized by muscle group and difficulty level. 
              Each workout includes sets, reps, and beginner-friendly tips.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-background border-b border-border sticky top-16 md:top-20 z-40">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search exercises by name or muscle..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
            {/* Level Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Level:</span>
              {levels.map((level) => (
                <Button
                  key={level.id}
                  variant={selectedLevel === level.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleLevelChange(level.id)}
                >
                  {level.name}
                </Button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <Target className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Muscle:</span>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <span className="mr-1">{cat.icon}</span>
                  {cat.name}
                </Button>
              ))}
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Workout Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing <span className="text-primary font-semibold">{startItem}-{endItem}</span> of{" "}
              <span className="text-primary font-semibold">{totalCount}</span> exercises
            </p>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: WORKOUTS_PER_PAGE }).map((_, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <Skeleton className="w-12 h-12 rounded-xl" />
                    <Skeleton className="w-20 h-6 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <Dumbbell className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">Error loading workouts</h3>
              <p className="text-muted-foreground mb-4">Please try again later</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {workouts.map((workout, index) => (
                  <div
                    key={workout.id}
                    onClick={() => handleWorkoutClick(workout)}
                    className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover-lift transition-all cursor-pointer animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                        <Dumbbell className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <Badge variant="outline" className={getLevelColor(workout.level)}>
                        {workout.level}
                      </Badge>
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {workout.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {workout.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Target</p>
                        <p className="text-sm font-medium">{workout.target_muscle}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Sets × Reps</p>
                        <p className="text-sm font-medium">{workout.sets} × {workout.reps}</p>
                      </div>
                    </div>

                    {/* Tips */}
                    {workout.tips && (
                      <div className="pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">💡 Tip</p>
                        <p className="text-sm text-muted-foreground">{workout.tips}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        // Show first, last, current, and adjacent pages
                        return (
                          page === 1 ||
                          page === totalPages ||
                          Math.abs(page - currentPage) <= 1
                        );
                      })
                      .map((page, index, arr) => {
                        // Add ellipsis if there's a gap
                        const showEllipsisBefore = index > 0 && page - arr[index - 1] > 1;
                        return (
                          <div key={page} className="flex items-center gap-1">
                            {showEllipsisBefore && (
                              <span className="px-2 text-muted-foreground">...</span>
                            )}
                            <Button
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              className="w-9"
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </Button>
                          </div>
                        );
                      })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}

          {!isLoading && !error && workouts.length === 0 && (
            <div className="text-center py-16">
              <Dumbbell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">No workouts found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search term</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <WorkoutDetailModal
        workout={selectedWorkout}
        relatedWorkouts={relatedWorkouts}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSelectWorkout={handleWorkoutClick}
      />
    </Layout>
  );
};

export default Workouts;
