import { ReactElement } from "react";
import { TransitionGroup } from "react-transition-group";
import Home from '@/views/home';
import { Route, Redirect } from 'react-router-dom';
import routers from '@/routers';
import TransitionWrapper from '@/components/TransactionWrapper';

const AnimationRoute = (): ReactElement => {
    return (
        <TransitionGroup>
            <Route exact path="/">
                <TransitionWrapper isIn={true}>
                    <Home />
                </TransitionWrapper>
            </Route>
            {routers.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </TransitionGroup>
    );
};


function RouteWithSubRoutes(route: any) {
    return (
        <Route
            key={route.path} exact path={route.path}
        >
            {({ match }) => (
                <TransitionWrapper isIn={match != null}>
                    {route.redirect !== undefined ? <Redirect to={route.redirect} /> : <route.component {...route.props} routes={route.routes} />}
                </TransitionWrapper>
            )}
        </Route>
    );
}

export default AnimationRoute;