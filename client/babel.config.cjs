module.exports = {
  presets: [
    // This preset tells Babel how to transform modern JS features (like 'const', 'let', and arrow functions)
    // to work in older environments, which Jest may use.
    '@babel/preset-env', 
    
    // THIS IS THE FIX: This preset tells Babel how to understand and transform JSX syntax (like <Home />).
    ['@babel/preset-react', {
      runtime: 'automatic' // Modern React syntax.
    }]
  ]
};