import DSASheet from './components/DsaSheet';
import {ThemeProvider} from './components/ThemeToggle';

function App () {
  return (
    <ThemeProvider>
      <DSASheet />
    </ThemeProvider>
  );
}

export default App;
