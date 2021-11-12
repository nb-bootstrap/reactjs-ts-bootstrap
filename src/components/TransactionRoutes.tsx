import { ReactElement } from "react";
import { Route, useLocation, Switch } from 'react-router-dom';
import TransitionWrapper from '@/components/TransactionWrapper';
import { TransitionGroup } from "react-transition-group";
interface TransactionRoutesProps {
    animateName?: string,
    path?: string,
    routes: { path: string, component: any, props?: any, redirectTo?: string }[]
}
const TransactionRoutes = (props: TransactionRoutesProps): ReactElement => {
    const { animateName = 'page', routes, path = '' } = props;
    const locaion = useLocation();
    return (
        <TransitionGroup>
            <Switch location={locaion}>
                {routes.map((route: any) => (
                    <Route path={path + route.path} key={route.path}>
                        {({ match }) => (
                            <TransitionWrapper isIn={match != null} animateName={animateName}>
                                <route.component {... (route.props || {})} />
                            </TransitionWrapper>
                        )}
                    </Route>
                ))}
            </Switch>
        </TransitionGroup>
    );
};

export default TransactionRoutes;