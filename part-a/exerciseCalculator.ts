interface ExerciseInputValues {
  target: number;
  exercises: number[];
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
};

const parseExerciseInputValues = (args: string[]): ExerciseInputValues => {
  if (args.length < 3) throw new Error('Not enough arguments!');

  const numericArgs = args.slice(2);

  if (numericArgs.some(arg => isNaN(Number(arg)))) {
    throw new Error('Provided values are not numbers');
  }

  return {
    target: Number(numericArgs[0]),
    exercises: numericArgs.slice(1).map(arg => Number(arg)),
  };
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

try {
  const { target, exercises} = parseExerciseInputValues(process.argv);
  console.log(calculateExercises(exercises, target));
} catch (error) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
