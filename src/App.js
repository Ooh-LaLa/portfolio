import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import './app.css';

//components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Education from './components/Education/Education';
import Certifications from "./components/Certifications/Certifications";
import Projects from "./components/Projects/Project";
import AboutMe from "./components/About Me/AboutMe";
import MailchimpForm from "./components//MailChimpForm/MailchimpForm";


import { useSelector } from "react-redux";

const App=()=> {
    const location=useLocation();
    const theme = useSelector(state => state.theme);
    return (
        <div className="App" style={theme}>
            <Navbar />
            <div className="app-content">
                <TransitionGroup>
                    <CSSTransition timeout={300} classNames='fade' key={location.key}>
                        <Switch location={location}>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/home">
                                <Home />
                            </Route>

                            <Route path="/about-me">
                                <AboutMe />
                            </Route>

                            <Route path="/education">
                                <Education />
                            </Route>

                            <Route path="/certifications">
                                <Certifications />
                            </Route>

                            <Route path="/projects">
                                <Projects />
                            </Route><Route path="/subscribe">
                                <MailchimpForm /> {/* Add a route for the Mailchimp form */}
                            </Route>
                            <Route path="*">
                                <Redirect to="/" />
                            </Route> 
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            <Footer />
        </div>
    )
}

export default App;