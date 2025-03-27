import express, { Request } from 'express';

import bmiCalculator from './bmiCalculator';
import exercisesCalculator from './exerciseCalculator';

const app = express();
app.use(express.json());

interface BmiQueryParams {
  height: string;
  weight: string;
};

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request<unknown, unknown, unknown, BmiQueryParams>, res) => {
  const { height, weight } = req.query;

  // Ugly hack so that we can use the already implemented parseBmiArguments function
  const bmiArgs: string[] = ['filler', 'filler'];
  if (height) {
    bmiArgs.push(height);
  }
  if (weight) {
    bmiArgs.push(weight);
  }

  try {
    const bmiValues = bmiCalculator.parseBmiArguments(bmiArgs);
    const bmi = bmiCalculator.calculateBmi(bmiValues.heightCm, bmiValues.weightKg);

    res.json({
      weight: bmiValues.weightKg,
      height: bmiValues.heightCm,
      bmi,
    });
  } catch (error: unknown) {
    let errorMessage = 'Malformatted parameters';
    if (error instanceof Error) {
      errorMessage += ': ' + error.message;
    } else {
      errorMessage += '.';
    }

    res.status(400).json({
      error: errorMessage,
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).json({
      error: 'parameters missing',
    });
    return;
  } else if (!Array.isArray(daily_exercises)) {
    res.status(400).json({
      error: 'malformatted parameters: daily_exercises is not an array',
    });
    return;
  }

  // Ugly hack so that we can use the already implemented parseExerciseInputValues function
  const exerciseArgs: string[] = [
    'filler', 'filler',
    target as string,
    ...(daily_exercises as string[])
  ];

  try {
    const exerciseInputValues = exercisesCalculator.parseExerciseInputValues(exerciseArgs);
    const result = exercisesCalculator.calculateExercises(exerciseInputValues.exercises, exerciseInputValues.target);
    res.json(result);
  } catch (error: unknown) {
    let errorMessage = 'malformatted parameters';
    if (error instanceof Error) {
      errorMessage += ': ' + error.message;
    } else {
      errorMessage += '.';
    }

    res.status(400).json({
      error: errorMessage,
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
