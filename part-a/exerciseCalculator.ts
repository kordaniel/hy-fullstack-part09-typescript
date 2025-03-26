
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
};

const calculateExercises = (exercises: number[], target: number): Result => {
  const calculateRating = (average: Result['average']): Result['rating'] => {
    if (average < 0.85 * target) {
      return 1;
    } else if (average < 1.15 * target) {
      return 2;
    } else {
      return 3;
    }
  };

  const getRatingDescription = (rating: Result['rating']): Result['ratingDescription'] => {
    switch (rating) {
      case 1:
        return 'should be much better';
      case 2:
        return 'not too bad but could be better';
      case 3:
        return 'the best of the best';
    };
  };

  const average = exercises.length > 0
    ? exercises.reduce((acc, val) => acc + val) / exercises.length
    : 0;
  const rating = calculateRating(average);

  return {
    periodLength: exercises.length,
    trainingDays: exercises.filter(d => d > 0).length,
    success: average >= target,
    rating,
    ratingDescription: getRatingDescription(rating),
    target,
    average
  };
};

const exerciseHours: number[] = [3, 0, 2, 4.5, 0, 3, 1];
const targetHours = 2;

console.log(calculateExercises(exerciseHours, targetHours));
