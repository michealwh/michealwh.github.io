import { HashRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import EmptyPage from './pages/Empty';
import SlorgsEatery from './pages/SlorgsEatery';
import SomethingElse from './pages/SomethingElse';
export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<HomePage/>} />
        <Route path="/empty" element={<EmptyPage/>} />
        <Route path="/race" element={<SlorgsEatery/>} />
        <Route path="/something-else" element={<SomethingElse/>} />
      </Switch>
    </Router>
  );
}