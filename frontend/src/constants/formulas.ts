export const MATH_FORMULAS_BY_LEVEL = {
    algebra: {
      easy: {
        addition: 'a + b = c',
        subtraction: 'a - b = c',
        multiplication: 'a × b = c',
        division: 'a ÷ b = c',
        fractions: '(a/b) + (c/d) = (ad + bc)/bd',
        exponents: 'aⁿ × aᵐ = aⁿ⁺ᵐ'
      },
      medium: {
        quadratic: 'x = (-b ± √(b² - 4ac))/2a',
        linearEquation: 'y = mx + b',
        factoring: 'x² + 2xy + y² = (x + y)²',
        polynomials: 'ax² + bx + c = 0',
        exponentialLaws: '(aᵐ)ⁿ = aᵐⁿ'
      },
      hard: {
        complexNumbers: 'z = a + bi',
        binomialTheorem: '(x+y)ⁿ = Σₖ₌₀ⁿ (ⁿₖ)xⁿ⁻ᵏyᵏ',
        logarithms: 'log(xy) = log(x) + log(y)',
        sequences: 'aₙ = a₁ + (n-1)d'
      }
    },
    geometry: {
      easy: {
        squareArea: 'A = s²',
        rectangleArea: 'A = l × w',
        triangleArea: 'A = ½bh',
        circleArea: 'A = πr²',
        perimeter: 'P = 2(l + w)'
      },
      medium: {
        pythagoras: 'c² = a² + b²',
        trigRatios: 'sin²θ + cos²θ = 1',
        circleCircumference: 'C = 2πr',
        trapezoidArea: 'A = ½(a + b)h',
        regularPolygon: 'A = ½ap'
      },
      hard: {
        sphereVolume: 'V = (4/3)πr³',
        sphereSurface: 'A = 4πr²',
        coneVolume: 'V = (1/3)πr²h',
        cylinderVolume: 'V = πr²h'
      }
    },
    calculus: {
      easy: {
        powerRule: 'd/dx(xⁿ) = nx^(n-1)',
        basicLimit: 'lim(x→a) f(x)',
        constantRule: 'd/dx(c) = 0',
        sumRule: 'd/dx(f + g) = f′ + g′'
      },
      medium: {
        productRule: 'd/dx(fg) = f′g + fg′',
        chainRule: 'd/dx(f(g)) = f′(g)g′',
        quotientRule: 'd/dx(f/g) = (f′g - fg′)/g²',
        basicIntegral: '∫xⁿ dx = x^(n+1)/(n+1) + C'
      },
      hard: {
        partialIntegration: '∫u dv = uv - ∫v du',
        lHopital: 'lim(f/g) = lim(f′/g′)',
        taylorSeries: 'f(x) = Σ(f^(n)(a)/n!)(x-a)ⁿ',
        improperIntegral: '∫[a,∞] f(x)dx = lim(t→∞)∫[a,t] f(x)dx'
      }
    },
    statistics: {
      easy: {
        mean: 'x̄ = Σx/n',
        median: 'middle value',
        mode: 'most frequent value',
        range: 'R = max - min'
      },
      medium: {
        variance: 'σ² = Σ(x - μ)²/n',
        standardDev: 'σ = √(Σ(x - μ)²/n)',
        probability: 'P(A) = favorable/total',
        zScore: 'z = (x - μ)/σ'
      },
      hard: {
        correlation: 'r = Σ((x-x̄)(y-ȳ))/(√(Σ(x-x̄)²)(√(Σ(y-ȳ)²))',
        regression: 'y = mx + b',
        chiSquare: 'χ² = Σ((O-E)²/E)',
        confidenceInterval: 'x̄ ± z(σ/√n)'
      }
    }
  };
  