export const validateReviewFields = (
    selectedSalon: any,
    selectedCategory: any,
    selectedServices: string[],
    rating: number,
    comment: string
  ): string | null => {
    if (!selectedSalon || !selectedCategory || selectedServices.length === 0 || rating === 0 || !comment.trim()) {
      return 'Please fill all fields: select a salon, category, at least one service, a star rating, and write a comment.';
    }
    return null;
  };
  