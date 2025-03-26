interface BmiInputValues {
  heightCm: number;
  weightKg: number;
};

const parseBmiArguments = (args: string[]): BmiInputValues => {
  if (args.length < 4) throw new Error('Not enough arguments!');
  if (args.length > 4) throw new Error('Too many arguments!');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightCm: Number(args[2]),
      weightKg: Number(args[3]),
    };
  } else {
    throw new Error('Provided values are not numbers!');
  }
};

const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightInMeters = heightCm / 100;
  const bmi = weightKg / (heightInMeters * heightInMeters);

  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

const main = () => {
  try {
    const { heightCm, weightKg } = parseBmiArguments(process.argv);
    console.log(calculateBmi(heightCm, weightKg));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
};

if (require.main === module) {
  main();
}

export default {
  parseBmiArguments,
  calculateBmi
};
